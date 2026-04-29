import { Plus, Sparkles } from "lucide-react";

import { Box, Button, Typography } from "@mui/material";

import { gradients } from "@/theme";

interface TopBarProps {
  onNewChat: () => void;
}

export function TopBar({ onNewChat }: TopBarProps) {
  return (
    <Box
      component="header"
      sx={{
        height: 72,
        flexShrink: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        px: { xs: 2, md: 4 },
        bgcolor: "background.default",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
        <Box
          sx={{
            width: 36,
            height: 36,
            borderRadius: "10px",
            background: gradients.brand,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            boxShadow: "0 2px 6px rgba(99,102,241,0.35)",
          }}
        >
          <Sparkles size={18} />
        </Box>

        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            letterSpacing: "-0.01em",
            color: "text.primary",
          }}
        >
          Contextual QA
        </Typography>
      </Box>

      <Button
        variant="contained"
        color="primary"
        startIcon={<Plus size={16} />}
        onClick={onNewChat}
      >
        Start new session
      </Button>
    </Box>
  );
}
