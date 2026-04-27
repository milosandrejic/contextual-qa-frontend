import type { Source, TokenUsage } from "@/types/message";

export interface AskRequest {
  question: string;
  top_k: number;
  session_id?: string | null;
}

export interface AskResponse {
  question: string;
  session_id: string | null;
  answer: string;
  latency_ms: number;
  sources: Source[];
  usage: TokenUsage;
}
