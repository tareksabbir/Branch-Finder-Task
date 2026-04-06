"use client";

import { FilterType, SortType } from "@/lib/types";
import { FilterChips } from "./FilterChips";

interface BranchListHeaderProps {
  branchesCount: number;
  activeFilter: FilterType;
  activeSort: SortType;
  onFilterChange: (f: FilterType) => void;
  onSortChange: (s: SortType) => void;
}

export function BranchListHeader({
  branchesCount,
  activeFilter,
  activeSort,
  onFilterChange,
  onSortChange,
}: BranchListHeaderProps) {
  return (
    <>
      {/* Filters */}
      <div className="px-6 py-8 pb-3 border-b border-slate/20 bg-cream shrink-0">
        <FilterChips active={activeFilter} onChange={onFilterChange} />
      </div>

      {/* Sort + count */}
      <div className="px-6 py-3 border-b border-slate/20 flex items-center justify-between shrink-0">
        <span className="text-[1.15rem] text-slate">
          <strong className="text-midnight font-semibold">
            {branchesCount}
          </strong>{" "}
          branches found
        </span>
        <select
          value={activeSort}
          onChange={(e) => onSortChange(e.target.value as SortType)}
          className="text-[1rem] text-midnight border border-slate/20 rounded-md px-2.5 py-1.5 bg-warm-white outline-none cursor-pointer"
        >
          <option value="distance">Sort: Distance</option>
          <option value="name">Sort: Name A–Z</option>
          <option value="country">Sort: Country</option>
        </select>
      </div>
    </>
  );
}
