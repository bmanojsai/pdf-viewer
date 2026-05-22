import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/store/useStore';
import { HIGHLIGHT_PADDING } from '@/lib/constants';
import type { FormField, PDFCoordinates } from '@/types';

interface PDFPageOverlayProps {
  pageIndex: number;
  fields: FormField[];
}

type Padding = { left: number; right: number; top: number; bottom: number };

/** Expands a bounding box outward by per-side flat percentage values. */
function expandCoordinates(coords: PDFCoordinates, pad: Padding): PDFCoordinates {
  const left = Math.max(0, coords.left - pad.left);
  const top = Math.max(0, coords.top - pad.top);
  const right = Math.min(100, coords.left + coords.width + pad.right);
  const bottom = Math.min(100, coords.top + coords.height + pad.bottom);
  return { ...coords, left, top, width: right - left, height: bottom - top };
}

export function PDFPageOverlay({ pageIndex, fields }: PDFPageOverlayProps) {
  const activeFieldId = useAppStore((s) => s.activeFieldId);
  const pageFields = fields.filter((f) => f.pdfCoordinates.pageIndex === pageIndex);
  const activeHighlightRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    activeHighlightRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
      inline: 'center',
    });
  }, [activeFieldId]);

  return (
    <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
      {pageFields.map((field) => {
        const isActive = activeFieldId === field.id;
        const { left, top, width, height } = expandCoordinates(
          field.pdfCoordinates,
          HIGHLIGHT_PADDING
        );

        return (
          <div
            key={field.id}
            ref={isActive ? activeHighlightRef : null}
            className="absolute pointer-events-none"
            style={{ left: `${left}%`, top: `${top}%`, width: `${width}%`, height: `${height}%` }}
          >
            {/* Pulse ring — independent of layoutId so it doesn't interfere with cross-field transition */}
            {isActive && (
              <motion.div
                initial={{ opacity: 0.75, scale: 1 }}
                animate={{ opacity: 0, scale: 1.45 }}
                transition={{ repeat: Infinity, duration: 1.6, ease: 'easeOut', repeatDelay: 0.5 }}
                className="absolute inset-0 border-2 border-primary rounded-sm pointer-events-none"
              />
            )}

            {/* Spotlight — uses layoutId for smooth transition when switching fields */}
            <AnimatePresence>
              {isActive && (
                <motion.div
                  layoutId="pdf-spotlight"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  className="absolute inset-0 bg-primary/20 border-2 border-primary rounded-sm shadow-[0_0_0_9999px_rgba(0,0,0,0.4)] ring-4 ring-primary/40 pointer-events-none"
                />
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
