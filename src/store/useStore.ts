import { create } from 'zustand';
import type { FormField } from '@/types';
import mockData from '@/data/mockData.json';

interface AppState {
  title: string;
  fields: FormField[];

  /**
   * The ID of the currently focused or active form field.
   * This is used to synchronize the form focus with the PDF spotlight highlight.
   */
  activeFieldId: string | null;

  /** Actions */
  setActiveFieldId: (id: string | null) => void;
  updateFieldValue: (id: string, value: string) => void;
}

export const useAppStore = create<AppState>((set) => ({
  title: mockData.title,
  fields: mockData.fields as FormField[],
  activeFieldId: null,
  setActiveFieldId: (id) => set({ activeFieldId: id }),
  updateFieldValue: (id, value) =>
    set((state) => ({
      fields: state.fields.map((f) => (f.id === id ? { ...f, value } : f)),
    })),
}));
