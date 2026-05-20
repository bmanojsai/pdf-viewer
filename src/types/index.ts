export type FieldType = 'text' | 'checkbox' | 'select' | 'number';

export interface PDFCoordinates {
  /** The 0-based index of the page where this field is located */
  pageIndex: number;
  /** Percentage distance from the left edge of the page (0-100) */
  left: number;
  /** Percentage distance from the top edge of the page (0-100) */
  top: number;
  /** Width of the highlight box as a percentage of the page width (0-100) */
  width: number;
  /** Height of the highlight box as a percentage of the page height (0-100) */
  height: number;
}

export interface FormField {
  id: string;
  type: FieldType;
  label: string;
  value: string;
  /** Optional options for select fields */
  options?: string[];
  /** Coordinates mapped to the original PDF document for visual sync */
  pdfCoordinates: PDFCoordinates;
  /** Used later for dynamic validation status */
  error?: string;
}

export interface FormSchema {
  id: string;
  title: string;
  fields: FormField[];
}
