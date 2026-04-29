import { useRef, useMemo, useState, useEffect } from "react";

import { Box } from "@mui/material";

import { UserMessage } from "@/components/chat/user-message";
import { TypingIndicator } from "@/components/chat/typing-indicator";
import { AssistantMessage } from "@/components/chat/assistant-message";

import type { Message } from "@/types/message";

interface MessageListProps {
  messages: Message[];
  pendingQuestion: string | null;
  isThinking: boolean;
  latestLatencyMs: number | null;
}

export function MessageList({
  messages,
  pendingQuestion,
  isThinking,
  latestLatencyMs,
}: MessageListProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [stickToBottom, setStickToBottom] = useState(true);

  const displayMessages = useMemo(() => {
    if (!pendingQuestion) {
      return messages;
    }

    const pendingUser: Message = {
      id: "pending-user",
      role: "user",
      content: pendingQuestion,
      sources: null,
      token_usage: null,
      latency_ms: null,
      created_at: new Date().toISOString(),
    };

    return [...messages, pendingUser];
  }, [messages, pendingQuestion]);

  const latestAssistantIndex = useMemo(() => {
    for (let index = displayMessages.length - 1; index >= 0; index -= 1) {
      if (displayMessages[index].role === "assistant") {
        return index;
      }
    }

    return -1;
  }, [displayMessages]);

  useEffect(() => {
    if (!stickToBottom || !containerRef.current) {
      return;
    }

    containerRef.current.scrollTop = containerRef.current.scrollHeight;
  }, [displayMessages, isThinking, stickToBottom]);

  const handleScroll = () => {
    if (!containerRef.current) {
      return;
    }

    const node = containerRef.current;
    const distanceFromBottom = node.scrollHeight - node.scrollTop - node.clientHeight;

    setStickToBottom(distanceFromBottom < 80);
  };

  return (
    <Box
      ref={containerRef}
      onScroll={handleScroll}
      sx={{
        flex: 1,
        minHeight: 0,
        overflowY: "auto",
        px: { xs: 2, md: 4 },
        pb: 2,
      }}
    >
      <Box sx={{ maxWidth: 900, mx: "auto", display: "flex", flexDirection: "column", gap: 3 }}>
        {
          displayMessages.map((message, index) => {
            if (message.role === "user") {
              return (
                <UserMessage key={message.id} content={message.content} />
              );
            }

            return (
              <AssistantMessage
                key={message.id}
                content={message.content}
                sources={message.sources ?? []}
                tokenUsage={message.token_usage}
                latencyMs={message.latency_ms ?? (index === latestAssistantIndex ? latestLatencyMs : null)}
              />
            );
          })
        }

        {
          isThinking &&
          <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
            <TypingIndicator />
          </Box>
        }

      </Box>
    </Box>
  );
}
