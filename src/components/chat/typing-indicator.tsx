import { Box } from "@mui/material";

export function TypingIndicator() {
  return (
    <Box
      sx={{
        display: "inline-flex",
        alignItems: "center",
        gap: 0.5,
        px: 1.5,
        py: 1,
        borderRadius: 2,
        border: 1,
        borderColor: "divider",
        bgcolor: "surface.main",
      }}
    >
      <Box
        sx={{
          width: 6,
          height: 6,
          borderRadius: "50%",
          bgcolor: "text.secondary",
          animation: "pulse 900ms infinite ease-in-out",
          "@keyframes pulse": {
            "0%, 100%": { opacity: 0.25, transform: "translateY(0)" },
            "50%": { opacity: 1, transform: "translateY(-2px)" },
          },
        }}
      />

      <Box
        sx={{
          width: 6,
          height: 6,
          borderRadius: "50%",
          bgcolor: "text.secondary",
          animation: "pulse 900ms infinite ease-in-out 120ms",
        }}
      />

      <Box
        sx={{
          width: 6,
          height: 6,
          borderRadius: "50%",
          bgcolor: "text.secondary",
          animation: "pulse 900ms infinite ease-in-out 240ms",
        }}
      />
    </Box>
  );
}
