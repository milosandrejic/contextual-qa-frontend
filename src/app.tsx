import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "@fontsource/jetbrains-mono/400.css";
import "@fontsource/jetbrains-mono/500.css";

import { useState } from "react";
import { Toaster } from "sonner";
import { QueryClientProvider } from "@tanstack/react-query";

import { ThemeProvider } from "@mui/material/styles";
import {
  Box,
  Button,
  Typography,
  CssBaseline,
} from "@mui/material";

import { useAsk } from "@/hooks/use-ask";
import { useNewChat } from "@/hooks/use-new-chat";
import { useSessionHistory } from "@/hooks/use-session-history";

import { theme } from "@/theme";
import { queryClient } from "@/lib/query-client";
import { useSession , SessionProvider } from "@/context/session-context";

import { ChatInput } from "@/components/chat/chat-input";
import { AppShell } from "@/components/layout/app-shell";
import { MessageList } from "@/components/chat/message-list";

function ChatView() {
  const askMutation = useAsk();
  const newChatMutation = useNewChat();
  const sessionHistory = useSessionHistory();
  const { defaultTopK, setDefaultTopK } = useSession();

  const [draft, setDraft] = useState("");

  const messages = sessionHistory.data?.messages ?? [];
  const pendingQuestion = askMutation.isPending ? askMutation.variables?.question ?? null : null;

  const handleTopKChange = (value: 2 | 3 | 5) => {
    setDefaultTopK(value);
  };

  const handleSubmit = (question: string) => {
    askMutation.mutate({ question, topK: defaultTopK });
    setDraft("");
  };

  const handleNewChat = () => {
    newChatMutation.mutate();
  };

  const showEmptyState = messages.length === 0 && !askMutation.isPending && !sessionHistory.isLoading;

  return (
    <AppShell onNewChat={handleNewChat}>
      {
        showEmptyState &&
        <Box
          sx={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            px: 4,
          }}
        >
          <Box sx={{ maxWidth: 640, width: "100%" }}>
            <Typography
              variant="h5"
              sx={{ textAlign: "center", fontWeight: 700, mb: 1 }}
            >
              Ask questions about your uploaded documents
            </Typography>

            <Typography
              variant="body2"
              sx={{ textAlign: "center", color: "text.secondary", mb: 2 }}
            >
              Try one of these prompts to begin.
            </Typography>

            <Box sx={{ display: "flex", gap: 1, justifyContent: "center", flexWrap: "wrap" }}>
              <Button
                variant="outlined"
                onClick={() => setDraft("Summarize the key findings and include citations.")}
              >
                Summarize findings
              </Button>

              <Button
                variant="outlined"
                onClick={() => setDraft("What methodology was used and where is it described?")}
              >
                Explain methodology
              </Button>
            </Box>
          </Box>
        </Box>
      }

      {
        !showEmptyState &&
        <MessageList
          messages={messages}
          pendingQuestion={pendingQuestion}
          isThinking={askMutation.isPending || sessionHistory.isFetching}
          latestLatencyMs={askMutation.data?.latency_ms ?? null}
        />
      }

      <ChatInput
        value={draft}
        topK={defaultTopK}
        disabled={askMutation.isPending || newChatMutation.isPending}
        onChange={setDraft}
        onTopKChange={handleTopKChange}
        onSubmit={handleSubmit}
      />
    </AppShell>
  );
}

export function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <QueryClientProvider client={queryClient}>
        <SessionProvider>
          <ChatView />

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
