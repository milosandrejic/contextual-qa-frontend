export interface Source {
  citation: number;
  text: string;
  source: string | null;
  page: number | null;
  chunk_index: number | null;
  distance: number;
}

export interface TokenUsage {
  prompt_tokens?: number;
  completion_tokens?: number;
  total_tokens?: number;
  [key: string]: number | undefined;
}

export type MessageRole = "user" | "assistant";

export interface Message {
  id: string;
  role: MessageRole;
  content: string;
  sources: Source[] | null;
  token_usage: TokenUsage | null;
  created_at: string;
}
