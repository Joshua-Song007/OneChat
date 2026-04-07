// src/components/ChatPane.tsx

import { useState, FormEvent } from "react";
import { Thread, Message, Card } from "../models/coreModels";
import { MessageList } from "./MessageList";
import { useBackend } from "../state/useBackend";

interface ChatPaneProps {
  thread: Thread;
  messages: Message[];
  cards: Card[];
}

export function ChatPane({ thread, messages, cards }: ChatPaneProps) {
  const [input, setInput] = useState("");
  const { sendMessage } = useBackend();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    sendMessage(thread.id, input.trim());
    setInput("");
  };

  return (
    <section className="chat-pane">
      <header className="chat-header">
        <h2>{thread.title}</h2>
      </header>
      <MessageList messages={messages} cards={cards} />
      <form className="chat-input" onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask or type to search..."
        />
        <button type="submit">Send</button>
      </form>
    </section>
  );
}
