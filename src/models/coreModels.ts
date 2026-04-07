// src/models/coreModels.ts

export type ID = string;

export interface Group {
  id: ID;
  name: string;
  createdAt: string;
  updatedAt: string;
  pinnedThreadIds: ID[];
  summary?: string;
}

export type Author = "user" | "assistant" | "system";

export interface Message {
  id: ID;
  threadId: ID;
  author: Author;
  content: string;
  createdAt: string;
  cardIds?: ID[];
}

export interface Card {
  id: ID;
  threadId: ID;
  url: string;
  title: string;
  snippet: string;
  sourceDomain: string;
  publishedAt?: string;
  tags: string[];
  reason: string;
  createdAt: string;
  openedAt?: string;
  lastUsedAt?: string;
}

export interface PageMetadata {
  title?: string;
  headings?: string[];
}

export interface Page {
  id: ID;
  threadId: ID;
  url: string;
  rawContent: string;
  metadata: PageMetadata;
  createdAt: string;
  updatedAt: string;
}

export interface Thread {
  id: ID;
  groupId: ID;
  title: string;
  createdAt: string;
  updatedAt: string;
  lastOpenedPageId?: ID;
  sessionSummary?: string;
}
