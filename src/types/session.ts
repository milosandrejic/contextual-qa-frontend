import type { Message } from "@/types/message";

export interface Session {
  id: string;
  created_at: string;
}

export interface SessionHistory extends Session {
  messages: Message[];
}
