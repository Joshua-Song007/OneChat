// src/components/AppShell.tsx

import { SidePole } from "./SidePole";
import { MainPane } from "./MainPane";
import { useAppState } from "../state/useAppState";

export function AppShell() {
  const { groups, threads, activeThreadId } = useAppState();

  return (
    <div className="app-shell">
      <SidePole groups={groups} threads={threads} activeThreadId={activeThreadId} />
      <MainPane activeThreadId={activeThreadId} />
    </div>
  );
}
