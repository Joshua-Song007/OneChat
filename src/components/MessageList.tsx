// src/components/MessageList.tsx

import { Message, Card } from "../models/coreModels";
import { ResultCardInline } from "./ResultCardInline";

interface MessageListProps {
  messages: Message[];
  cards: Card[];
}

export function MessageList({ messages, cards }: MessageListProps) {
  const cardsById = new Map(cards.map((c) => [c.id, c]));

  return (
    <div className="message-list">
      {messages.map((msg) => {
        const attachedCards =
          (msg.cardIds || [])
            .map((id) => cardsById.get(id))
            .filter((c): c is Card => Boolean(c)) || [];

        return (
          <div key={msg.id} className={`message message-${msg.author}`}>
            <div className="message-content">{msg.content}</div>
            {attachedCards.length > 0 && (
              <div className="message-cards">
                {attachedCards.map((card) => (
                  <ResultCardInline key={card.id} card={card} />
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
