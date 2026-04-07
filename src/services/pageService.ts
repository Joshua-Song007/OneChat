// services/pageService.ts

import { db } from "../storage/db";
import { fetchService } from "./fetchService";
import { v4 as uuid } from "uuid";
import { Page } from "../models/coreModels";

export const fetchAndStorePage = async (threadId: string, cardId: string) => {
  const card = await db.getCard(cardId);
  if (!card) throw new Error("Card not found");

  let page = await db.getPageByUrl(threadId, card.url);
  if (!page) {
    const { text, metadata } = await fetchService.fetchAndClean(card.url);
    const now = new Date().toISOString();
    page = {
      id: uuid(),
      threadId,
      url: card.url,
      rawContent: text,
      metadata,
      createdAt: now,
      updatedAt: now,
    };
    await db.createPage(page);
  }

  await db.updateThread(threadId, { lastOpenedPageId: page.id });

  return {
    thread: await db.getThread(threadId),
    page,
  };
};
