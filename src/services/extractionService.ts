import { GoogleGenerativeAI, SchemaType, type Schema } from '@google/generative-ai';
import { z } from 'zod';
import { env } from '@/lib/env';
import { GEMINI_MODEL } from '@/lib/constants';
import { FormFieldSchema } from '@/types';
import type { FormField } from '@/types';

// ── Zod schema to validate the full AI response ───────────────────────────────

const AIResponseSchema = z.object({
  title: z.string(),
  fields: z.array(FormFieldSchema),
});

export interface ExtractionResult {
  title: string;
  fields: FormField[];
}

// ── Gemini structured-output schema ──────────────────────────────────────────
// Mirrors FormField so Gemini returns valid JSON directly.

const geminiResponseSchema: Schema = {
  type: SchemaType.OBJECT,
  properties: {
    title: { type: SchemaType.STRING },
    fields: {
      type: SchemaType.ARRAY,
      items: {
        type: SchemaType.OBJECT,
        properties: {
          id: { type: SchemaType.STRING },
          type: {
            type: SchemaType.STRING,
            format: 'enum',
            enum: ['text', 'number', 'checkbox', 'select'],
          },
          label: { type: SchemaType.STRING },
          value: { type: SchemaType.STRING },
          options: { type: SchemaType.ARRAY, items: { type: SchemaType.STRING } },
          pdfCoordinates: {
            type: SchemaType.OBJECT,
            properties: {
              pageIndex: { type: SchemaType.INTEGER },
              left: { type: SchemaType.NUMBER },
              top: { type: SchemaType.NUMBER },
              width: { type: SchemaType.NUMBER },
              height: { type: SchemaType.NUMBER },
            },
            required: ['pageIndex', 'left', 'top', 'width', 'height'],
          },
        },
        required: ['id', 'type', 'label', 'value', 'pdfCoordinates'],
      },
    },
  },
  required: ['title', 'fields'],
};

// ── Extraction prompt ─────────────────────────────────────────────────────────

const EXTRACTION_PROMPT = `
You are extracting form fields from a PDF to power a real-time highlight overlay in a UI.
The coordinates you return will be drawn directly on top of the rendered PDF page, so
spatial accuracy is critical.

═══ COORDINATE SYSTEM ═══
• Origin (0, 0) is the TOP-LEFT corner of the page.
• left   — horizontal % from the LEFT edge of the page to the LEFT edge of the fillable area
• top    — vertical % from the TOP edge of the page to the TOP edge of the fillable area
• width  — width of the fillable area as % of the total page width
• height — height of the fillable area as % of the total page height
• All values are in the range 0–100.

═══ WHAT TO MEASURE ═══
• Text / number fields : measure the underline, dashed line, or box where the user writes.
  Do NOT include the label text in the bounding box.
• Checkboxes           : measure the checkbox square or circle only.
• Select / dropdowns   : measure the dropdown control box only.
• Ignore decorative page borders, section lines, and label text when computing coordinates.

═══ HOW TO ESTIMATE COORDINATES ═══
1. Visually divide the page into a 100×100 percentage grid.
2. Identify where each fillable area starts and ends on that grid.
3. Double-check: left + width should not exceed 100; top + height should not exceed 100.
4. For multi-page documents, set pageIndex to the 0-based page number of each field.

═══ FIELD TYPES ═══
• "text"     — single-line text (names, addresses, dates as strings)
• "number"   — numeric input (account numbers, phone numbers, amounts)
• "checkbox" — a tickable yes/no box
• "select"   — a dropdown with predefined choices (include the options array)

Extract every interactive field on every page. Also return the document title.
`.trim();

// ── Helpers ───────────────────────────────────────────────────────────────────

async function pdfUrlToBase64(pdfUrl: string): Promise<string> {
  const response = await fetch(pdfUrl);
  if (!response.ok)
    throw new Error(`Failed to fetch PDF: ${response.status} ${response.statusText}`);
  const blob = await response.blob();

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const dataUrl = reader.result as string;
      resolve(dataUrl.split(',')[1]);
    };
    reader.onerror = () => reject(new Error('Failed to read PDF as base64'));
    reader.readAsDataURL(blob);
  });
}

// ── Public API ────────────────────────────────────────────────────────────────

export async function extractFromPDF(pdfUrl: string): Promise<ExtractionResult> {
  if (!env) throw new Error('Gemini API key is not configured.');

  const base64 = await pdfUrlToBase64(pdfUrl);

  const genAI = new GoogleGenerativeAI(env.VITE_GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({
    model: GEMINI_MODEL,
    generationConfig: {
      responseMimeType: 'application/json',
      responseSchema: geminiResponseSchema,
    },
  });

  const result = await model.generateContent([
    { inlineData: { mimeType: 'application/pdf', data: base64 } },
    EXTRACTION_PROMPT,
  ]);

  const raw: unknown = JSON.parse(result.response.text());
  const parsed = AIResponseSchema.safeParse(raw);

  if (!parsed.success) {
    throw new Error(`AI response did not match expected schema: ${parsed.error.message}`);
  }

  return parsed.data;
}
