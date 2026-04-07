// services/orchestrator.ts

import { db } from "../storage/db";
import { searchService } from "./searchService";
import { llmService } from "./llmService"
import { buildSystemPrompt, buildLLMPrompt } from "./promptBuilder";
import { Message, Card } from "../models/coreModels";
import { v4 as uuid } from "uuid";


export const orchestrator = {
  async handleUserMessage(threadId: string, content: string) {
    const now = new Date().toISOString();

    // 1. Persist user message
    const userMessage: Message = {
      id: uuid(),
      threadId,
      author: "user",
      content,
      createdAt: now,
    };
    await db.createMessage(userMessage);

    // 2. Load thread context
    const thread = await db.getThread(threadId);
    const recentMessages = await db.getRecentMessages(threadId, 20);
    const cards = await db.getCardsForThread(threadId);
    const currentPage = thread.lastOpenedPageId
      ? await db.getPage(thread.lastOpenedPageId)
      : undefined;

    // 3. Decide whether to search (simple rule)
    let newCards: Card[] = [];
    const shouldSearch = !cards.length || /\b(search|find|look up)\b/i.test(content);

    if (shouldSearch) {
      const results = await searchService.search(content);
      // convert search results to Card objects, persist them
      newCards = await db.createCardsFromSearchResults(threadId, results);
    }

    const allCards = cards.concat(newCards);

    // 4. Build and call LLM
    const systemPrompt = buildSystemPrompt();
    const userPrompt = buildLLMPrompt(
      { thread, recentMessages, cards: allCards, currentPage },
      content
    );
    const assistantText = await llmService.chatCompletion(systemPrompt, userPrompt);

    const assistantMessage: Message = {
      id: uuid(),
      threadId,
      author: "assistant",
      content: assistantText,
      createdAt: new Date().toISOString(),
      cardIds: newCards.map(c => c.id),
    };
    await db.createMessage(assistantMessage);

    const updatedMessages = await db.getRecentMessages(threadId, 100);
    const updatedCards = await db.getCardsForThread(threadId);
    const updatedThread = await db.getThread(threadId);

    return {
      thread: updatedThread,
      messages: updatedMessages,
      cards: updatedCards,
    };
  },
};
