import { Typography } from "@mui/material";

import type { TokenUsage } from "@/types/message";

interface MessageFooterProps {
  tokenUsage?: TokenUsage | null;
  latencyMs?: number | null;
}

function getTotalTokens(tokenUsage?: TokenUsage | null): number | null {
  if (!tokenUsage) {
    return null;
  }

  if (typeof tokenUsage.total_tokens === "number") {
    return tokenUsage.total_tokens;
  }

  if (typeof tokenUsage.prompt_tokens === "number" && typeof tokenUsage.completion_tokens === "number") {
    return tokenUsage.prompt_tokens + tokenUsage.completion_tokens;
  }

  return null;
}

export function MessageFooter({ tokenUsage, latencyMs }: MessageFooterProps) {
  const tokens = getTotalTokens(tokenUsage);

  if (tokens === null && latencyMs == null) {
    return null;
  }

  const latencyLabel = latencyMs == null ? "-" : `${Math.round(latencyMs)}ms`;

  return (
    <Typography
      variant="caption"
      sx={{
        display: "block",
        mt: 0.75,
        color: "text.secondary",
        fontFamily: "mono.fontFamily",
        fontSize: 11,
      }}
    >
      {tokens ?? "-"} tokens • {latencyLabel}
    </Typography>
  );
}
