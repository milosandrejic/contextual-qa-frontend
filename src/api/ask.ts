import { apiJson } from "@/api/client";

import type { AskRequest, AskResponse } from "@/types/ask";

export function ask(request: AskRequest): Promise<AskResponse> {
  return apiJson<AskResponse>("/ask", request);
}
