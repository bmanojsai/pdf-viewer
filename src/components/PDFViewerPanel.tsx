import { useCallback } from 'react';
import { Worker, Viewer, SpecialZoomLevel, type RenderPageProps } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { useAppStore } from '@/store/useStore';
import { PDFPageOverlay } from '@/components/PDFPageOverlay';
import { PDFJS_WORKER_URL, PDF_URL } from '@/lib/constants';

function useRenderPage() {
  const fields = useAppStore((s) => s.fields);

  return useCallback(
    (props: RenderPageProps) => (
      <>
        {props.canvasLayer.children}
        {props.textLayer.children}
        {props.annotationLayer.children}
        <PDFPageOverlay pageIndex={props.pageIndex} fields={fields} />
      </>
    ),
    [fields]
  );
}

export function PDFViewerPanel() {
  const renderPage = useRenderPage();

  return (
    <div className="h-full w-full bg-secondary">
      <Worker workerUrl={PDFJS_WORKER_URL}>
        <div className="h-full w-full overflow-auto">
          <Viewer
            fileUrl={PDF_URL}
            defaultScale={SpecialZoomLevel.PageWidth}
            renderPage={renderPage}
          />
        </div>
      </Worker>
    </div>
  );
}
