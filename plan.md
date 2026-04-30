# Contextual QA — Frontend Plan

React + Vite + TypeScript SPA frontend for the [`contextual-qa-engine`](https://github.com/milosandrejic/contextual-qa-engine) FastAPI backend. Single rolling chat with a documents panel, MUI components on a custom theme matching the spec palette (light only, Stripe / Linear / Raycast aesthetic).

---

## Decisions

| Topic | Decision |
|---|---|
| Package manager | npm |
| Versions | always latest stable |
| API base URL | `VITE_API_BASE_URL` env only (default `http://localhost:8000`) |
| Session persistence | `session_id` persisted in `localStorage`, rehydrated on reload |
| Distance label | `Distance: 0.42` (`toFixed(2)`) |
| Settings modal | only default `top_k` (2 / 3 / 5) |
| UI library | MUI (latest) + Emotion |
| File naming | kebab-case, named exports only |
| Imports | `@/` alias → `src/` |

---

## Backend API (verified from repo)

| Method | Path | Purpose |
|---|---|---|
| `POST` | `/upload` | multipart upload → `Document` |
| `GET` | `/documents` | list documents |
| `GET` | `/documents/{id}` | one document |
| `DELETE` | `/documents/{id}` | delete |
| `POST` | `/sessions` | create → `{ id, created_at }` |
| `GET` | `/sessions/{id}/history` | full history with messages, sources, usage |
| `DELETE` | `/sessions/{id}` | delete session |
| `POST` | `/ask` | `{ question, top_k, session_id? }` → `{ answer, sources[], usage, latency_ms, session_id }` |
| `GET` | `/health` | healthcheck |

`sources[]` shape: `{ citation, text, source, page, chunk_index, distance }` — **distance** (lower is better).

---

## Tech stack (latest stable)

- React + Vite + TypeScript
- MUI (`@mui/material`, `@mui/icons-material`, `@emotion/react`, `@emotion/styled`)
- TanStack Query — server state
- React Context + `localStorage` — `sessionId`, `defaultTopK`, panel toggle (no global state lib)
- `react-markdown` + `remark-gfm` — assistant rendering
- `react-dropzone` — uploads
- `sonner` — toasts
- `lucide-react` — accent icons (citation, send)
- `@fontsource/inter`, `@fontsource/jetbrains-mono`
- Vitest + Testing Library — smoke tests
- ESLint config already provided

---

## Phases

### Phase 1 — Scaffold
- [x] `npm create vite@latest . -- --template react-ts`
- [x] Install runtime + dev deps
- [x] Configure `vite.config.ts` alias `@` → `/src`; mirror in `tsconfig.json` `paths`
- [x] Add `.env.example` with `VITE_API_BASE_URL=http://localhost:8000`
- [x] Add scripts: `dev`, `build`, `preview`, `lint`, `typecheck`, `test`
- [x] Create MUI theme (`src/theme/index.ts`) — palette from `frontend.md`, Inter + JetBrains Mono, 10–14px radii, soft shadow, primary glow
- [x] `main.tsx`: `ThemeProvider` + `CssBaseline` + `QueryClientProvider` + `<Toaster />` + `<App />`
- [x] ESLint passes on empty scaffold

### Phase 2 — API + state layer
- [x] `src/api/client.ts` — fetch wrapper, env base URL, JSON + multipart helpers, error normalization
- [x] `src/api/documents.ts`, `src/api/sessions.ts`, `src/api/ask.ts`
- [x] `src/types/*.ts` — `Document`, `Message`, `Source`, `SessionHistory`, `AskResponse`
- [x] `src/context/session-context.tsx` — `sessionId`, `defaultTopK`, persisted to `localStorage`
- [x] Hooks: `use-documents`, `use-upload-document`, `use-delete-document`, `use-session-history` (404 → clear context), `use-ask` (lazy-create session, optimistic user msg, invalidate history)

### Phase 3 — Layout shell
- [x] `src/components/layout/app-shell.tsx` — responsive two-column
- [x] `src/components/layout/top-bar.tsx` — title/logo (gradient text), New chat, panel toggle, settings icon
- [x] `src/components/layout/documents-panel.tsx` — sidebar (desktop) / `Drawer` (tablet) / full-screen `Dialog` (mobile)

### Phase 4 — Documents panel
- [x] `src/components/docs/dropzone.tsx` — idle / hover / uploading / error
- [x] `src/components/docs/upload-progress.tsx` — filename + spinner
- [x] `src/components/docs/document-card.tsx` — filename, size, pages, indexed-at, chunk count, view-details, delete with confirm
- [x] `src/components/docs/document-details-dialog.tsx` — read-only metadata view
- [x] Empty state copy

### Phase 5 — Chat view
- [x] `src/components/chat/message-list.tsx` — auto-scroll on new message unless user scrolled up
- [x] `src/components/chat/user-message.tsx`
- [x] `src/components/chat/assistant-message.tsx` — markdown render with citation override
- [x] `src/components/chat/citation-badge.tsx` — emerald rounded badge, mono font, click → expand sources + scroll + flash highlight
- [x] `src/components/chat/sources-accordion.tsx` — collapsed "Sources (n)" → list
- [x] `src/components/chat/source-chunk-card.tsx` — filename, page, **`Distance: 0.42`**, preview
- [x] `src/components/chat/message-footer.tsx` — `tokens • latency_ms ms`
- [x] `src/components/chat/typing-indicator.tsx` — 3 bouncing dots
- [x] `src/components/chat/chat-input.tsx` — auto-grow textarea (max 6 lines), send, Cmd/Ctrl+Enter, char count, `top_k` 2/3/5
- [x] `src/utils/parse-citations.tsx` — react-markdown text-node override, replaces `[n]` with `<CitationBadge />`
- [x] `src/utils/format-distance.ts`, `format-bytes.ts`, `format-relative-time.ts`

### Phase 6 — Empty / loading / error states
- [x] No-documents empty state — gradient illustration (CSS) + upload CTA
- [x] New-chat empty state — 3–4 generic suggested questions, click fills input
- [x] Skeletons while history hydrates
- [x] Failed upload toast with retry
- [x] Failed ask → error bubble with retry button
- [x] 409 duplicate filename → friendly toast

### Phase 7 — Settings + responsive + polish
- [x] `src/components/settings/settings-modal.tsx` — only default `top_k`
- [x] Tablet (768–1279px) — panel as `Drawer` toggled from top bar
- [x] Mobile (<768px) — panel as full-screen `Drawer`
- [x] "New chat" → best-effort `DELETE /sessions/{id}`, clear store, reset UI

### Phase 8 — Tests + README
- [ ] Vitest setup
- [ ] Tests: `format-distance`, `parse-citations` (turns `[1]` into badge node)
- [ ] Update `README.md` — setup, env, scripts, screenshots reference

---

## Key files (to be created)

- [vite.config.ts](vite.config.ts)
- [tsconfig.json](tsconfig.json)
- [.env.example](.env.example)
- [src/theme/index.ts](src/theme/index.ts)
- [src/api/client.ts](src/api/client.ts)
- [src/context/session-context.tsx](src/context/session-context.tsx)
- [src/components/layout/app-shell.tsx](src/components/layout/app-shell.tsx)
- [src/components/layout/top-bar.tsx](src/components/layout/top-bar.tsx)
- [src/components/layout/documents-panel.tsx](src/components/layout/documents-panel.tsx)
- [src/components/chat/chat-input.tsx](src/components/chat/chat-input.tsx)
- [src/components/chat/assistant-message.tsx](src/components/chat/assistant-message.tsx)
- [src/components/chat/citation-badge.tsx](src/components/chat/citation-badge.tsx)
- [src/components/chat/source-chunk-card.tsx](src/components/chat/source-chunk-card.tsx)
- [src/components/docs/dropzone.tsx](src/components/docs/dropzone.tsx)
- [src/components/docs/document-card.tsx](src/components/docs/document-card.tsx)
- [src/utils/parse-citations.tsx](src/utils/parse-citations.tsx)
- [src/utils/format-distance.ts](src/utils/format-distance.ts)

---

## Verification

1. `npm run dev` — app boots at `http://localhost:5173`, `/health` reachable.
2. `npm run lint` and `npm run typecheck` — clean.
3. Upload PDF → appears in panel with full metadata.
4. Ask question → markdown answer renders, `[1]` badges clickable, sources accordion expands, label shows `Distance: 0.42`.
5. Reload page → `sessionId` restored from `localStorage`, history rehydrates; on 404, store cleared and fresh chat.
6. "New chat" → conversation cleared, backend session deleted (best-effort).
7. Tablet (≤1279px) → panel toggleable; mobile (<768px) → panel as full-screen dialog.
8. Backend duplicate-filename (409) → toast shown.

---

## Out of scope

- Past conversations / thread list (spec: single rolling chat)
- Auth
- Streaming responses (backend is non-streaming)
- `/search` debug endpoint UI
- Dark theme
