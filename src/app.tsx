import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "@fontsource/jetbrains-mono/400.css";
import "@fontsource/jetbrains-mono/500.css";

import { Toaster } from "sonner";
import { QueryClientProvider } from "@tanstack/react-query";

import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";

import { theme } from "@/theme";
import { queryClient } from "@/lib/query-client";
import { SessionProvider } from "@/context/session-context";

export function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <QueryClientProvider client={queryClient}>
        <SessionProvider>
          <main>
            <h1>Contextual QA</h1>
          </main>

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
