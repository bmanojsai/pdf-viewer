- `[x]` Milestone 0: Project Rules & Design System
  - `[x]` Create `.Agent/rules.md` to define React best practices and scalable architecture.
  - `[x]` Configure React codebase with ESLint, Prettier, TypeScript aliases, Vitest, and Husky hooks.
  - `[x]` Configure Tailwind CSS and Shadcn with a Light Mode 70-20-10 color palette.

- `[ ]` Milestone 1: Visual Foundation & Static Layout
  - `[ ]` Install `zustand`, `framer-motion`, `@react-pdf-viewer/core`, `pdfjs-dist`, etc.
  - `[ ]` Initialize Shadcn UI and add basic components (Input, Label, etc.).
  - `[ ]` Create `src/types/index.ts` for type definitions.
  - `[ ]` Create `src/data/mockData.json` with sample form field coordinates.
  - `[ ]` Implement the 65/35 split-screen layout in `src/App.tsx`.
  - `[ ]` Create `src/components/PDFViewerPanel.tsx`.
  - `[ ]` Create `src/components/FormPanel.tsx`.

- `[ ]` Milestone 2: The Visual Sync Engine
  - `[ ]` Configure Zustand store with `activeFieldId`.
  - `[ ]` Implement a transparent overlay `div` on top of the PDF canvas.
  - `[ ]` Implement Framer Motion spotlight highlight based on the active field's `rect` percentages.
  - `[ ]` Implement `scrollIntoView` for smooth scrolling the PDF to the highlighted element.

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
