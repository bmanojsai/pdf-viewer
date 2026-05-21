- `[x]` Milestone 0: Project Rules & Design System
  - `[x]` Create `.Agent/rules.md` to define React best practices and scalable architecture.
  - `[x]` Configure React codebase with ESLint, Prettier, TypeScript aliases, Vitest, and Husky hooks.
  - `[x]` Configure Tailwind CSS and Shadcn with a Light Mode 70-20-10 color palette.

- `[ ]` Milestone 1: Visual Foundation & Static Layout
  - `[x]` Install `zustand`, `framer-motion`, `@react-pdf-viewer/core`, `pdfjs-dist`, etc.
  - `[x]` Initialize Shadcn UI and add basic components (Input, Label, etc.).
  - `[x]` Create `src/types/index.ts` for type definitions.
  - `[x]` Create `src/data/mockData.json` with sample form field coordinates.
  - `[x]` Implement the 65/35 split-screen layout in `src/App.tsx`.
  - `[x]` Create `src/components/PDFViewerPanel.tsx`.
  - `[x]` Create `src/components/FormPanel.tsx`.

- `[ ]` Milestone 2: The Visual Sync Engine
  - `[x]` Configure Zustand store with `activeFieldId`.
  - `[x]` Implement a transparent overlay `div` on top of the PDF canvas.
  - `[x]` Implement Framer Motion spotlight highlight based on the active field's `rect` percentages.
  - `[x]` Implement `scrollIntoView` for smooth scrolling the PDF to the highlighted element.

- `[ ]` Milestone 3: Interaction Polish & UX
  - `[ ]` Implement two-way sync: Clicking the PDF highlight focuses the form input.
  - `[ ]` Add entry/exit animations for form fields.
  - `[ ]` Add pulse effect for the active PDF highlight.
  - `[ ]` Polish Shadcn UI components for all field types.

- `[ ]` Milestone 4: AI Extraction & Dynamic JSON
  - `[ ]` Create AI mock service module for document scanning.
  - `[ ]` Implement logic to parse AI output into internal `mockData` format.
  - `[ ]` Connect dynamic updates to the Zustand store to instantly re-render the form.

- `[ ]` Milestone 5: File Handling & Final Polish
  - `[ ]` Install and integrate `react-dropzone` for custom PDF uploads.
  - `[ ]` Install and integrate `zod` for dynamic form validation.
  - `[ ]` Implement validation UI sync (red highlight/glow for invalid fields).
