import { motion } from 'framer-motion';
import { AlertCircle, Sparkles, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DynamicFormField } from '@/components/DynamicFormField';
import { FormFieldSkeleton } from '@/components/FormFieldSkeleton';
import { useAppStore } from '@/store/useStore';
import { useExtraction } from '@/hooks/useExtraction';
import { PDF_URL } from '@/lib/constants';

const fieldListVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.1,
    },
  },
};

export function FormPanel() {
  const { fields, title, isExtracting, extractionError } = useAppStore();
  const { trigger, hasKey } = useExtraction(PDF_URL);

  return (
    <div className="h-full flex flex-col overflow-hidden bg-card">
      {/* Panel Header — desktop only */}
      <div className="hidden lg:flex items-center justify-between px-6 py-4 border-b border-border bg-card shrink-0">
        <div>
          <h2 className="text-base font-semibold text-foreground">Form Fields</h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            {isExtracting
              ? 'Extracting fields from document…'
              : 'Click a field to highlight it on the PDF.'}
          </p>
        </div>

        <Button
          size="sm"
          onClick={trigger}
          disabled={isExtracting || !hasKey}
          title={!hasKey ? 'Add VITE_GEMINI_API_KEY to .env to enable AI extraction' : undefined}
          className="shrink-0 gap-1.5"
        >
          {isExtracting ? (
            <Loader2 className="size-3.5 animate-spin" />
          ) : (
            <Sparkles className="size-3.5" />
          )}
          {isExtracting ? 'Extracting…' : 'Extract with AI'}
        </Button>
      </div>

      {/* Scrollable Field List */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 lg:p-6">
          <Card className="shadow-form border-border">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <CardTitle className="text-base lg:text-xl font-semibold text-primary leading-snug">
                    {title}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground text-xs lg:text-sm mt-1">
                    {isExtracting
                      ? 'AI is reading the document. This may take a few seconds.'
                      : 'All fields extracted from the document.'}
                  </CardDescription>
                </div>

                {/* Extract button — mobile only (desktop has it in the panel header) */}
                <Button
                  size="sm"
                  onClick={trigger}
                  disabled={isExtracting || !hasKey}
                  title={
                    !hasKey ? 'Add VITE_GEMINI_API_KEY to .env to enable AI extraction' : undefined
                  }
                  className="lg:hidden shrink-0 gap-1.5"
                >
                  {isExtracting ? (
                    <Loader2 className="size-3.5 animate-spin" />
                  ) : (
                    <Sparkles className="size-3.5" />
                  )}
                  {isExtracting ? 'Extracting…' : 'Extract with AI'}
                </Button>
              </div>
            </CardHeader>

            <CardContent>
              {/* Extraction error banner */}
              {extractionError && (
                <div className="flex items-start gap-2 mb-4 rounded-lg border border-destructive/30 bg-destructive/5 px-3 py-2.5 text-xs text-destructive">
                  <AlertCircle className="size-3.5 mt-0.5 shrink-0" />
                  <span>AI extraction failed — showing fallback data. {extractionError}</span>
                </div>
              )}

              {isExtracting ? (
                <FormFieldSkeleton />
              ) : (
                <motion.div
                  variants={fieldListVariants}
                  initial="hidden"
                  animate="visible"
                  className="space-y-5"
                >
                  {fields.map((field) => (
                    <DynamicFormField key={field.id} field={field} />
                  ))}
                </motion.div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
