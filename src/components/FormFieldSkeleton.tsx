// Mirrors the field pattern from mockData so the skeleton visually matches
// the real form layout once it loads.
const SKELETON_PATTERN = [
  'text',
  'text',
  'text',
  'text',
  'checkbox',
  'checkbox',
  'text',
  'text',
  'text',
  'text',
  'text',
] as const;

function TextSkeleton() {
  return (
    <div className="rounded-lg p-3 -mx-3 border border-transparent">
      <div className="h-3.5 w-1/3 bg-muted rounded animate-pulse mb-2.5" />
      <div className="h-8 w-full bg-muted/70 rounded animate-pulse" />
    </div>
  );
}

function CheckboxSkeleton() {
  return (
    <div className="rounded-lg p-3 -mx-3 border border-transparent">
      <div className="flex items-center space-x-3">
        <div className="size-4 bg-muted rounded-sm animate-pulse shrink-0" />
        <div className="h-3.5 w-2/3 bg-muted rounded animate-pulse" />
      </div>
    </div>
  );
}

export function FormFieldSkeleton() {
  return (
    <div className="space-y-5">
      {SKELETON_PATTERN.map((type, i) =>
        type === 'checkbox' ? <CheckboxSkeleton key={i} /> : <TextSkeleton key={i} />
      )}
    </div>
  );
}
