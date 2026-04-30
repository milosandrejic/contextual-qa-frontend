import type { ReactNode } from "react";

import { useState } from "react";

import { useTheme } from "@mui/material/styles";
import {
  Box,
  Drawer,
  useMediaQuery,
} from "@mui/material";

import { TopBar } from "@/components/layout/top-bar";
import { DocumentsPanel } from "@/components/layout/documents-panel";
import { SettingsModal } from "@/components/settings/settings-modal";

const PANEL_WIDTH = 320;

interface AppShellProps {
  children: ReactNode;
  onNewChat: () => void;
}

export function AppShell({ children, onNewChat }: AppShellProps) {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [panelOpen, setPanelOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const handleTogglePanel = () => {
    setPanelOpen((prev) => !prev);
  };

  const handleClosePanel = () => {
    setPanelOpen(false);
  };

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
        <TopBar
          onNewChat={onNewChat}
          onOpenSettings={() => setSettingsOpen(true)}
          onTogglePanel={handleTogglePanel}
          showPanelToggle={!isDesktop}
        />

        <Box sx={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column" }}>
          {children}
        </Box>
      </Box>

      {
        isDesktop &&
        <Box
          component="aside"
          sx={{
            width: PANEL_WIDTH,
            flexShrink: 0,
            borderLeft: 1,
            borderColor: "divider",
            bgcolor: "background.default",
            overflowY: "auto",
          }}
        >
          <DocumentsPanel />
        </Box>
      }

      {
        !isDesktop &&
        <Drawer
          anchor="right"
          open={panelOpen}
          onClose={handleClosePanel}
          slotProps={{
            paper: {
              sx: {
                width: isMobile ? "100vw" : PANEL_WIDTH,
                bgcolor: "background.default",
              },
            },
          }}
        >
          <DocumentsPanel onClose={handleClosePanel} />
        </Drawer>
      }

      <SettingsModal
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
      />
    </Box>
  );
}
