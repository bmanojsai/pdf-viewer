import { FileText, ClipboardList } from 'lucide-react';
import { cn } from '@/lib/utils';

export type ActiveTab = 'pdf' | 'form';

interface MobileTabBarProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
}

const tabCn = (isActive: boolean) =>
  cn(
    'flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium transition-colors',
    isActive
      ? 'text-primary border-b-2 border-primary bg-primary/5'
      : 'text-muted-foreground hover:text-foreground'
  );

export function MobileTabBar({ activeTab, onTabChange }: MobileTabBarProps) {
  return (
    <div className="lg:hidden flex items-center border-b border-border bg-card shadow-sm z-20 shrink-0">
      <button
        id="tab-pdf"
        type="button"
        onClick={() => onTabChange('pdf')}
        className={tabCn(activeTab === 'pdf')}
      >
        <FileText className="size-4" />
        Document
      </button>
      <button
        id="tab-form"
        type="button"
        onClick={() => onTabChange('form')}
        className={tabCn(activeTab === 'form')}
      >
        <ClipboardList className="size-4" />
        Form Fields
      </button>
    </div>
  );
}
