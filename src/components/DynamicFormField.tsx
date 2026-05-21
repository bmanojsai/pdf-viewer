import type { FormField } from '@/types';
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

interface DynamicFormFieldProps {
  field: FormField;
}

export function DynamicFormField({ field }: DynamicFormFieldProps) {
  switch (field.type) {
    case 'text':
    case 'number':
      return (
        <div className="flex flex-col space-y-2">
          <Label htmlFor={field.id} className="text-foreground font-medium text-sm">
            {field.label}
          </Label>
          <Input
            id={field.id}
            type={field.type}
            defaultValue={field.value}
            className="bg-background focus-visible:ring-ring rounded-md"
          />
        </div>
      );

    case 'checkbox':
      return (
        <div className="flex items-start space-x-3 py-1">
          <Checkbox
            id={field.id}
            defaultChecked={field.value === 'true'}
            className="mt-0.5 rounded-sm"
          />
          <Label
            htmlFor={field.id}
            className="text-foreground font-medium text-sm leading-snug cursor-pointer"
          >
            {field.label}
          </Label>
        </div>
      );

    case 'select':
      return (
        <div className="flex flex-col space-y-2">
          <Label htmlFor={field.id} className="text-foreground font-medium text-sm">
            {field.label}
          </Label>
          <Select defaultValue={field.value}>
            <SelectTrigger id={field.id} className="bg-background focus:ring-ring rounded-md">
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
        </div>
      );

    default:
      return null;
  }
}
