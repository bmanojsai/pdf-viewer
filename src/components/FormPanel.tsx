import mockData from '@/data/mockData.json';
import type { FormField } from '@/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';

export function FormPanel() {
  const fields = mockData.fields as FormField[];

  return (
    <ScrollArea className="h-full w-full bg-card">
      <div className="p-6">
        <Card className="shadow-form border-border">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-primary">{mockData.title}</CardTitle>
            <CardDescription className="text-muted-foreground">
              Please review and update the extracted fields below.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {fields.map((field) => (
              <div key={field.id} className="flex flex-col space-y-2">
                {field.type === 'text' && (
                  <>
                    <Label htmlFor={field.id} className="text-foreground font-medium">
                      {field.label}
                    </Label>
                    <Input
                      id={field.id}
                      defaultValue={field.value}
                      className="bg-background focus-visible:ring-ring"
                    />
                  </>
                )}

                {field.type === 'checkbox' && (
                  <div className="flex items-center space-x-3 mt-4">
                    <Checkbox id={field.id} defaultChecked={field.value === 'true'} />
                    <Label htmlFor={field.id} className="text-foreground font-medium leading-tight">
                      {field.label}
                    </Label>
                  </div>
                )}

                {field.type === 'select' && (
                  <>
                    <Label htmlFor={field.id} className="text-foreground font-medium">
                      {field.label}
                    </Label>
                    <Select defaultValue={field.value}>
                      <SelectTrigger id={field.id} className="bg-background focus:ring-ring">
                        <SelectValue placeholder="Select an option" />
                      </SelectTrigger>
                      <SelectContent>
                        {field.options?.map((opt) => (
                          <SelectItem key={opt} value={opt}>
                            {opt}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </ScrollArea>
  );
}
