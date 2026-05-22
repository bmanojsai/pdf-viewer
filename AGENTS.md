# AGENTS.md — AI Agent Guide

This file tells AI agents (Claude Code, Copilot, etc.) how this codebase is structured and what conventions to follow. Read it before making changes.

---

## Project Overview

**AI-Synced PDF Form Viewer** — a split-screen React app where selecting a form field in the right panel spotlights the corresponding region on the rendered PDF in the left panel. Form fields are either loaded from mock data or extracted live from the PDF using the Gemini AI API.

---

## Tech Stack

| Layer               | Library                             | Version     |
| ------------------- | ----------------------------------- | ----------- |
| UI Framework        | React                               | 19          |
| Language            | TypeScript                          | 6           |
| Build tool          | Vite                                | 8           |
| State               | Zustand                             | 5           |
| Animations          | Framer Motion                       | 12          |
| PDF Rendering       | @react-pdf-viewer/core + pdfjs-dist | 3.12 / 3.11 |
| Component library   | Shadcn UI (via @base-ui/react)      | —           |
| Styling             | Tailwind CSS v4                     | 4           |
| Schema / validation | Zod                                 | 4           |
| AI extraction       | @google/generative-ai (Gemini)      | 0.24        |
| Class merging       | clsx + tailwind-merge via `cn()`    | —           |

---

## Directory Structure

```
src/
├── components/
│   ├── ui/                  # Shadcn primitive components — do not edit directly
│   ├── DynamicFormField.tsx # Renders one form field (text/checkbox/select/number)
│   ├── FormFieldSkeleton.tsx# Shimmer skeleton shown while AI extraction runs
│   ├── FormPanel.tsx        # Right panel — field list, extraction button
│   ├── MobileTabBar.tsx     # Tab switcher shown on mobile/tablet only
│   ├── PDFPageOverlay.tsx   # Transparent overlay drawn on top of each PDF page
│   └── PDFViewerPanel.tsx   # Left panel — Worker + Viewer + overlay injection
├── hooks/
│   ├── useActiveField.ts    # Per-field active state + value update (reads Zustand)
│   └── useExtraction.ts     # Trigger function for Gemini extraction, exposes hasKey
├── lib/
│   ├── constants.ts         # All magic values (PDF_URL, GEMINI_MODEL, padding, etc.)
│   ├── env.ts               # Zod-validated import.meta.env; exports env + hasGeminiKey
│   └── utils.ts             # cn() helper only
├── services/
│   └── extractionService.ts # Fetches PDF → base64 → Gemini → validates with Zod
├── store/
│   └── useStore.ts          # Zustand store: fields, activeFieldId, extraction state
├── types/
│   └── index.ts             # Zod schemas + inferred TS types (FormField, PDFCoordinates…)
└── data/
    └── mockData.json        # Fallback fields shown when no API key is configured
```

---

## Key Architectural Rules

### 1. Single source of truth for magic values — `src/lib/constants.ts`

Never hardcode strings like the PDF path, worker URL, model name, or padding numbers inline. All of these live in `constants.ts`.

### 2. Design tokens only — never raw Tailwind color names

All `className` values must use semantic tokens: `bg-primary`, `text-muted-foreground`, `border-destructive`, etc. Never write `bg-blue-500`, `text-gray-400`, or similar.

### 3. Always use `cn()` for conditional classNames

```tsx
// correct
className={cn('base-class', isActive && 'active-class')}

// wrong
className={`base-class ${isActive ? 'active-class' : ''}`}
```

### 4. Zustand — granular selectors, never subscribe to the whole store

```ts
// correct
const fields = useAppStore((s) => s.fields);

// wrong
const { fields } = useAppStore(); // subscribes to every state change
```

Exception: `FormPanel` reads several fields at once and uses the full selector for brevity — acceptable in leaf components that already re-render on most state changes.

### 5. Hooks return stable references via `useCallback`

Every `useCallback` in a custom hook must list all its dependencies. The `useRenderPage` hook in `PDFViewerPanel` wraps its return in `useCallback([fields])` to avoid re-mounting the PDF viewer on every render.

### 6. DIP — components read from the store, not from `mockData.json`

`mockData.json` is only imported in `useStore.ts` as the initial state. Components must never import it directly.

### 7. One component per file, one concern per component

Sub-components like `TextFieldItem`, `CheckboxFieldItem`, `SelectFieldItem` live inside `DynamicFormField.tsx` because they are private implementation details. If a sub-component grows or is reused, move it to its own file.

---

## Highlight Overlay

`PDFPageOverlay` draws a padded bounding box over each active field using percentage coordinates returned by Gemini. The box is expanded before rendering via `expandCoordinates()`:

```ts
// src/lib/constants.ts
export const HIGHLIGHT_PADDING = { left: 22, right: 10, top: 4, bottom: 4 };
```

Padding is flat percentage units added to each side of the AI-returned box. Tune these values to adjust how generous the highlight feels without changing any component code.

---

## Environment

Copy `.env.example` to `.env` and fill in:

```
VITE_GEMINI_API_KEY=your_key_here
```

Get a free key at https://aistudio.google.com/apikey.

`src/lib/env.ts` validates the key with Zod at startup. If missing, the app falls back to `mockData.json` and the "Extract with AI" button is disabled.

---

## Running the Project

Requires **Node 20+** (use `nvm use 22` if needed).

```bash
npm install
npm run dev        # dev server at http://localhost:5173
npm run build      # type-check + production build
npm run typecheck  # tsc --noEmit only
npm run lint       # ESLint
npm run format     # Prettier
```

---

## What NOT to Do

- Do not add `console.log` without removing it before commit (Husky + lint-staged will catch it)
- Do not use `useEffect` for derived state — compute it inline or use a selector
- Do not add error handling for impossible states — trust Zod schema validation at the boundary
- Do not create a new component just to avoid a slightly long file — keep related private sub-components co-located
- Do not write multi-line comments explaining _what_ the code does — only add comments for non-obvious _why_
