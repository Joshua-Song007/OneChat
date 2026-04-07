// src/services/promptBuilder.ts

import { Thread, Message, Card, Page } from "../models/coreModels";

export function buildSystemPrompt(): string {
  return `
You are the AI assistant inside a chat-centric browser-like app.

Core rules:
- The user is in a single continuous conversation (a "Thread") that can pull in web content.
- You see the recent chat history, curated web result cards, the currently open page, and a short session summary.

Behaviors:
- Use chat history, session summary, open page, and cards to answer.
- Refer to sources conceptually, not with raw URLs.
- Be concise and organized in paragraphs.
`;
}

interface LLMContext {
  thread: Thread;
  recentMessages: Message[];
  cards: Card[];
  currentPage?: Page;
}

export function buildLLMPrompt(
  ctx: LLMContext,
  userMessage: string
): string {
  const { thread, recentMessages, cards, currentPage } = ctx;

  const summarySection = thread.sessionSummary
    ? `Session summary:\n${thread.sessionSummary}\n\n`
    : "";

  const historyLines = recentMessages.map((m) => {
    const who = m.author === "user" ? "User" : "Assistant";
    return `${who}: ${m.content}`;
  });

  const cardSummaries = cards
    .slice(-5)
    .map(
      (c) =>
        `- [${c.sourceDomain}] ${c.title} | tags: ${c.tags.join(
          ", "
        )} | reason: ${c.reason}`
    )
    .join("\n");

  const cardsSection = cards.length
    ? `Relevant web results in this thread:\n${cardSummaries}\n\n`
    : "";

  const pageSection = currentPage
    ? `Currently open page:\nURL: ${currentPage.url}\nTitle: ${
        currentPage.metadata.title || "Untitled"
      }\n\n${currentPage.rawContent.slice(0, 2000)}\n\n`
    : "";

  const conversationSection = `Recent conversation:\n${historyLines.join(
    "\n"
  )}\n\n`;

  const userTurn = `User's latest message:\n${userMessage}\n\n`;

  const instruction =
    "Now respond to the user's latest message, using the session summary, cards, and current page as appropriate.\n";

  return (
    summarySection +
    cardsSection +
    pageSection +
    conversationSection +
    userTurn +
    instruction
  );
}
