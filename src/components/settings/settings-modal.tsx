import type { TopK } from "@/context/session-context";

import { X } from "lucide-react";

import {
  Box,
  Dialog,
  Typography,
  IconButton,
  DialogTitle,
  ToggleButton,
  DialogContent,
  ToggleButtonGroup,
} from "@mui/material";

import { useSession } from "@/context/session-context";

interface SettingsModalProps {
  open: boolean;
  onClose: () => void;
}

const TOP_K_OPTIONS: TopK[] = [2, 3, 5];

export function SettingsModal({ open, onClose }: SettingsModalProps) {
  const { defaultTopK, setDefaultTopK } = useSession();

  const handleChange = (_: unknown, next: TopK | null) => {
    if (next !== null) {
      setDefaultTopK(next);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
    >
      <DialogTitle
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          fontWeight: 700,
        }}
      >
        Settings

        <IconButton size="small" onClick={onClose} aria-label="Close settings">
          <X size={16} />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <Typography variant="body2" sx={{ fontWeight: 600 }}>
            Default top_k
          </Typography>

          <Typography variant="caption" sx={{ color: "text.secondary" }}>
            Number of source chunks retrieved per question.
          </Typography>

          <ToggleButtonGroup
            exclusive
            size="small"
            value={defaultTopK}
            onChange={handleChange}
            sx={{ mt: 1 }}
          >
            {
              TOP_K_OPTIONS.map((value) => (
                <ToggleButton key={value} value={value}>
                  {value}
                </ToggleButton>
              ))
            }
          </ToggleButtonGroup>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
