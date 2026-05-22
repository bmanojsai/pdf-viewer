- `[x]` Milestone 0: Project Rules & Design System
  - `[x]` Create `.Agent/rules.md` to define React best practices and scalable architecture.
  - `[x]` Configure React codebase with ESLint, Prettier, TypeScript aliases, Vitest, and Husky hooks.
  - `[x]` Configure Tailwind CSS and Shadcn with a Light Mode 70-20-10 color palette.

- `[x]` Milestone 1: Visual Foundation & Static Layout
  - `[x]` Install `zustand`, `framer-motion`, `@react-pdf-viewer/core`, `pdfjs-dist`, etc.
  - `[x]` Initialize Shadcn UI and add basic components (Input, Label, etc.).
  - `[x]` Create `src/types/index.ts` for type definitions.
  - `[x]` Create `src/data/mockData.json` with sample form field coordinates.
  - `[x]` Implement the 65/35 split-screen layout in `src/App.tsx`.
  - `[x]` Create `src/components/PDFViewerPanel.tsx`.
  - `[x]` Create `src/components/FormPanel.tsx`.

- `[x]` Milestone 2: The Visual Sync Engine
  - `[x]` Configure Zustand store with `activeFieldId`.
  - `[x]` Implement a transparent overlay `div` on top of the PDF canvas.
  - `[x]` Implement Framer Motion spotlight highlight based on the active field's `rect` percentages.
  - `[x]` Implement `scrollIntoView` for smooth scrolling the PDF to the highlighted element.

- `[ ]` Milestone 3: Interaction Polish & UX
  - `[ ]` Implement two-way sync: Clicking the PDF highlight focuses the form input. _(deferred)_
  - `[x]` Add entry/exit animations for form fields (stagger on mount via `fieldItemVariants` + `staggerChildren` in `FormPanel`).
  - `[x]` Add pulse effect for the active PDF highlight (expanding ring `motion.div` alongside the spotlight in `PDFPageOverlay`).
  - `[x]` Polish Shadcn UI components for all field types (disabled/read-only display with active-state highlight styling).

- `[x]` Milestone 4: AI Extraction & Dynamic JSON
  - `[x]` Install `zod` and `@google/generative-ai`; set up `.env` with `VITE_GEMINI_API_KEY` (gitignored).
  - `[x]` Validate env vars at startup with Zod (`src/lib/env.ts`); warns and falls back to mock data if key is absent.
  - `[x]` Convert `src/types/index.ts` to Zod-derived schemas (`FormFieldSchema`, `PDFCoordinatesSchema`, etc.) so types and runtime validation share one source of truth.
  - `[x]` Create `src/services/extractionService.ts` — fetches PDF as base64, calls `gemini-2.0-flash` with structured output schema, validates AI response with Zod before returning.
  - `[x]` Create `src/hooks/useExtraction.ts` — fires on mount, sets `isExtracting`, calls the service, writes result to the store; falls back gracefully on error.
  - `[x]` Extend Zustand store with `isExtracting`, `extractionError`, `setFields`, `setExtracting`, `setExtractionError`; starts `isExtracting: true` when key is present to avoid flash of mock data.
  - `[x]` Create `src/components/FormFieldSkeleton.tsx` — shimmer skeleton matching the expected field layout.
  - `[x]` Update `FormPanel` to show skeleton while extracting and an error banner (with mock-data fallback) on failure.

- `[ ]` Milestone 5: File Handling & Final Polish
  - `[ ]` Install and integrate `react-dropzone` for custom PDF uploads.
  - `[ ]` Integrate `zod` for dynamic form validation (schemas already in place from M4).
  - `[ ]` Implement validation UI sync (red highlight/glow for invalid fields).
