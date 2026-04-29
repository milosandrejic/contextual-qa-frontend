import { ChevronDown } from "lucide-react";

import {
  Box,
  Accordion,
  Typography,
  AccordionDetails,
  AccordionSummary,
} from "@mui/material";

import { SourceChunkCard } from "@/components/chat/source-chunk-card";

import type { Source } from "@/types/message";

interface SourcesAccordionProps {
  sources: Source[];
  open: boolean;
  highlightedCitation: number | null;
  onToggle: (expanded: boolean) => void;
}

export function SourcesAccordion({
  sources,
  open,
  highlightedCitation,
  onToggle,
}: SourcesAccordionProps) {
  return (
    <Accordion
      disableGutters
      expanded={open}
      onChange={(_, expanded) => onToggle(expanded)}
      sx={{
        mt: 0.75,
        boxShadow: "none",
        border: 0,
        background: "transparent",
        "&::before": {
          display: "none",
        },
      }}
    >
      <AccordionSummary
        expandIcon={<ChevronDown size={16} />}
        sx={{
          px: 0,
          minHeight: "auto",
          "& .MuiAccordionSummary-content": {
            my: 0,
          },
        }}
      >
        <Typography
          variant="body2"
          sx={{ color: "text.secondary", fontWeight: 600 }}
        >
          Sources ({sources.length})
        </Typography>
      </AccordionSummary>

      <AccordionDetails sx={{ px: 0, pt: 1, pb: 0 }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          {
            sources.map((source) => (
              <Box key={`${source.citation}-${source.chunk_index ?? "na"}`}>
                <SourceChunkCard
                  source={source}
                  highlighted={highlightedCitation === source.citation}
                />
              </Box>
            ))
          }
        </Box>
      </AccordionDetails>
    </Accordion>
  );
}
