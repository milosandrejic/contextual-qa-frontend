import { Box, Typography } from "@mui/material";

export function DocumentsPanel() {
  return (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column", p: 3, gap: 2.5 }}>
      <Typography variant="h6" sx={{ fontWeight: 700, letterSpacing: "-0.01em" }}>
        Documents
      </Typography>

      <Box
        sx={{
          border: "1.5px dashed",
          borderColor: "divider",
          borderRadius: 2,
          p: 3,
          textAlign: "center",
          color: "text.secondary",
        }}
      >
        <Typography variant="body2" sx={{ fontWeight: 500, color: "text.primary" }}>
          Drop files or click to browse
        </Typography>

        <Typography variant="caption" sx={{ color: "text.secondary" }}>
          PDF or TXT files
        </Typography>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
        <Typography variant="caption" sx={{ color: "text.secondary" }}>
          Document list — Phase 4
        </Typography>
      </Box>
    </Box>
  );
}
