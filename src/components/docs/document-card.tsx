import type { MouseEvent } from "react";

import { useState } from "react";
import {
  Eye,
  Trash2,
  FileText,
  MoreVertical,
} from "lucide-react";

import {
  Box,
  Menu,
  Button,
  Dialog,
  MenuItem,
  Typography,
  IconButton,
  DialogTitle,
  ListItemIcon,
  ListItemText,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";

import { useDeleteDocument } from "@/hooks/use-delete-document";

import { formatBytes } from "@/utils/format-bytes";
import { formatRelativeTime } from "@/utils/format-relative-time";

import { DocumentDetailsDialog } from "@/components/docs/document-details-dialog";

import type { Document } from "@/types/document";

interface DocumentCardProps {
  document: Document;
}

export function DocumentCard({ document }: DocumentCardProps) {
  const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const deleteDoc = useDeleteDocument();

  const openMenu = (e: MouseEvent<HTMLButtonElement>) => {
    setMenuAnchor(e.currentTarget);
  };

  const closeMenu = () => setMenuAnchor(null);

  const handleViewDetails = () => {
    setDetailsOpen(true);
    closeMenu();
  };

  const handleAskDelete = () => {
    setConfirmOpen(true);
    closeMenu();
  };

  const handleConfirmDelete = () => {
    deleteDoc.mutate(document.id, {
      onSuccess: () => setConfirmOpen(false),
    });
  };

  const pageCount = document.page_count ?? 0;

  return (
    <>
      <Box
        sx={{
          position: "relative",
          border: 1,
          borderColor: "divider",
          borderRadius: 2,
          px: 1.5,
          py: 1.25,
          bgcolor: "surface.main",
          transition: "border-color 120ms, box-shadow 120ms",
          "&:hover": {
            borderColor: "text.disabled",
            "& .doc-actions": { opacity: 1 },
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            gap: 1.25
          }}
        >
          <Box
            sx={{
              flexShrink: 0,
              width: 28,
              height: 28,
              borderRadius: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "primary.main",
              bgcolor: "rgba(99,102,241,0.08)",
            }}
          >
            <FileText size={16} />
          </Box>

          <Box
            sx={{
              minWidth: 0,
              flex: 1,
              display: "flex",
              flexDirection: "column"
            }}
          >
            <Typography
              variant="body2"
              sx={{
                fontWeight: 600,
                color: "text.primary",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {document.filename}
            </Typography>

            <Typography
              variant="caption"
              sx={{ color: "text.secondary" }}
            >
              {formatBytes(document.file_size)}
            </Typography>
          </Box>

          <IconButton
            size="small"
            onClick={openMenu}
            aria-label="Document actions"
            className="doc-actions"
            sx={{
              opacity: { xs: 1, md: 0 },
              transition: "opacity 120ms",
              mt: -0.5,
              mr: -0.5,
            }}
          >
            <MoreVertical size={16} />
          </IconButton>
        </Box>

        <Box
          sx={{
            mt: 0.75,
            display: "flex",
            flexDirection: "column",
            gap: 0,
          }}
        >
          <Typography
            variant="caption"
            sx={{ color: "text.secondary" }}
          >
            {pageCount} {pageCount === 1 ? "page" : "pages"} • {document.chunk_count} chunks
          </Typography>

          <Typography
            variant="caption"
            sx={{ color: "text.secondary" }}
          >
            Indexed {formatRelativeTime(document.indexed_at)}
          </Typography>
        </Box>
      </Box>

      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={closeMenu}
      >
        <MenuItem onClick={handleViewDetails}>
          <ListItemIcon>
            <Eye size={16} />
          </ListItemIcon>

          <ListItemText>View details</ListItemText>
        </MenuItem>

        <MenuItem
          onClick={handleAskDelete}
          sx={{ color: "error.main" }}
        >
          <ListItemIcon sx={{ color: "error.main" }}>
            <Trash2 size={16} />
          </ListItemIcon>

          <ListItemText>Delete</ListItemText>
        </MenuItem>
      </Menu>

      <DocumentDetailsDialog
        document={document}
        open={detailsOpen}
        onClose={() => setDetailsOpen(false)}
      />

      <Dialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>Delete document?</DialogTitle>

        <DialogContent>
          <DialogContentText>
            This will permanently remove <strong>{document.filename}</strong> and its embeddings.
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)} disabled={deleteDoc.isPending}>
            Cancel
          </Button>

          <Button
            color="error"
            variant="contained"
            onClick={handleConfirmDelete}
            disabled={deleteDoc.isPending}
          >
            {deleteDoc.isPending ? "Deleting…" : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
