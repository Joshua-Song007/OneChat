// src/state/useAppState.ts

import { Group, Thread } from "../models/coreModels";

interface AppState {
  groups: Group[];
  threads: Thread[];
  activeThreadId?: string;
}

export const useAppState = (): AppState => {
  // TODO: replace with real state management
  return {
    groups: [],
    threads: [],
    activeThreadId: undefined,
  };
};
