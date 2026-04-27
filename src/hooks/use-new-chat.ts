import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { ApiError } from "@/api/client";
import { deleteSession } from "@/api/sessions";
import { useSession } from "@/context/session-context";

export function useNewChat() {
  const queryClient = useQueryClient();
  const { sessionId, clearSession } = useSession();

  return useMutation({
    mutationFn: async () => {
      if (!sessionId) {
        return;
      }

      try {
        await deleteSession(sessionId);
      } catch (error) {
        if (error instanceof ApiError && error.status === 404) {
          return;
        }

        throw error;
      }
    },
    onSettled: () => {
      clearSession();
      queryClient.removeQueries({ queryKey: ["sessions"] });
    },
    onError: () => {
      toast.error("Failed to clear conversation");
    },
  });
}
