// server.ts

import express from "express";
import bodyParser from "body-parser";
import { groupsRouter } from "./routes/groups";
import { threadsRouter } from "./routes/threads";

const app = express();
app.use(bodyParser.json());

app.use("/groups", groupsRouter);
app.use("/threads", threadsRouter);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Backend listening on port ${PORT}`);
});
