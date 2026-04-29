import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "@fontsource/jetbrains-mono/400.css";
import "@fontsource/jetbrains-mono/500.css";

import { Toaster } from "sonner";
import { Send } from "lucide-react";
import { QueryClientProvider } from "@tanstack/react-query";

import { ThemeProvider } from "@mui/material/styles";
import { Box, InputBase, Typography, IconButton, CssBaseline } from "@mui/material";

import { theme } from "@/theme";
import { queryClient } from "@/lib/query-client";
import { SessionProvider } from "@/context/session-context";

import { AppShell } from "@/components/layout/app-shell";

export function App() {
  const handleNewChat = () => {
    // wired in Phase 7
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <QueryClientProvider client={queryClient}>
        <SessionProvider>
          <AppShell onNewChat={handleNewChat}>
            <Box
              sx={{
                flex: 1,
                minHeight: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "text.secondary",
                px: 4,
              }}
            >
              <Typography variant="body2">
                Chat area placeholder — coming in Phase 5.
              </Typography>
            </Box>

            <Box sx={{ flexShrink: 0, px: { xs: 2, md: 4 }, pb: 3, pt: 1 }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  px: 2,
                  py: 1.25,
                  border: 1,
                  borderColor: "divider",
                  borderRadius: 2,
                  bgcolor: "background.paper",
                }}
              >
                <InputBase
                  fullWidth
                  disabled
                  placeholder="Ask a question about your documents..."
                  sx={{ fontSize: 14 }}
                />

                <IconButton size="small" disabled aria-label="Send">
                  <Send size={16} />
                </IconButton>
              </Box>
            </Box>
          </AppShell>

          <Toaster
            position="top-right"
            richColors
            closeButton
          />
        </SessionProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
