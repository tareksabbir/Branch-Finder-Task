// components/ui/Badge.tsx
import { cn } from "@/lib/utils/common";

type BadgeVariant = "country" | "neutral";

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variants: Record<BadgeVariant, string> = {
  country: "bg-[#EEF2FF] text-indigo-700",
  neutral: "bg-cream text-navy/60",
};

export function Badge({
  children,
  variant = "neutral",
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "text-[0.68rem] font-semibold px-2 py-0.75 rounded tracking-wide uppercase",
        variants[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
