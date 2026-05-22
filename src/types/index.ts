import { z } from 'zod';

export const FieldTypeSchema = z.enum(['text', 'checkbox', 'select', 'number']);
export type FieldType = z.infer<typeof FieldTypeSchema>;

export const PDFCoordinatesSchema = z.object({
  pageIndex: z.number().int().nonnegative(),
  left: z.number().min(0).max(100),
  top: z.number().min(0).max(100),
  width: z.number().min(0).max(100),
  height: z.number().min(0).max(100),
});
export type PDFCoordinates = z.infer<typeof PDFCoordinatesSchema>;

export const FormFieldSchema = z.object({
  id: z.string(),
  type: FieldTypeSchema,
  label: z.string(),
  value: z.string(),
  options: z.array(z.string()).optional(),
  pdfCoordinates: PDFCoordinatesSchema,
  error: z.string().optional(),
});
export type FormField = z.infer<typeof FormFieldSchema>;
