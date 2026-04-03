// components/ui/Spinner.tsx
export function Spinner({ className }: { className?: string }) {
  return (
    <div
      className={`w-9 h-9 rounded-full border-[3px] border-cream border-t-midnight animate-spin ${className ?? ""}`}
    />
  );
}
