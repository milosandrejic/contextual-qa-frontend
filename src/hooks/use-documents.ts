import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/lib/query-keys";
import { getDocuments } from "@/api/documents";

export function useDocuments() {
  return useQuery({
    queryKey: queryKeys.documents,
    queryFn: getDocuments,
  });
}
