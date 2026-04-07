// src/components/PageViewerPane.tsx

import { Page } from "../models/coreModels";

interface PageViewerPaneProps {
  page?: Page;
}

export function PageViewerPane({ page }: PageViewerPaneProps) {
  if (!page) {
    return (
      <aside className="page-viewer-pane empty">
        <p>Open a result card to view its page.</p>
      </aside>
    );
  }

  return (
    <aside className="page-viewer-pane">
      <header className="page-viewer-header">
        <h3>{page.metadata.title || page.url}</h3>
      </header>
      <div className="page-viewer-content">
        <pre>{page.rawContent}</pre>
      </div>
    </aside>
  );
}
