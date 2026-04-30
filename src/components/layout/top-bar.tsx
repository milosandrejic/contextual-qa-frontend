import { Plus, Menu, Sparkles, Settings as SettingsIcon } from "lucide-react";

import {
  Box,
  Button,
  Tooltip,
  Typography,
  IconButton,
} from "@mui/material";

import { gradients } from "@/theme";

interface TopBarProps {
  onNewChat: () => void;
  onOpenSettings: () => void;
  onTogglePanel?: () => void;
  showPanelToggle?: boolean;
}

export function TopBar({
  onNewChat,
  onOpenSettings,
  onTogglePanel,
  showPanelToggle,
}: TopBarProps) {
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
        gap: 1,
        bgcolor: "background.default",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, minWidth: 0 }}>
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
            flexShrink: 0,
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
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          Contextual QA
        </Typography>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Tooltip title="Settings">
          <IconButton
            size="small"
            onClick={onOpenSettings}
            aria-label="Open settings"
          >
            <SettingsIcon size={18} />
          </IconButton>
        </Tooltip>

        <Button
          variant="contained"
          color="primary"
          startIcon={<Plus size={16} />}
          onClick={onNewChat}
        >
          <Box
            component="span"
            sx={{ display: { xs: "none", sm: "inline" } }}
          >
            Start new session
          </Box>
          <Box
            component="span"
            sx={{ display: { xs: "inline", sm: "none" } }}
          >
            New
          </Box>
        </Button>

        {
          showPanelToggle &&
          <Tooltip title="Documents">
            <IconButton
              size="small"
              onClick={onTogglePanel}
              aria-label="Toggle documents panel"
            >
              <Menu size={18} />
            </IconButton>
          </Tooltip>
        }
      </Box>
    </Box>
  );
}
