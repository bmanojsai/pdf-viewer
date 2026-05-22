import { create } from 'zustand';
import type { FormField } from '@/types';
import mockData from '@/data/mockData.json';

interface AppState {
  title: string;
  fields: FormField[];
  activeFieldId: string | null;
  isExtracting: boolean;
  extractionError: string | null;

  setActiveFieldId: (id: string | null) => void;
  updateFieldValue: (id: string, value: string) => void;
  /** Replaces fields (and optionally title) with AI-extracted data. */
  setFields: (fields: FormField[], title?: string) => void;
  setExtracting: (value: boolean) => void;
  setExtractionError: (error: string | null) => void;
}

export const useAppStore = create<AppState>((set) => ({
  title: mockData.title,
  fields: mockData.fields as FormField[],
  activeFieldId: null,
  isExtracting: false,
  extractionError: null,

  setActiveFieldId: (id) => set({ activeFieldId: id }),
  updateFieldValue: (id, value) =>
    set((state) => ({
      fields: state.fields.map((f) => (f.id === id ? { ...f, value } : f)),
    })),
  setFields: (fields, title) => set((state) => ({ fields, title: title ?? state.title })),
  setExtracting: (value) => set({ isExtracting: value }),
  setExtractionError: (error) => set({ extractionError: error }),
}));
