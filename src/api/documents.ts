import { apiGet, apiUpload, apiDelete } from "@/api/client";

import type { Document, UploadDocumentResponse } from "@/types/document";

export function getDocuments(): Promise<Document[]> {
  return apiGet<Document[]>("/documents");
}

export function getDocument(id: string): Promise<Document> {
  return apiGet<Document>(`/documents/${id}`);
}

export function uploadDocument(file: File): Promise<UploadDocumentResponse> {
  return apiUpload<UploadDocumentResponse>("/upload", file);
}

export function deleteDocument(id: string): Promise<{ detail: string }> {
  return apiDelete<{ detail: string }>(`/documents/${id}`);
}
