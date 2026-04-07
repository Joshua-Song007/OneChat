// src/components/MainPane.tsx

import { ChatPane } from "./ChatPane";
import { PageViewerPane } from "./PageViewerPane";
import { useThreadData } from "../state/useThreadData";

interface MainPaneProps {
  activeThreadId?: string;
}

export function MainPane({ activeThreadId }: MainPaneProps) {
  const { thread, messages, cards, currentPage } = useThreadData(activeThreadId);

  if (!thread) {
    return (
      <div className="main-pane empty">
        <p>Select or create a thread.</p>
      </div>
    );
  }

  return (
    <div className="main-pane">
      <ChatPane thread={thread} messages={messages} cards={cards} />
      <PageViewerPane page={currentPage} />
    </div>
  );
}
