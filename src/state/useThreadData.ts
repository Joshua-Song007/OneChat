// src/state/useThreadData.ts

import { Thread, Message, Card, Page } from "../models/coreModels";

interface ThreadData {
  thread?: Thread;
  messages: Message[];
  cards: Card[];
  currentPage?: Page;
}

export const useThreadData = (activeThreadId?: string): ThreadData => {
  // TODO: fetch from backend / global state based on activeThreadId
  return {
    thread: activeThreadId
      ? {
          id: activeThreadId,
          groupId: "dummy-group",
          title: "Dummy Thread",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }
      : undefined,
    messages: [],
    cards: [],
    currentPage: undefined,
  };
};
