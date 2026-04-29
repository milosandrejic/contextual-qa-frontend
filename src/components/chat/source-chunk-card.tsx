import { Box, Typography } from "@mui/material";

import { formatDistance } from "@/utils/format-distance";

import type { Source } from "@/types/message";

interface SourceChunkCardProps {
  source: Source;
  highlighted?: boolean;
}

export function SourceChunkCard({ source, highlighted }: SourceChunkCardProps) {
  const sourceName = source.source ?? "Unknown source";
  const pageLabel = source.page === null ? "Unknown page" : `Page ${source.page}`;

  return (
    <Box
      sx={{
        border: 1,
        borderColor: highlighted ? "secondary.main" : "divider",
        borderRadius: 2,
        px: 1.5,
        py: 1.25,
        bgcolor: highlighted ? "rgba(16,185,129,0.06)" : "surface.main",
      }}
    >
      <Typography
        variant="body2"
        sx={{
          fontWeight: 600,
          color: "text.primary",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {sourceName}
      </Typography>

      <Typography
        variant="caption"
        sx={{ color: "text.secondary" }}
      >
        {pageLabel} • Distance: {formatDistance(source.distance)}
      </Typography>

      <Typography
        variant="body2"
        sx={{ mt: 0.75, color: "text.secondary" }}
      >
        {source.text}
      </Typography>
    </Box>
  );
}
