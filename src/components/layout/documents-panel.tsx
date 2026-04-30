import { FileSearch } from "lucide-react";

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
          <Box
            sx={{
              textAlign: "center",
              color: "text.secondary",
              mt: 2,
              px: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 0.5,
            }}
          >
            <Box
              sx={{
                width: 56,
                height: 56,
                borderRadius: "50%",
                mb: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                background: "linear-gradient(135deg, #6366F1 0%, #10B981 100%)",
                boxShadow: "0 8px 20px rgba(99,102,241,0.22)",
              }}
            >
              <FileSearch size={22} />
            </Box>

            <Typography variant="body2" sx={{ color: "text.primary", fontWeight: 600 }}>
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
