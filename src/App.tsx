import { PDFViewerPanel } from '@/components/PDFViewerPanel';
import { FormPanel } from '@/components/FormPanel';

function App() {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      {/* PDF Panel - 65% width */}
      <div className="w-[65%] h-full relative">
        <PDFViewerPanel />
      </div>

      {/* Form Panel - 35% width */}
      <div className="w-[35%] h-full flex flex-col bg-card shadow-lg z-10 border-l border-border relative">
        <FormPanel />
      </div>
    </div>
  );
}

export default App;
