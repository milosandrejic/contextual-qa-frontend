import { useMutation, useQueryClient } from "@tanstack/react-query";

import { ask } from "@/api/ask";
import { queryKeys } from "@/lib/query-keys";
import { createSession } from "@/api/sessions";
import { useSession } from "@/context/session-context";

import type { AskResponse } from "@/types/ask";

interface AskInput {
  question: string;
  topK: number;
}

export function useAsk() {
  const queryClient = useQueryClient();
  const { sessionId, setSessionId } = useSession();

  return useMutation<AskResponse, unknown, AskInput>({
    mutationFn: async ({ question, topK }) => {
      let activeSessionId = sessionId;

      if (!activeSessionId) {
        const session = await createSession();

        activeSessionId = session.id;
        setSessionId(session.id);
      }

      return ask({ question, top_k: topK, session_id: activeSessionId });
    },
    onSuccess: (response) => {
      const id = response.session_id;

      if (id) {
        queryClient.invalidateQueries({ queryKey: queryKeys.sessionHistory(id) });
      }
    },
  });
}
