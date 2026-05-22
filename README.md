# AI-Synced PDF Form Viewer

A split-screen React application that renders a PDF on the left and its extracted form fields on the right. Selecting any form field spotlights the corresponding region on the PDF with an animated highlight. Fields can be populated from static mock data or extracted live from the document using the Google Gemini AI API.

---

## Features

- **Split-screen layout** — 65/35 PDF viewer + form panel, fully responsive with a mobile tab switcher
- **Live field highlight** — clicking a form field animates a spotlight overlay on the exact region of the PDF page
- **Smooth transitions** — Framer Motion `layoutId` spotlight glides between fields; pulse ring animation draws attention to the active region
- **AI extraction** — "Extract with AI" button sends the PDF to Gemini 2.5 Flash and replaces mock fields with real extracted data
- **Graceful fallback** — if no API key is configured the app loads instantly with mock data; the extraction button is disabled with a tooltip
- **Skeleton loader** — shimmer placeholders match the expected field layout while extraction runs
- **Error banner** — AI failures surface a non-blocking banner while falling back to mock data

---

## Tech Stack

| Concern                     | Library                                         |
| --------------------------- | ----------------------------------------------- |
| Framework                   | React 19 + TypeScript 6                         |
| Build                       | Vite 8                                          |
| State management            | Zustand 5                                       |
| Animations                  | Framer Motion 12                                |
| PDF rendering               | @react-pdf-viewer/core 3.12 + pdfjs-dist 3.11   |
| UI components               | Shadcn UI (@base-ui/react)                      |
| Styling                     | Tailwind CSS v4                                 |
| Schema / runtime validation | Zod 4                                           |
| AI                          | Google Gemini 2.5 Flash (@google/generative-ai) |
| Linting / formatting        | ESLint + Prettier + Husky + lint-staged         |

---

## Getting Started

### Prerequisites

- Node.js **20 or higher** (`nvm use 22` recommended)
- A free Google Gemini API key — [get one here](https://aistudio.google.com/apikey)

### Setup

```bash
# 1. Install dependencies
npm install

# 2. Configure environment
cp .env.example .env
# Open .env and set VITE_GEMINI_API_KEY=your_key_here

# 3. Start the dev server
npm run dev
```

The app runs at `http://localhost:5173`.

### Without an API key

The app works without a key — it loads `src/data/mockData.json` as the default field set. The "Extract with AI" button will be disabled.

---

## Available Scripts

| Script              | Description                        |
| ------------------- | ---------------------------------- |
| `npm run dev`       | Start Vite dev server with HMR     |
| `npm run build`     | Type-check + production build      |
| `npm run preview`   | Serve the production build locally |
| `npm run typecheck` | Run `tsc --noEmit` only            |
| `npm run lint`      | Run ESLint                         |
| `npm run lint:fix`  | Run ESLint with auto-fix           |
| `npm run format`    | Run Prettier across the project    |
| `npm run test`      | Run Vitest (passes with no tests)  |

---

## Project Structure

```
src/
├── components/
│   ├── ui/                   # Shadcn primitive components
│   ├── DynamicFormField.tsx  # Renders one field (text / checkbox / select / number)
│   ├── FormFieldSkeleton.tsx # Shimmer skeleton during AI extraction
│   ├── FormPanel.tsx         # Right panel — field list + extraction button
│   ├── MobileTabBar.tsx      # Tab switcher on mobile/tablet
│   ├── PDFPageOverlay.tsx    # Per-page highlight overlay drawn on the PDF canvas
│   └── PDFViewerPanel.tsx    # Left panel — PDF Worker + Viewer + overlay injection
├── hooks/
│   ├── useActiveField.ts     # Active state + value update for a single field
│   └── useExtraction.ts      # Gemini extraction trigger + hasKey flag
├── lib/
│   ├── constants.ts          # PDF_URL, GEMINI_MODEL, HIGHLIGHT_PADDING, worker URL
│   ├── env.ts                # Zod-validated env vars; exports env + hasGeminiKey
│   └── utils.ts              # cn() helper (clsx + tailwind-merge)
├── services/
│   └── extractionService.ts  # PDF → base64 → Gemini API → Zod-validated result
├── store/
│   └── useStore.ts           # Zustand store (fields, activeFieldId, extraction state)
├── types/
│   └── index.ts              # Zod schemas + inferred TypeScript types
└── data/
    └── mockData.json         # Default fields used when no API key is present
```

---

## How the Highlight Works

Each form field carries `pdfCoordinates` — percentage-based `{ left, top, width, height, pageIndex }` values returned by Gemini. When a field becomes active, `PDFPageOverlay` renders two overlapping Framer Motion elements on top of the PDF canvas:

1. **Spotlight** — a semi-transparent filled box with a `layoutId` so it glides smoothly between fields
2. **Pulse ring** — an infinitely repeating border that scales out and fades, drawing the eye to the active region

Before rendering, each bounding box is expanded by a configurable flat padding (in `src/lib/constants.ts`) to compensate for minor AI coordinate inaccuracies:

```ts
export const HIGHLIGHT_PADDING = { left: 22, right: 10, top: 4, bottom: 4 };
```

---

## Environment Variables

| Variable              | Required | Description                                                                            |
| --------------------- | -------- | -------------------------------------------------------------------------------------- |
| `VITE_GEMINI_API_KEY` | No       | Google Gemini API key for PDF field extraction. App falls back to mock data if absent. |

Copy `.env.example` to `.env` to get started.

---

## Architecture Notes

- **State** — Zustand with granular selectors (`s => s.field`) to prevent unnecessary re-renders
- **Validation** — Zod schemas in `src/types/index.ts` serve as both the TypeScript type source and the runtime validator for AI responses
- **Design tokens** — all classNames use semantic Tailwind tokens (`bg-primary`, `text-muted-foreground`, etc.), never raw color values
- **DIP** — `mockData.json` is only imported in the store initializer; all components read from the store
- **Memoization** — the PDF `renderPage` callback is wrapped in `useCallback` to prevent the viewer from re-mounting on unrelated state changes
