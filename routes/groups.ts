// routes/groups.ts

import express from "express";
import { db } from "../storage/db"; // your SQLite wrapper
import { Group } from "../models/coreModels";
import { v4 as uuid } from "uuid";

export const groupsRouter = express.Router();

groupsRouter.get("/", async (_req, res) => {
  const groups = await db.getGroups();
  res.json(groups);
});

groupsRouter.post("/", async (req, res) => {
  const name: string = req.body.name;
  const now = new Date().toISOString();
  const group: Group = {
    id: uuid(),
    name,
    createdAt: now,
    updatedAt: now,
    pinnedThreadIds: [],
  };
  await db.createGroup(group);
  res.status(201).json(group);
});

// PATCH, DELETE omitted but straightforward
