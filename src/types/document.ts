export interface Document {
  id: string;
  filename: string;
  file_size: number;
  page_count: number | null;
  chunk_count: number;
  indexed_at: string;
}

export interface UploadDocumentResponse extends Document {
  stored_in_vector_db: number;
  chunks_file: string;
}
