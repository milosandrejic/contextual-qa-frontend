import type { ReactNode } from "react";

import { Fragment } from "react";

import { CitationBadge } from "@/components/chat/citation-badge";

const CITATION_PATTERN = /(\[(\d+)\])/g;

interface ParseCitationsOptions {
  onCitationClick?: (citation: number) => void;
}

export function parseCitations(text: string, options?: ParseCitationsOptions): ReactNode[] {
  const parts = text.split(CITATION_PATTERN);

  return parts.map((part, index) => {
    if (/^\[\d+\]$/.test(part)) {
      const citation = Number(part.slice(1, -1));

      return (
        <CitationBadge
          key={`${citation}-${index}`}
          citation={citation}
          onClick={options?.onCitationClick}
        />
      );
    }

    return <Fragment key={`text-${index}`}>{part}</Fragment>;
  });
}
