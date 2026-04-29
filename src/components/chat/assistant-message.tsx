import type { ReactNode } from "react";

import remarkGfm from "remark-gfm";
import { Bot } from "lucide-react";
import { useMemo, useState } from "react";
import ReactMarkdown from "react-markdown";

import {
  Box,
  Typography,
} from "@mui/material";

import { parseCitations } from "@/utils/parse-citations";

import { MessageFooter } from "@/components/chat/message-footer";
import { SourcesAccordion } from "@/components/chat/sources-accordion";

import type { Source, TokenUsage } from "@/types/message";

interface AssistantMessageProps {
  content: string;
  sources: Source[];
  tokenUsage?: TokenUsage | null;
  latencyMs?: number | null;
}

function renderTextWithCitations(text: string, onCitationClick: (citation: number) => void): ReactNode {
  return (
    <>
      {parseCitations(text, { onCitationClick })}
    </>
  );
}

export function AssistantMessage({
  content,
  sources,
  tokenUsage,
  latencyMs,
}: AssistantMessageProps) {
  const [sourcesOpen, setSourcesOpen] = useState(false);
  const [highlightedCitation, setHighlightedCitation] = useState<number | null>(null);

  const hasSources = sources.length > 0;

  const citationSet = useMemo(() => {
    return new Set(sources.map((source) => source.citation));
  }, [sources]);

  const handleCitationClick = (citation: number) => {
    if (!citationSet.has(citation)) {
      return;
    }

    setSourcesOpen(true);
    setHighlightedCitation(citation);
  };

  return (
    <Box sx={{ display: "flex", gap: 1.25, alignItems: "flex-start" }}>
      <Box
        sx={{
          width: 22,
          height: 22,
          borderRadius: "50%",
          bgcolor: "secondary.main",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          mt: 0.25,
        }}
      >
        <Bot size={13} />
      </Box>

      <Box sx={{ minWidth: 0, maxWidth: 760 }}>
        <Typography
          component="div"
          variant="body1"
          sx={{
            color: "text.primary",
            "& p": {
              my: 0,
            },
            "& p + p": {
              mt: 1.25,
            },
            "& ul, & ol": {
              my: 1,
              pl: 2.5,
            },
            "& code": {
              fontFamily: "mono.fontFamily",
              fontSize: 13,
              bgcolor: "surface.main",
              px: 0.5,
              borderRadius: 0.75,
            },
          }}
        >
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              p: ({ children }) => (
                <Box component="p">
                  {typeof children === "string" ? renderTextWithCitations(children, handleCitationClick) : children}
                </Box>
              ),
            }}
          >
            {content}
          </ReactMarkdown>
        </Typography>

        <MessageFooter tokenUsage={tokenUsage} latencyMs={latencyMs ?? null} />

        {
          hasSources &&
          <SourcesAccordion
            sources={sources}
            open={sourcesOpen}
            highlightedCitation={highlightedCitation}
            onToggle={setSourcesOpen}
          />
        }
      </Box>
    </Box>
  );
}
