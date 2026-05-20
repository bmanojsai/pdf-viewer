# Implementation Plan: AI-Synced PDF Form Tool

This plan outlines all the milestones required to build a React-based frontend tool that synchronizes a bank-style PDF document with a dynamically generated form.

## Goal Description

Build a "Wow Factor" application featuring a high-fidelity interaction where focusing on a form field highlights, zooms, or spotlights the corresponding area on the PDF.

## User Review Required

> [!IMPORTANT]
> Please review the comprehensive plan covering all milestones. Once approved, I will begin executing them sequentially.

## Proposed Changes

---

### Milestone 0: Project Rules & Design System

- **Rules**: Create `.Agent/rules.md` to establish React best practices, state management rules (Zustand), and scalable architecture.
- **Codebase Config**: Configure React codebase with ESLint, Prettier, TypeScript aliases, Vitest (tests), and Husky pre-commit hooks for scalable development.
- **Design Tokens**: Configure Tailwind CSS with a light-mode 70-20-10 color palette suitable for a PDF viewer, modern typography (e.g., Inter), and sleek border radii.

### Milestone 1: Visual Foundation & Static Layout

- **Setup**: Install `zustand`, `framer-motion`, `@react-pdf-viewer/core`, and `pdfjs-dist`. Initialize Shadcn UI.
- **Data Structure**: Create `mockData.json` representing form fields with `rect` percentage coordinates.
- **Layout**: Implement a 65/35 split-screen layout (PDF on the left, Form on the right).
- **Static Render**: Display `sample-form.pdf` and statically render Shadcn/UI inputs based on the mock data.

### Milestone 2: The Visual Sync Engine (Core Focus)

- **State**: Add `activeFieldId` to the Zustand store.
- **PDF Overlay Layer**: Implement a transparent `div` layer over the PDF canvas that dynamically scales percentage coordinates.
- **Spotlight Effect**:
  - Use `framer-motion` to render a highlight box over the PDF coordinates.
  - Apply a dark semi-transparent overlay using `mask-image` or `clip-path` to create a spotlight cut-out over the active field.
- **Smooth Scroll**: Implement `scrollIntoView` so the PDF panel smoothly centers on the highlighted field.

### Milestone 3: Interaction Polish & UX

- **Two-Way Sync**: Allow clicking a highlight box on the PDF to focus the corresponding input field in the Right Panel.
- **Animations**: Add entry/exit animations for form fields and a "pulse" effect for the active PDF highlight.
- **Component Polish**: Fully integrate standard Shadcn UI components for all field types (e.g., Input, Checkbox, Select).

### Milestone 4: AI Extraction & Dynamic JSON

- **Service Logic**: Create a service module to simulate (or connect to) an AI endpoint that extracts fields from the PDF.
- **Schema Mapping**: Transform raw AI output into the internal `mockData` JSON schema.
- **Dynamic Updates**: Ensure the form updates smoothly when a new "AI Scan" result is received and populated into the store.

### Milestone 5: File Handling & Final Polish

- **Upload**: Integrate `react-dropzone` to allow users to upload custom PDF documents.
- **Validation**: Integrate `zod` schema validation for the dynamically generated form.
- **Error Sync**: If a field fails validation, display a red glowing highlight on the corresponding PDF coordinate in addition to the input error.

---

## Verification Plan

After each milestone, we will manually verify the functionality. Specifically, after Milestone 2, we will ensure that clicking a form field correctly triggers the spotlight overlay and scrolls the PDF to the designated location.
