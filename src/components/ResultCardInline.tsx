// src/components/ResultCardInline.tsx

import { Card } from "../models/coreModels";
import { useBackend } from "../state/useBackend";

interface ResultCardInlineProps {
  card: Card;
}

export function ResultCardInline({ card }: ResultCardInlineProps) {
  const { openCard } = useBackend();

  const handleClick = () => {
    openCard(card.threadId, card.id);
  };

  return (
    <div className="result-card" onClick={handleClick}>
      <div className="result-card-title">{card.title}</div>
      <div className="result-card-domain">{card.sourceDomain}</div>
      <div className="result-card-snippet">{card.snippet}</div>
      <div className="result-card-tags">{card.tags.join(" • ")}</div>
      <div className="result-card-reason">{card.reason}</div>
    </div>
  );
}
