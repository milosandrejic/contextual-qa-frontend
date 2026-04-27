import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

import { ApiError } from "@/api/client";
import { queryKeys } from "@/lib/query-keys";
import { getSessionHistory } from "@/api/sessions";
import { useSession } from "@/context/session-context";

export function useSessionHistory() {
  const { sessionId, clearSession } = useSession();

  const query = useQuery({
    queryKey: sessionId ? queryKeys.sessionHistory(sessionId) : ["sessions", "none"],
    queryFn: () => getSessionHistory(sessionId as string),
    enabled: Boolean(sessionId),
    retry: (count, error) => {
      if (error instanceof ApiError && error.status === 404) {
        return false;
      }

      return count < 1;
    },
  });

  useEffect(() => {
    if (query.error instanceof ApiError && query.error.status === 404) {
      clearSession();
    }
  }, [query.error, clearSession]);

  return query;
}
