import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { ApiError } from "@/api/client";
import { queryKeys } from "@/lib/query-keys";
import { uploadDocument } from "@/api/documents";

export function useUploadDocument() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (file: File) => uploadDocument(file),
    onSuccess: (doc) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.documents });
      toast.success(`${doc.filename} indexed`);
    },
    onError: (error: unknown) => {
      const message = error instanceof ApiError ? error.detail : "Upload failed";

      toast.error(message);
    },
  });
}
