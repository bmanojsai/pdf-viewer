import { useCallback } from 'react';
import { useAppStore } from '@/store/useStore';

/**
 * Encapsulates active-state and value-update concerns for a single field.
 * Used by form field components and the PDF overlay.
 */
export function useActiveField(fieldId: string) {
  const activeFieldId = useAppStore((s) => s.activeFieldId);
  const setActiveFieldId = useAppStore((s) => s.setActiveFieldId);
  const updateFieldValue = useAppStore((s) => s.updateFieldValue);

  const isActive = activeFieldId === fieldId;

  const activate = useCallback(() => {
    setActiveFieldId(fieldId);
  }, [fieldId, setActiveFieldId]);

  const updateValue = useCallback(
    (value: string) => updateFieldValue(fieldId, value),
    [fieldId, updateFieldValue]
  );

  return { isActive, activate, updateValue };
}
