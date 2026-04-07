// src/storage/db.ts
// Temporary in-memory stub DB just to satisfy imports and types.

import { Group, Thread, Message, Card, Page } from "../models/coreModels";
import { v4 as uuid } from "uuid";

const groups: Group[] = [];
const threads: Thread[] = [];
const messages: Message[] = [];
const cards: Card[] = [];
const pages: Page[] = [];

export const db = {
  // Groups
  async getGroups(): Promise<Group[]> {
    return groups;
  },

  async createGroup(group: Group): Promise<void> {
    groups.push(group);
  },

  // Threads
  async getThread(id: string): Promise<Thread> {
    const t = threads.find((x) => x.id === id);
    if (!t) {
      throw new Error("Thread not found");
    }
    return t;
  },

  async createThread(thread: Thread): Promise<void> {
    threads.push(thread);
  },

  async updateThread(
    id: string,
    patch: Partial<Thread>
  ): Promise<void> {
    const t = threads.find((x) => x.id === id);
    if (!t) return;
    Object.assign(t, patch, { updatedAt: new Date().toISOString() });
  },

  // Messages
  async getRecentMessages(threadId: string, limit: number): Promise<Message[]> {
    return messages
      .filter((m) => m.threadId === threadId)
      .sort(
        (a, b) =>
          new Date(a.createdAt).getTime() -
          new Date(b.createdAt).getTime()
      )
      .slice(-limit);
  },

  async createMessage(msg: Message): Promise<void> {
    messages.push(msg);
  },

  // Cards
  async getCardsForThread(threadId: string): Promise<Card[]> {
    return cards.filter((c) => c.threadId === threadId);
  },

  async getCard(id: string): Promise<Card | undefined> {
    return cards.find((c) => c.id === id);
  },

  async createCardsFromSearchResults(
    threadId: string,
    results: {
      title: string;
      url: string;
      snippet: string;
      sourceDomain: string;
    }[]
  ): Promise<Card[]> {
    const now = new Date().toISOString();
    const created = results.map((r) => {
      const card: Card = {
        id: uuid(),
        threadId,
        url: r.url,
        title: r.title,
        snippet: r.snippet,
        sourceDomain: r.sourceDomain,
        tags: [],
        reason: "Search result",
        createdAt: now
      };
      cards.push(card);
      return card;
    });
    return created;
  },

  // Pages
  async getPage(id: string): Promise<Page | undefined> {
    return pages.find((p) => p.id === id);
  },

  async getPageByUrl(
    threadId: string,
    url: string
  ): Promise<Page | undefined> {
    return pages.find((p) => p.threadId === threadId && p.url === url);
  },

  async createPage(page: Page): Promise<void> {
    pages.push(page);
  }
};
