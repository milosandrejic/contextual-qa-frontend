import {
  Box,
  Button,
  Dialog,
  Typography,
  DialogTitle,
  DialogActions,
  DialogContent,
} from "@mui/material";

import { formatBytes } from "@/utils/format-bytes";
import { formatRelativeTime } from "@/utils/format-relative-time";

import type { Document } from "@/types/document";

interface DocumentDetailsDialogProps {
  document: Document;
  open: boolean;
  onClose: () => void;
}

interface RowProps {
  label: string;
  value: string;
  mono?: boolean;
}

function Row({ label, value, mono }: RowProps) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        gap: 2,
        py: 0.75,
      }}
    >
      <Typography
        variant="caption"
        sx={{ color: "text.secondary" }}
      >
        {label}
      </Typography>

      <Typography
        variant={mono ? "mono" : "body2"}
        sx={{
          color: "text.primary",
          fontWeight: mono ? 400 : 500,
          textAlign: "right",
          wordBreak: "break-all",
        }}
      >
        {value}
      </Typography>
    </Box>
  );
}

export function DocumentDetailsDialog({ document, open, onClose }: DocumentDetailsDialogProps) {
  const pageCount = document.page_count ?? 0;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
    >
      <DialogTitle sx={{ pb: 1 }}>{document.filename}</DialogTitle>

      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column", divider: "1px solid" }}>
          <Row label="ID" value={document.id} mono />

          <Row label="Size" value={formatBytes(document.file_size)} />

          <Row label="Pages" value={String(pageCount)} />

          <Row label="Chunks" value={String(document.chunk_count)} />

          <Row label="Indexed" value={formatRelativeTime(document.indexed_at)} />
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
