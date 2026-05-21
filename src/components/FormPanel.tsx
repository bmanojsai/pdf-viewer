import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { DynamicFormField } from '@/components/DynamicFormField';
import { useAppStore } from '@/store/useStore';

export function FormPanel() {
  const { fields, title } = useAppStore();

  return (
    <div className="h-full flex flex-col overflow-hidden bg-card">
      {/* Panel Header */}
      <div className="hidden lg:block px-6 py-4 border-b border-border bg-card shrink-0">
        <h2 className="text-base font-semibold text-foreground">Form Fields</h2>
        <p className="text-xs text-muted-foreground mt-0.5">
          Review and edit the extracted data below.
        </p>
      </div>

      {/* Scrollable Field List */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 lg:p-6">
          <Card className="shadow-form border-border">
            <CardHeader className="pb-4">
              <CardTitle className="text-base lg:text-xl font-semibold text-primary leading-snug">
                {title}
              </CardTitle>
              <CardDescription className="text-muted-foreground text-xs lg:text-sm">
                All fields extracted from the document. Update where needed.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              {fields.map((field) => (
                <DynamicFormField key={field.id} field={field} />
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
