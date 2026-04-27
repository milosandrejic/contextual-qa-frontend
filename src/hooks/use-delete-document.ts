import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { ApiError } from "@/api/client";
import { queryKeys } from "@/lib/query-keys";
import { deleteDocument } from "@/api/documents";

export function useDeleteDocument() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteDocument(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.documents });
      toast.success("Document deleted");
    },
    onError: (error: unknown) => {
      const message = error instanceof ApiError ? error.detail : "Delete failed";

      toast.error(message);
    },
  });
}
