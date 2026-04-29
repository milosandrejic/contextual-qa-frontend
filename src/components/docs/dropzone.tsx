import { Upload } from "lucide-react";
import { useDropzone } from "react-dropzone";

import {
  Box,
  Typography,
} from "@mui/material";

import { useUploadDocument } from "@/hooks/use-upload-document";

const ACCEPT = {
  "application/pdf": [".pdf"],
  "text/plain": [".txt"],
};

export function Dropzone() {
  const upload = useUploadDocument();

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: ACCEPT,
    multiple: true,
    disabled: upload.isPending,
    onDrop: (files) => {
      for (const file of files) {
        upload.mutate(file);
      }
    },
  });

  return (
    <Box
      {...getRootProps()}
      sx={{
        border: "1.5px dashed",
        borderColor: isDragActive ? "primary.main" : "divider",
        bgcolor: isDragActive ? "rgba(99,102,241,0.04)" : "transparent",
        borderRadius: 2,
        px: 2,
        py: 2.5,
        textAlign: "center",
        cursor: upload.isPending ? "not-allowed" : "pointer",
        transition: "border-color 120ms, background-color 120ms",
        "&:hover": {
          borderColor: upload.isPending ? "divider" : "primary.main",
        },
      }}
    >
      <input {...getInputProps()} />

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          color: "text.secondary",
          mb: 0.75,
        }}
      >
        <Upload size={18} />
      </Box>

      <Typography
        variant="body2"
        sx={{ fontWeight: 500, color: "text.primary" }}
      >
        {isDragActive ? "Drop to upload" : "Drop files or click to browse"}
      </Typography>

      <Typography variant="caption" sx={{ color: "text.secondary" }}>
        PDF or TXT files
      </Typography>
    </Box>
  );
}
