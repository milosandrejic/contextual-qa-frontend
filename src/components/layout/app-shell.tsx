import type { ReactNode } from "react";

import { useTheme } from "@mui/material/styles";
import { Box, useMediaQuery } from "@mui/material";

import { TopBar } from "@/components/layout/top-bar";
import { DocumentsPanel } from "@/components/layout/documents-panel";

const PANEL_WIDTH_DESKTOP = 320;
const PANEL_WIDTH_TABLET = 280;

interface AppShellProps {
  children: ReactNode;
  onNewChat: () => void;
}

export function AppShell({ children, onNewChat }: AppShellProps) {
  const theme = useTheme();
  const isTabletUp = useMediaQuery(theme.breakpoints.up("md"));

  const panelWidth = isTabletUp ? PANEL_WIDTH_DESKTOP : PANEL_WIDTH_TABLET;

  return (
    <Box
      sx={{
        display: "flex",
        height: "100dvh",
        bgcolor: "background.default",
      }}
    >
      <Box
        component="main"
        sx={{
          flex: 1,
          minWidth: 0,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <TopBar onNewChat={onNewChat} />

        <Box sx={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column" }}>
          {children}
        </Box>
      </Box>

      <Box
        component="aside"
        sx={{
          width: panelWidth,
          flexShrink: 0,
          borderLeft: 1,
          borderColor: "divider",
          bgcolor: "background.default",
          overflowY: "auto",
          display: { xs: "none", sm: "block" },
        }}
      >
        <DocumentsPanel />
      </Box>
    </Box>
  );
}
