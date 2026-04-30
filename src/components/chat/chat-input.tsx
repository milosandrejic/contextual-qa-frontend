import { ArrowUp } from "lucide-react";
import { useRef, useMemo, useState, useEffect } from "react";

import {
  Box,
  IconButton,
  Typography,
} from "@mui/material";

interface ChatInputProps {
  value: string;
  disabled: boolean;
  onChange: (value: string) => void;
  onSubmit: (question: string) => void;
}

const MAX_LENGTH = 2_000;
const MAX_VISIBLE_LINES = 6;
const LINE_HEIGHT_PX = 24;
const MAX_TEXTAREA_HEIGHT = MAX_VISIBLE_LINES * LINE_HEIGHT_PX;

export function ChatInput({
  value,
  disabled,
  onChange,
  onSubmit,
}: ChatInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const remaining = useMemo(() => MAX_LENGTH - value.length, [value.length]);
  const showCount = remaining < 200;

  useEffect(() => {
    if (!textareaRef.current) {
      return;
    }

    const node = textareaRef.current;

    node.style.height = "0px";

    const nextHeight = Math.min(node.scrollHeight, MAX_TEXTAREA_HEIGHT);

    node.style.height = `${nextHeight}px`;
  }, [value]);

  const canSend = !disabled && value.trim().length > 0;

  const handleSend = () => {
    if (!canSend) {
      return;
    }

    onSubmit(value.trim());
  };

  return (
    <Box sx={{ flexShrink: 0, px: { xs: 2, md: 4 }, pb: 2.5, pt: 1 }}>
      <Box sx={{ maxWidth: 900, mx: "auto" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-end",
            gap: 1,
            border: 1,
            borderColor: isFocused ? "primary.main" : "divider",
            bgcolor: "background.paper",
            borderRadius: 2,
            pl: 2.5,
            pr: 2,
            py: 1,
            transition: "border-color 120ms, box-shadow 120ms",
            boxShadow: isFocused ? "0 0 0 4px rgba(99,102,241,0.12)" : "none",
          }}
        >
          <Box
            component="textarea"
            ref={textareaRef}
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
              flex: 1,
              resize: "none",
              border: 0,
              outline: "none",
              bgcolor: "transparent",
              font: "inherit",
              fontSize: 14,
              color: "text.primary",
              lineHeight: 1.5,
              maxHeight: `${MAX_TEXTAREA_HEIGHT}px`,
              minHeight: `${LINE_HEIGHT_PX}px`,
              overflowY: "auto",
              scrollbarWidth: "none",
              "&::-webkit-scrollbar": {
                display: "none",
              },
              py: 1,
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

          <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexShrink: 0, alignSelf: "flex-end", pb: 0.25 }}>
            {
              showCount &&
              <Typography
                variant="caption"
                sx={{
                  color: remaining < 120 ? "error.main" : "text.secondary",
                  fontFamily: "mono.fontFamily",
                }}
              >
                {value.length}/{MAX_LENGTH}
              </Typography>
            }

            <IconButton
              type="button"
              onClick={handleSend}
              disabled={!canSend}
              aria-label="Send message"
              sx={{
                width: 32,
                height: 32,
                bgcolor: canSend ? "primary.main" : "action.disabledBackground",
                color: canSend ? "#fff" : "text.disabled",
                "&:hover": {
                  bgcolor: canSend ? "primary.dark" : "action.disabledBackground",
                },
                "&.Mui-disabled": {
                  bgcolor: "action.disabledBackground",
                  color: "text.disabled",
                },
              }}
            >
              <ArrowUp size={16} />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
