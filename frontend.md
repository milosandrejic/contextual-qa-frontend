Design a web app frontend for a document Q&A system called **Contextual QA**. Very modern, bright, vibrant aesthetic — think Stripe / Linear / Raycast with a playful color accent. Light theme only.

## App purpose

Users upload documents (PDF, TXT), then ask questions about them in a chat interface. The AI answers with inline numbered citations (`[1]`, `[2]`) that reference source chunks from the documents. Single active conversation (no past-conversations / thread list — the app keeps one rolling chat with history).

## Layout

Two-column layout, desktop-first, responsive down to tablet:

1. **Main area (flex)** — Chat view
   - Top bar: app title/logo on the left, "New chat" button on the right (clears current conversation)
   - Scrollable message list:
     - User messages: right-aligned, subtle background, plain text
     - Assistant messages: left-aligned, markdown-rendered, with inline citations `[1]` as clickable superscript badges
     - Below each assistant message: collapsed "Sources (3)" section expanding to show cited chunks with: source filename, page number, similarity score, chunk preview
     - Token usage + latency shown as small muted footer under assistant messages
   - Empty state: friendly illustration + suggested questions
   - Sticky input at bottom:
     - Multi-line textarea (auto-grow, max ~6 lines)
     - Send button (or Cmd/Ctrl+Enter)
     - Small `top_k` selector (2 / 3 / 5) tucked in corner
     - Character count

2. **Right panel (320px, toggleable)** — Documents
   - "Upload documents" dropzone at top (drag-drop + click to browse, accepts PDF/TXT)
   - Upload progress with filename + spinner
   - List of indexed documents: filename, size, page count, indexed-at, chunk count
   - Per-document actions: view details, delete
   - Empty state: "No documents yet. Upload something to get started."

## Key screens / states

1. Empty state (no documents) — prominent call to action: upload first document
2. Document uploaded, no chat yet — suggested questions to get started
3. Active conversation — full two-column view in use
4. Citation hover/click — clicking `[1]` scrolls to and highlights the source chunk in the sources panel
5. Loading states — skeleton loaders for message list, typing indicator (3 bouncing dots) while LLM responds
6. Error states — failed upload (corrupt file), failed question (API error), with retry action

## Design details

- **Typography**: Inter (body + UI), JetBrains Mono (citations, code, metadata)
- **Color palette** (light theme only):

  | Swatch | Role | Hex | Usage |
  |---|---|---|---|
  | ![#6366F1](https://readme-swatches.vercel.app/6366F1?style=round) | Primary | `#6366F1` | Buttons, active states, links, primary CTAs |
  | ![#4F46E5](https://readme-swatches.vercel.app/4F46E5?style=round) | Primary hover | `#4F46E5` | Button hover / pressed |
  | ![#10B981](https://readme-swatches.vercel.app/10B981?style=round) | Secondary | `#10B981` | Citation badges, success states |
  | ![#EF4444](https://readme-swatches.vercel.app/EF4444?style=round) | Error | `#EF4444` | Errors, destructive actions |
  | ![#FFFFFF](https://readme-swatches.vercel.app/FFFFFF?style=round) | Background | `#FFFFFF` | Main canvas |
  | ![#F9FAFB](https://readme-swatches.vercel.app/F9FAFB?style=round) | Surface | `#F9FAFB` | Sidebars, cards, user message bubbles |
  | ![#E5E7EB](https://readme-swatches.vercel.app/E5E7EB?style=round) | Border | `#E5E7EB` | Dividers, card borders |
  | ![#111827](https://readme-swatches.vercel.app/111827?style=round) | Text primary | `#111827` | Body text |
  | ![#6B7280](https://readme-swatches.vercel.app/6B7280?style=round) | Text secondary | `#6B7280` | Metadata, muted labels |
- **Gradients allowed**: subtle primary → secondary gradient for hero CTA / empty-state illustrations only
- **Borders**: 1px `#E5E7EB`, rounded corners 10–14px
- **Shadows**: soft, low-elevation (`0 1px 3px rgba(0,0,0,0.04)`); primary buttons get a subtle colored glow
- **Spacing**: airy, generous padding, body line-height 1.6
- **Citations**: emerald badge `[1]` — rounded rect, small monospace, clickable
- **Icons**: Lucide

## Components to design

- Message bubble (user + assistant variants)
- Inline citation badge
- Source chunk card (collapsed + expanded)
- Document card
- Upload dropzone (idle, hover, uploading, error)
- Input box with send button
- Top bar (app title + New chat button)
- Typing indicator
- Empty states (2 variants: no documents, new chat)
- Toast notifications (success, error)
- Settings modal (API endpoint, top_k default)

## Responsive behavior

- Desktop (≥1280px): both columns visible
- Tablet (768–1279px): documents panel hidden behind toggle button
- Mobile (<768px): single-column chat, documents as full-screen modal

## Frames to generate

1. Desktop — active conversation with 4–5 messages, citations visible, sources expanded under one message
2. Desktop — empty state (first visit)
3. Desktop — document upload in progress
4. Mobile — chat view
5. Settings modal

---

Tone: professional developer tool, not consumer chatbot. Prioritize information density and clarity over flashy visuals.
