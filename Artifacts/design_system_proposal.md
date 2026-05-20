# Design System Specification: SyncForm Pro

## 1. Color Palette (Dual-Theme)

We use a semantic system where colors are mapped to their function.

- **Primary (Indigo)**: Professional, trustworthy.
- **Accent (Amber)**: Used specifically for the "Spotlight" and "Highlight" sync features to stand out against the blue-ish bank forms.

| Token        | Light Mode (Hex)       | Dark Mode (Hex)        | Usage                    |
| :----------- | :--------------------- | :--------------------- | :----------------------- |
| `background` | `#F8FAFC` (Slate 50)   | `#020617` (Slate 950)  | Main App Background      |
| `foreground` | `#0F172A`              | `#F8FAFC`              | Main Text                |
| `card`       | `#FFFFFF`              | `#0F172A`              | Right Panel / Form Cards |
| `primary`    | `#4F46E5` (Indigo 600) | `#6366F1` (Indigo 500) | Buttons, Active States   |
| `accent`     | `#F59E0B` (Amber 500)  | `#FBBF24` (Amber 400)  | PDF Highlight Boxes      |
| `muted`      | `#64748B`              | `#94A3B8`              | Subtitles, Placeholders  |
| `border`     | `#E2E8F0`              | `#1E293B`              | Panel Dividers, Inputs   |

## 2. Typography

- **Sans Stack**: `Inter`, system-ui, sans-serif (Clean, legible for small form labels).
- **Mono Stack**: `JetBrains Mono`, monospace (For ID tracking and coordinate debugging).

**Scales**:

- `text-xs`: 12px (Field Helper Text)
- `text-sm`: 14px (Form Labels, Input Text) — Default
- `text-base`: 16px (Headers)
- `text-lg`: 18px (Panel Titles)

## 3. Spacing & Radius

- **Base Unit**: 4px
- **Gaps**: Use `gap-4` (16px) for form fields and `p-6` (24px) for panel padding.
- **Radius**:
  - `radius-sm`: 4px (Checkboxes)
  - `radius-md`: 8px (Input fields, Buttons)
  - `radius-lg`: 12px (Form Containers)

## 4. Elevation & Shadows

- **Form Shadow**: `0 4px 6px -1px rgb(0 0 0 / 0.1)` (Subtle depth for the right panel).
- **Highlight Glow**: `0 0 15px 2px var(--accent)` (Used when a PDF field is focused).

## 5. Z-Index Layers

- `z-0`: PDF Canvas
- `z-10`: PDF Text Layer (Selection)
- `z-20`: Highlight Overlay Layer
- `z-30`: Sticky Form Headers
- `z-50`: Modals / Upload Overlays

## 6. Motion (Framer Motion Tokens)

**Duration**:

- `fast`: 0.2s (Hover states)
- `normal`: 0.3s (Panel sliding)
- `slow`: 0.5s (PDF Zoom/Scroll)

**Easing**: `[0.4, 0, 0.2, 1]` (Standard ease-in-out for professional feel).

## 7. Global Focus State

- **Focus Ring**: `2px solid var(--primary)` with an `offset-2`.
- **Sync State**: When Input is focused, the corresponding PDFHighlight box must trigger a `scale: 1.05` and `opacity: 1` animation.
