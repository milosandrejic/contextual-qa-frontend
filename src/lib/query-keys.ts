export const queryKeys = {
  documents: ["documents"] as const,
  document: (id: string) => ["documents", id] as const,
  sessionHistory: (sessionId: string) => ["sessions", sessionId, "history"] as const,
};
