// src/components/SidePole.tsx

import { Group, Thread } from "../models/coreModels";

interface SidePoleProps {
  groups: Group[];
  threads: Thread[];
  activeThreadId?: string;
}

export function SidePole({ groups, threads, activeThreadId }: SidePoleProps) {
  const threadsByGroup = new Map<string, Thread[]>();
  threads.forEach((t) => {
    const arr = threadsByGroup.get(t.groupId) || [];
    arr.push(t);
    threadsByGroup.set(t.groupId, arr);
  });

  return (
    <aside className="sidepole">
      {groups.map((group) => {
        const groupThreads = threadsByGroup.get(group.id) || [];
        return (
          <div key={group.id} className="sidepole-group">
            <div className="sidepole-group-title">{group.name}</div>
            <div className="sidepole-thread-list">
              {groupThreads.map((thread) => (
                <div
                  key={thread.id}
                  className={
                    "sidepole-thread-item" +
                    (thread.id === activeThreadId ? " active" : "")
                  }
                >
                  {thread.title}
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </aside>
  );
}
