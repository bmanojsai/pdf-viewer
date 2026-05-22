import { useCallback } from 'react';
import { useAppStore } from '@/store/useStore';
import { extractFromPDF } from '@/services/extractionService';
import { hasGeminiKey } from '@/lib/env';

/**
 * Returns a `trigger` function that, when called, sends the PDF to Gemini
 * and updates the store with the extracted fields. No-ops silently when no
 * API key is configured.
 */
export function useExtraction(pdfUrl: string) {
  const setFields = useAppStore((s) => s.setFields);
  const setExtracting = useAppStore((s) => s.setExtracting);
  const setExtractionError = useAppStore((s) => s.setExtractionError);

  const trigger = useCallback(async () => {
    if (!hasGeminiKey) return;

    setExtracting(true);
    setExtractionError(null);

    try {
      const result = await extractFromPDF(pdfUrl);
      setFields(result.fields, result.title);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Extraction failed';
      setExtractionError(message);
      console.error('[useExtraction]', message);
    } finally {
      setExtracting(false);
    }
  }, [pdfUrl, setFields, setExtracting, setExtractionError]);

  return { trigger, hasKey: hasGeminiKey };
}
