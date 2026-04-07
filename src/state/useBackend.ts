// src/state/useBackend.ts

export interface BackendAPI {
  openCard: (threadId: string, cardId: string) => void;
  sendMessage: (threadId: string, content: string) => void;
}

export const useBackend = (): BackendAPI => {
  // TODO: wire to real backend (fetch/axios/etc.)
  const openCard = (_threadId: string, _cardId: string) => {
    console.log("openCard called");
  };

  const sendMessage = (_threadId: string, _content: string) => {
    console.log("sendMessage called");
  };

  return { openCard, sendMessage };
};
