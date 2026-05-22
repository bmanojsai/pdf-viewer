import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useActiveField } from '@/hooks/useActiveField';
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
import type { FormField } from '@/types';

// ── Animation variant (consumed by the stagger container in FormPanel) ────────

const fieldItemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring' as const, stiffness: 280, damping: 22 },
  },
};

// ── Shared helpers ────────────────────────────────────────────────────────────

interface FieldItemProps {
  field: FormField;
  isActive: boolean;
  onActivate: () => void;
}

function fieldWrapperCn(isActive: boolean) {
  return cn(
    'transition-all duration-200 rounded-lg p-3 -mx-3 border cursor-pointer',
    isActive ? 'bg-primary/5 border-primary/20 shadow-sm' : 'border-transparent hover:bg-muted/50'
  );
}

function labelCn(isActive: boolean) {
  return cn('font-medium text-sm cursor-pointer', isActive ? 'text-primary' : 'text-foreground');
}

// ── Field type sub-components (one reason to change each) ────────────────────

function TextFieldItem({ field, isActive, onActivate }: FieldItemProps) {
  return (
    <div
      className={cn('flex flex-col space-y-2', fieldWrapperCn(isActive))}
      onClick={onActivate}
      onFocusCapture={onActivate}
    >
      <Label htmlFor={field.id} className={labelCn(isActive)}>
        {field.label}
      </Label>
      <Input
        id={field.id}
        type={field.type}
        defaultValue={field.value}
        disabled
        className={cn(
          'bg-background focus-visible:ring-ring rounded-md pointer-events-none',
          isActive && 'border-primary/50'
        )}
      />
    </div>
  );
}

function CheckboxFieldItem({ field, isActive, onActivate }: FieldItemProps) {
  return (
    <div
      className={cn('flex items-start space-x-3', fieldWrapperCn(isActive))}
      onClick={onActivate}
      onFocusCapture={onActivate}
    >
      <Checkbox
        id={field.id}
        defaultChecked={field.value === 'true'}
        disabled
        className="mt-0.5 rounded-sm pointer-events-none"
      />
      <Label htmlFor={field.id} className={cn(labelCn(isActive), 'leading-snug')}>
        {field.label}
      </Label>
    </div>
  );
}

function SelectFieldItem({ field, isActive, onActivate }: FieldItemProps) {
  return (
    <div
      className={cn('flex flex-col space-y-2', fieldWrapperCn(isActive))}
      onClick={onActivate}
      onFocusCapture={onActivate}
    >
      <Label htmlFor={field.id} className={labelCn(isActive)}>
        {field.label}
      </Label>
      <Select defaultValue={field.value} disabled>
        <SelectTrigger
          id={field.id}
          className={cn(
            'bg-background focus:ring-ring rounded-md pointer-events-none',
            isActive && 'border-primary/50'
          )}
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
}

// ── Public component — dispatches to the correct sub-component ────────────────

interface DynamicFormFieldProps {
  field: FormField;
}

export function DynamicFormField({ field }: DynamicFormFieldProps) {
  const { isActive, activate } = useActiveField(field.id);
  const commonProps = { field, isActive, onActivate: activate };

  return (
    <motion.div variants={fieldItemVariants}>
      {(field.type === 'text' || field.type === 'number') && <TextFieldItem {...commonProps} />}
      {field.type === 'checkbox' && <CheckboxFieldItem {...commonProps} />}
      {field.type === 'select' && <SelectFieldItem {...commonProps} />}
    </motion.div>
  );
}
