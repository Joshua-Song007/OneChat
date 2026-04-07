// routes/threads.ts

import express from "express";
import { db } from "../storage/db";
import { v4 as uuid } from "uuid";
import { orchestrator } from "../services/orchestrator";
import { fetchAndStorePage } from "../services/pageService";

export const threadsRouter = express.Router();

// Create a thread in a group
threadsRouter.post("/:threadId/messages", async (req, res) => {
  const threadId = req.params.threadId;
  const { content } = req.body;

  const result = await orchestrator.handleUserMessage(threadId, content);
  res.json(result); // { thread, messages, cards }
});

threadsRouter.post("/:threadId/open-card", async (req, res) => {
  const threadId = req.params.threadId;
  const { cardId } = req.body;

  const { thread, page } = await fetchAndStorePage(threadId, cardId);
  res.json({ thread, page });
});
