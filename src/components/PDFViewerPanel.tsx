import { useEffect, useRef } from 'react';
import { Worker, Viewer, SpecialZoomLevel, type RenderPageProps } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/store/useStore';
import mockData from '@/data/mockData.json';
import type { FormField } from '@/types';

const fields = mockData.fields as FormField[];

function PageOverlay({ pageIndex }: { pageIndex: number }) {
  const { activeFieldId } = useAppStore();
  const pageFields = fields.filter((f) => f.pdfCoordinates.pageIndex === pageIndex);

  // Reference to the active highlight element for scrolling
  const activeHighlightRef = useRef<HTMLDivElement | null>(null);

  // Scroll into view whenever the active field changes and is rendered on this page
  useEffect(() => {
    if (activeHighlightRef.current) {
      activeHighlightRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'center',
      });
    }
  }, [activeFieldId]);

  return (
    <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
      {/* Field Highlights */}
      {pageFields.map((field) => {
        const isActive = activeFieldId === field.id;
        const { left, top, width, height } = field.pdfCoordinates;

        return (
          <div
            key={field.id}
            ref={isActive ? activeHighlightRef : null}
            className="absolute pointer-events-none"
            style={{
              left: `${left}%`,
              top: `${top}%`,
              width: `${width}%`,
              height: `${height}%`,
            }}
          >
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

const renderPage = (props: RenderPageProps) => {
  return (
    <>
      {props.canvasLayer.children}
      {props.textLayer.children}
      {props.annotationLayer.children}
      <PageOverlay pageIndex={props.pageIndex} />
    </>
  );
};

export function PDFViewerPanel() {
  return (
    <div className="h-full w-full bg-slate-200">
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
        <div className="h-full w-full overflow-auto">
          <Viewer
            fileUrl="/sample-form.pdf"
            defaultScale={SpecialZoomLevel.PageWidth}
            renderPage={renderPage}
          />
        </div>
      </Worker>
    </div>
  );
}
