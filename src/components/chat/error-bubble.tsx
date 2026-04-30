import { RotateCw, AlertTriangle } from "lucide-react";

import {
  Box,
  Button,
  Typography,
} from "@mui/material";

interface ErrorBubbleProps {
  message: string;
  onRetry?: () => void;
  retrying?: boolean;
}

export function ErrorBubble({
  message,
  onRetry,
  retrying,
}: ErrorBubbleProps) {
  return (
    <Box sx={{ display: "flex", gap: 1.25, alignItems: "flex-start" }}>
      <Box
        sx={{
          width: 22,
          height: 22,
          borderRadius: "50%",
          bgcolor: "error.main",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          mt: 0.25,
        }}
      >
        <AlertTriangle size={13} />
      </Box>

      <Box
        sx={{
          minWidth: 0,
          maxWidth: 760,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: 0.5,
        }}
      >
        <Typography variant="body2" sx={{ color: "error.main" }}>
          {message}
        </Typography>

        {
          onRetry &&
          <Button
            size="small"
            variant="text"
            color="error"
            onClick={onRetry}
            disabled={retrying}
            startIcon={<RotateCw size={12} />}
            sx={{
              minWidth: 0,
              px: 0.75,
              py: 0.25,
              fontSize: 12,
              textTransform: "none",
            }}
          >
            {retrying ? "Retrying..." : "Retry"}
          </Button>
        }
      </Box>
    </Box>
  );
}
