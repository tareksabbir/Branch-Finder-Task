// components/branch-finder/FilterChips.tsx
"use client";

import { FilterType } from "@/lib/types";
import Button from "@/components/ui/Button";

const FILTERS: { label: string; value: FilterType }[] = [
  { label: "All Branches", value: "all" },
  { label: "United States", value: "us" },
  { label: "International", value: "international" },
];

interface FilterChipsProps {
  active: FilterType;
  onChange: (f: FilterType) => void;
}

export function FilterChips({ active, onChange }: FilterChipsProps) {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      {FILTERS.map((f) => (
        <Button
          key={f.value}
          variant="secondary"
          size="sm"
          onClick={() => onChange(f.value)}
          className={`py-[6px] border-slate/20 text-slate hover:border-midnight hover:text-midnight ${
            active === f.value ? "bg-midnight border-midnight text-warm-white" : "bg-warm-white"
          }`}
        >
          {f.label}
        </Button>
      ))}
    </div>
  );
}
