import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "@fontsource/jetbrains-mono/400.css";
import "@fontsource/jetbrains-mono/500.css";

import { useState } from "react";
import { Toaster } from "sonner";
import { Upload } from "lucide-react";
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
import { useDocuments } from "@/hooks/use-documents";
import { useSessionHistory } from "@/hooks/use-session-history";

import { theme } from "@/theme";
import { ApiError } from "@/api/client";
import { queryClient } from "@/lib/query-client";
import { useSession , SessionProvider } from "@/context/session-context";

import { ChatInput } from "@/components/chat/chat-input";
import { AppShell } from "@/components/layout/app-shell";
import { ErrorBubble } from "@/components/chat/error-bubble";
import { MessageList } from "@/components/chat/message-list";
import { ChatSkeleton } from "@/components/chat/chat-skeleton";

const SUGGESTED_QUESTIONS = [
  "Summarize the key findings and include citations.",
  "What methodology was used and where is it described?",
  "List the main conclusions in bullet points.",
  "What limitations are mentioned in the documents?",
];

function ChatView() {
  const askMutation = useAsk();
  const newChatMutation = useNewChat();
  const sessionHistory = useSessionHistory();
  const documentsQuery = useDocuments();
  const { defaultTopK } = useSession();

  const [draft, setDraft] = useState("");
  const [lastAttempt, setLastAttempt] = useState<{ question: string; topK: 2 | 3 | 5 } | null>(null);

  const messages = sessionHistory.data?.messages ?? [];

  const pendingQuestion = (() => {
    if (askMutation.isPending) {
      return askMutation.variables?.question ?? null;
    }

    if (askMutation.isError) {
      return lastAttempt?.question ?? null;
    }

    return null;
  })();
  const documents = documentsQuery.data ?? [];
  const hasDocuments = documents.length > 0;

  const handleSubmit = (question: string) => {
    setLastAttempt({ question, topK: defaultTopK });
    askMutation.mutate({ question, topK: defaultTopK });
    setDraft("");
  };

  const handleRetry = () => {
    if (!lastAttempt) {
      return;
    }

    askMutation.mutate(lastAttempt);
  };

  const handleNewChat = () => {
    setLastAttempt(null);
    askMutation.reset();
    newChatMutation.mutate();
  };

  const isHistoryLoading = sessionHistory.isLoading;
  const showEmptyState = messages.length === 0 && !askMutation.isPending && !isHistoryLoading;
  const askErrorMessage = askMutation.isError? (askMutation.error instanceof ApiError ? askMutation.error.detail : "Failed to get an answer"): null;

  return (
    <AppShell onNewChat={handleNewChat}>
      {
        isHistoryLoading &&
        <ChatSkeleton />
      }

      {
        !isHistoryLoading && showEmptyState && !hasDocuments &&
        <Box
          sx={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            px: 4,
          }}
        >
          <Box sx={{ maxWidth: 520, width: "100%", textAlign: "center" }}>
            <Box
              sx={{
                width: 72,
                height: 72,
                borderRadius: "50%",
                mx: "auto",
                mb: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                background: "linear-gradient(135deg, #6366F1 0%, #10B981 100%)",
                boxShadow: "0 12px 32px rgba(99,102,241,0.28)",
              }}
            >
              <Upload size={28} />
            </Box>

            <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
              Upload a document to get started
            </Typography>

            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Drop a PDF or TXT file in the documents panel. Once it&rsquo;s indexed, ask anything about it.
            </Typography>
          </Box>
        </Box>
      }

      {
        !isHistoryLoading && showEmptyState && hasDocuments &&
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
              {
                SUGGESTED_QUESTIONS.map((suggestion) => (
                  <Button
                    key={suggestion}
                    variant="outlined"
                    onClick={() => setDraft(suggestion)}
                  >
                    {suggestion}
                  </Button>
                ))
              }
            </Box>
          </Box>
        </Box>
      }

      {
        !isHistoryLoading && !showEmptyState &&
        <MessageList
          messages={messages}
          pendingQuestion={pendingQuestion}
          isThinking={askMutation.isPending || sessionHistory.isFetching}
          latestLatencyMs={askMutation.data?.latency_ms ?? null}
          errorContent={
            askErrorMessage? (
              <ErrorBubble
                message={askErrorMessage}
                onRetry={lastAttempt ? handleRetry : undefined}
                retrying={askMutation.isPending}
              />
            ): null
          }
        />
      }

      <ChatInput
        value={draft}
        disabled={askMutation.isPending || newChatMutation.isPending}
        onChange={setDraft}
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
