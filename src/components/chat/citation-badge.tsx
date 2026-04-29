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
      aria-label={`Open source ${citation}`}
      onClick={handleClick}
      sx={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        verticalAlign: "super",
        position: "relative",
        top: -1,
        mx: 0.125,
        minWidth: 18,
        height: 18,
        borderRadius: 999,
        fontSize: 10,
        fontWeight: 700,
        fontFamily: "mono.fontFamily",
        color: "secondary.main",
        bgcolor: "rgba(16,185,129,0.1)",
        border: "1px solid",
        borderColor: "rgba(16,185,129,0.22)",
        px: 0.5,
        lineHeight: 1,
        cursor: "pointer",
        transition: "background-color 120ms, border-color 120ms, transform 120ms",
        "&:hover": {
          bgcolor: "rgba(16,185,129,0.16)",
          borderColor: "rgba(16,185,129,0.35)",
          transform: "translateY(-1px)",
        },
        "&:focus-visible": {
          outline: "2px solid",
          outlineColor: "rgba(16,185,129,0.35)",
          outlineOffset: 2,
        },
      }}
    >
      {citation}
    </Box>
  );
}
