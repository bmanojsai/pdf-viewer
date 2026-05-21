import { FileText, ClipboardList } from 'lucide-react';

export type ActiveTab = 'pdf' | 'form';

interface MobileTabBarProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
}

export function MobileTabBar({ activeTab, onTabChange }: MobileTabBarProps) {
  return (
    <div className="lg:hidden flex items-center border-b border-border bg-card shadow-sm z-20 shrink-0">
      <button
        id="tab-pdf"
        type="button"
        onClick={() => onTabChange('pdf')}
        className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium transition-colors ${
          activeTab === 'pdf'
            ? 'text-primary border-b-2 border-primary bg-primary/5'
            : 'text-muted-foreground hover:text-foreground'
        }`}
      >
        <FileText className="size-4" />
        Document
      </button>
      <button
        id="tab-form"
        type="button"
        onClick={() => onTabChange('form')}
        className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium transition-colors ${
          activeTab === 'form'
            ? 'text-primary border-b-2 border-primary bg-primary/5'
            : 'text-muted-foreground hover:text-foreground'
        }`}
      >
        <ClipboardList className="size-4" />
        Form Fields
      </button>
    </div>
  );
}
