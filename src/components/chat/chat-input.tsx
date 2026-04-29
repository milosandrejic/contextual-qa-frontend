import type { TopK } from "@/context/session-context";

import { Send } from "lucide-react";
import { useMemo, useState } from "react";

import {
  Box,
  Button,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";

interface ChatInputProps {
  value: string;
  topK: TopK;
  disabled: boolean;
  onChange: (value: string) => void;
  onTopKChange: (topK: TopK) => void;
  onSubmit: (question: string) => void;
}

const MAX_LENGTH = 2_000;

export function ChatInput({
  value,
  topK,
  disabled,
  onChange,
  onTopKChange,
  onSubmit,
}: ChatInputProps) {
  const [isFocused, setIsFocused] = useState(false);

  const remaining = useMemo(() => MAX_LENGTH - value.length, [value.length]);

  const handleSend = () => {
    const trimmed = value.trim();

    if (!trimmed || disabled) {
      return;
    }

    onSubmit(trimmed);
  };

  return (
    <Box sx={{ flexShrink: 0, px: { xs: 2, md: 4 }, pb: 2.5, pt: 1 }}>
      <Box sx={{ maxWidth: 900, mx: "auto" }}>
        <Box
          sx={{
            border: 1,
            borderColor: isFocused ? "primary.main" : "divider",
            bgcolor: "background.paper",
            borderRadius: 2,
            px: 1.5,
            py: 1.25,
            transition: "border-color 120ms",
          }}
        >
          <Box
            component="textarea"
            value={value}
            onChange={(event) => onChange(event.target.value.slice(0, MAX_LENGTH))}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onKeyDown={(event) => {
              const isEnter = event.key === "Enter";

              if (!isEnter || event.shiftKey || event.nativeEvent.isComposing) {
                return;
              }

              if (!disabled) {
                event.preventDefault();
                handleSend();
              }
            }}
            placeholder="Ask a question about your documents..."
            disabled={disabled}
            rows={1}
            sx={{
              width: "100%",
              resize: "none",
              border: 0,
              outline: "none",
              bgcolor: "transparent",
              font: "inherit",
              color: "text.primary",
              lineHeight: 1.5,
              maxHeight: 156,
              minHeight: 24,
              overflowY: "auto",
              mb: 1,
              "&::placeholder": {
                color: "text.secondary",
                opacity: 1,
              },
              "&:disabled": {
                opacity: 0.7,
                cursor: "not-allowed",
              },
            }}
          />

          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 1 }}>
            <ToggleButtonGroup
              size="small"
              exclusive
              value={topK}
              onChange={(_, nextTopK: TopK | null) => {
                if (nextTopK !== null) {
                  onTopKChange(nextTopK);
                }
              }}
            >
              <ToggleButton value={2}>top_k 2</ToggleButton>
              <ToggleButton value={3}>top_k 3</ToggleButton>
              <ToggleButton value={5}>top_k 5</ToggleButton>
            </ToggleButtonGroup>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Typography
                variant="caption"
                sx={{
                  color: remaining < 120 ? "error.main" : "text.secondary",
                  fontFamily: "mono.fontFamily",
                }}
              >
                {value.length}/{MAX_LENGTH}
              </Typography>

              <Button
                type="button"
                variant="contained"
                color="primary"
                onClick={handleSend}
                disabled={disabled || value.trim().length === 0}
                endIcon={<Send size={15} />}
              >
                Send
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
