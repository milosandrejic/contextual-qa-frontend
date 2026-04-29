import { Upload } from "lucide-react";
import { useDropzone } from "react-dropzone";

import {
  Box,
  Typography,
} from "@mui/material";

interface DropzoneProps {
  isUploading: boolean;
  onFilesDropped: (files: File[]) => void;
}

const ACCEPT = {
  "application/pdf": [".pdf"],
  "text/plain": [".txt"],
};

export function Dropzone({ isUploading, onFilesDropped }: DropzoneProps) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: ACCEPT,
    multiple: true,
    disabled: isUploading,
    onDrop: onFilesDropped,
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
        cursor: isUploading ? "not-allowed" : "pointer",
        transition: "border-color 120ms, background-color 120ms",
        "&:hover": {
          borderColor: isUploading ? "divider" : "primary.main",
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
