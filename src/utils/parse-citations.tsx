import type { ReactNode } from "react";

import { Fragment } from "react";

import { CitationBadge } from "@/components/chat/citation-badge";

const CITATION_PATTERN = /\[(\d+)\]/g;

interface ParseCitationsOptions {
  onCitationClick?: (citation: number) => void;
}

export function parseCitations(text: string, options?: ParseCitationsOptions): ReactNode[] {
  const nodes: ReactNode[] = [];
  let lastIndex = 0;

  for (const match of text.matchAll(CITATION_PATTERN)) {
    const fullMatch = match[0];
    const citationValue = match[1];
    const matchIndex = match.index ?? 0;

    if (matchIndex > lastIndex) {
      nodes.push(
        <Fragment key={`text-${lastIndex}`}>
          {text.slice(lastIndex, matchIndex)}
        </Fragment>,
      );
    }

    nodes.push(
      <CitationBadge
        key={`${citationValue}-${matchIndex}`}
        citation={Number(citationValue)}
        onClick={options?.onCitationClick}
      />,
    );

    lastIndex = matchIndex + fullMatch.length;
  }

  if (lastIndex < text.length) {
    nodes.push(
      <Fragment key={`text-${lastIndex}`}>
        {text.slice(lastIndex)}
      </Fragment>,
    );
  }

  if (nodes.length === 0) {
    return [<Fragment key="text-0">{text}</Fragment>];
  }

  return nodes;
}
