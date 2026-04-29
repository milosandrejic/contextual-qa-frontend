import type { MouseEvent } from "react";

import { Box } from "@mui/material";

interface CitationBadgeProps {
  citation: number;
  onClick?: (citation: number) => void;
}

export function CitationBadge({ citation, onClick }: CitationBadgeProps) {
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    onClick?.(citation);
  };

  return (
    <Box
      component="button"
      type="button"
      onClick={handleClick}
      sx={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        mx: 0.25,
        minWidth: 20,
        height: 20,
        borderRadius: 1,
        fontSize: 11,
        fontWeight: 600,
        fontFamily: "mono.fontFamily",
        color: "secondary.main",
        bgcolor: "rgba(16,185,129,0.12)",
        border: "1px solid",
        borderColor: "rgba(16,185,129,0.28)",
        px: 0.75,
        lineHeight: 1,
        cursor: "pointer",
        "&:hover": {
          bgcolor: "rgba(16,185,129,0.18)",
        },
      }}
    >
      {citation}
    </Box>
  );
}
