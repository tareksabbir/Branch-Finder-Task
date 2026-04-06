import { memo, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/Card";
import { Branch } from "@/lib/types";
import { formatDistance } from "@/lib/utils/geo";

interface BranchCardProps {
  branch: Branch;
  isActive: boolean;
  index: number;
  onSelect: (branch: Branch) => void;
}

export const BranchCard = memo(function BranchCard({
  branch,
  isActive,
  index,
  onSelect,
}: BranchCardProps) {
  const handleClick = useCallback(() => {
    onSelect(branch);
  }, [branch, onSelect]);

  return (
    <Card
      variant="interactive"
      active={isActive}
      onClick={handleClick}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, delay: Math.min(index * 0.04, 0.4) }}
      className="mb-2.5 group"
    >
      {/* Left accent bar */}
      <div
        className={`absolute left-0 top-0 bottom-0 w-0.75 transition-colors rounded-l-xl
        ${isActive ? "bg-midnight" : "bg-transparent group-hover:bg-gold"}`}
      />

      <CardContent className="p-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-playfair font-semibold text-[1.3rem] text-midnight leading-snug">
            {branch.name}
          </h3>
          {branch.distance != null && (
            <span className="text-[0.9rem] font-semibold text-gold bg-gold/15 px-2.5 py-1 rounded-full whitespace-nowrap shrink-0">
              {formatDistance(branch.distance)}
            </span>
          )}
        </div>

        {/* Address */}
        <p className="text-[1.15rem] text-slate leading-relaxed mb-3">
          {branch.street}
          <br />
          {branch.city}, {branch.zipCode}
          <br />
          {branch.country}
        </p>

        {/* Footer */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[0.85rem] font-semibold px-2 py-0.75 rounded bg-sage/15 text-deep-teal uppercase tracking-wide">
            {branch.countryCode}
          </span>
          {branch.phone && (
            <span className="text-[1rem] text-slate/70">{branch.phone}</span>
          )}
        </div>
      </CardContent>
    </Card>
  );
});
