import { Box, Typography } from "@mui/material";

interface UserMessageProps {
  content: string;
}

export function UserMessage({ content }: UserMessageProps) {
  return (
    <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
      <Box
        sx={{
          maxWidth: 560,
          borderRadius: 2,
          px: 2,
          py: 1.25,
          bgcolor: "rgba(99,102,241,0.10)",
          border: 1,
          borderColor: "rgba(99,102,241,0.25)",
        }}
      >
        <Typography
          variant="body1"
          sx={{ color: "text.primary", whiteSpace: "pre-wrap" }}
        >
          {content}
        </Typography>
      </Box>
    </Box>
  );
}
