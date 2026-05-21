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
import { useAppStore } from '@/store/useStore';

interface DynamicFormFieldProps {
  field: FormField;
}

export function DynamicFormField({ field }: DynamicFormFieldProps) {
  const { activeFieldId, setActiveFieldId } = useAppStore();
  const isActive = activeFieldId === field.id;

  const handleActivate = () => {
    setActiveFieldId(field.id);
  };

  // Wrapper classes to add a subtle highlight when the field is active
  const wrapperClass = `transition-all duration-200 rounded-lg p-3 -mx-3 border cursor-pointer ${
    isActive ? 'bg-primary/5 border-primary/20 shadow-sm' : 'border-transparent hover:bg-muted/50'
  }`;

  switch (field.type) {
    case 'text':
    case 'number':
      return (
        <div
          className={`flex flex-col space-y-2 ${wrapperClass}`}
          onClick={handleActivate}
          onFocusCapture={handleActivate}
        >
          <Label
            htmlFor={field.id}
            className={`font-medium text-sm cursor-pointer ${isActive ? 'text-primary' : 'text-foreground'}`}
          >
            {field.label}
          </Label>
          <Input
            id={field.id}
            type={field.type}
            defaultValue={field.value}
            disabled
            className={`bg-background focus-visible:ring-ring rounded-md pointer-events-none ${isActive ? 'border-primary/50' : ''}`}
          />
        </div>
      );

    case 'checkbox':
      return (
        <div
          className={`flex items-start space-x-3 ${wrapperClass}`}
          onClick={handleActivate}
          onFocusCapture={handleActivate}
        >
          <Checkbox
            id={field.id}
            defaultChecked={field.value === 'true'}
            disabled
            className="mt-0.5 rounded-sm pointer-events-none"
          />
          <Label
            htmlFor={field.id}
            className={`font-medium text-sm leading-snug cursor-pointer ${isActive ? 'text-primary' : 'text-foreground'}`}
          >
            {field.label}
          </Label>
        </div>
      );

    case 'select':
      return (
        <div
          className={`flex flex-col space-y-2 ${wrapperClass}`}
          onClick={handleActivate}
          onFocusCapture={handleActivate}
        >
          <Label
            htmlFor={field.id}
            className={`font-medium text-sm cursor-pointer ${isActive ? 'text-primary' : 'text-foreground'}`}
          >
            {field.label}
          </Label>
          <Select defaultValue={field.value} disabled>
            <SelectTrigger
              id={field.id}
              className={`bg-background focus:ring-ring rounded-md pointer-events-none ${isActive ? 'border-primary/50' : ''}`}
            >
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
