import { Box, Typography, CircularProgress } from "@mui/material";

interface UploadProgressProps {
  filename: string;
}

export function UploadProgress({ filename }: UploadProgressProps) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1.5,
        border: 1,
        borderColor: "divider",
        borderRadius: 2,
        px: 1.5,
        py: 1.25,
        bgcolor: "background.paper",
      }}
    >
      <CircularProgress size={16} thickness={5} />

      <Box sx={{ minWidth: 0, flex: 1 }}>
        <Typography
          variant="body2"
          sx={{
            fontWeight: 500,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {filename}
        </Typography>

        <Typography variant="caption" sx={{ color: "text.secondary" }}>
          Uploading and indexing…
        </Typography>
      </Box>
    </Box>
  );
}
