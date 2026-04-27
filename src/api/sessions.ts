import { apiGet, apiJson, apiDelete } from "@/api/client";

import type { Session, SessionHistory } from "@/types/session";

export function createSession(): Promise<Session> {
  return apiJson<Session>("/sessions", {});
}

export function getSessionHistory(sessionId: string): Promise<SessionHistory> {
  return apiGet<SessionHistory>(`/sessions/${sessionId}/history`);
}

export function deleteSession(sessionId: string): Promise<{ detail: string }> {
  return apiDelete<{ detail: string }>(`/sessions/${sessionId}`);
}
