import {
  Box,
  Alert,
  Skeleton,
  Typography,
} from "@mui/material";

import { useDocuments } from "@/hooks/use-documents";
import { useUploadDocument } from "@/hooks/use-upload-document";

import { Dropzone } from "@/components/docs/dropzone";
import { DocumentCard } from "@/components/docs/document-card";
import { UploadProgress } from "@/components/docs/upload-progress";

export function DocumentsPanel() {
  const { data: documents, isLoading, isError, error } = useDocuments();
  const upload = useUploadDocument();

  const uploadingFile = upload.isPending ? upload.variables : null;

  const handleFilesDropped = (files: File[]) => {
    for (const file of files) {
      upload.mutate(file);
    }
  };

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        p: 3,
        gap: 1.5,
      }}
    >
      <Typography
        variant="h6"
        sx={{ fontWeight: 700, letterSpacing: "-0.01em" }}
      >
        Documents
      </Typography>

      <Dropzone
        isUploading={upload.isPending}
        onFilesDropped={handleFilesDropped}
      />

      {
        uploadingFile &&
        <UploadProgress filename={uploadingFile.name} />
      }

      <Box
        sx={{
          flex: 1,
          minHeight: 0,
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          gap: 1,
        }}
      >
        {
          isLoading &&
          <>
            <Skeleton variant="rounded" height={84} />
            <Skeleton variant="rounded" height={84} />
          </>
        }

        {
          isError &&
          <Alert severity="error" variant="outlined">
            {error instanceof Error ? error.message : "Failed to load documents"}
          </Alert>
        }

        {
          !isLoading && !isError && documents && documents.length === 0 && !uploadingFile &&
          <Box sx={{ textAlign: "center", color: "text.secondary", mt: 1 }}>
            <Typography variant="body2">
              No documents yet
            </Typography>

            <Typography variant="caption">
              Upload a PDF or TXT file to get started.
            </Typography>
          </Box>
        }

        {
          documents?.map((doc) => (
            <DocumentCard key={doc.id} document={doc} />
          ))
        }
      </Box>
    </Box>
  );
}
