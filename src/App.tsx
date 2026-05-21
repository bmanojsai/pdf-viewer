import { useState } from 'react';
import { PDFViewerPanel } from '@/components/PDFViewerPanel';
import { FormPanel } from '@/components/FormPanel';
import { MobileTabBar, type ActiveTab } from '@/components/MobileTabBar';

function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('pdf');

  return (
    <div className="flex flex-col h-screen w-full overflow-hidden bg-background">
      {/* Mobile / Tablet Tab Bar — hidden on large screens */}
      <MobileTabBar activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Content area */}
      <div className="flex flex-1 overflow-hidden">
        {/* PDF Panel */}
        <div
          className={`
            h-full relative
            lg:block lg:w-[65%]
            ${activeTab === 'pdf' ? 'block w-full' : 'hidden'}
          `}
        >
          <PDFViewerPanel />
        </div>

        {/* Divider — desktop only */}
        <div className="hidden lg:block w-px bg-border shrink-0" />

        {/* Form Panel */}
        <div
          className={`
            h-full flex-col bg-card shadow-lg z-10 relative
            lg:flex lg:w-[35%]
            ${activeTab === 'form' ? 'flex w-full' : 'hidden'}
          `}
        >
          <FormPanel />
        </div>
      </div>
    </div>
  );
}

export default App;
