import { Worker, Viewer, SpecialZoomLevel } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';

export function PDFViewerPanel() {
  return (
    <div className="h-full w-full bg-slate-200">
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
        <div className="h-full w-full overflow-auto">
          <Viewer fileUrl="/sample-form.pdf" defaultScale={SpecialZoomLevel.PageWidth} />
        </div>
      </Worker>
    </div>
  );
}
