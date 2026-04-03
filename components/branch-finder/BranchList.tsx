// components/branch-finder/BranchList.tsx
"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Branch, FilterType, SortType } from "@/lib/types";
import { BranchCard } from "./BranchCard";
import { FilterChips } from "./FilterChips";
import { Spinner } from "@/components/ui/Spinner";
import { Search } from "lucide-react";
import { getInfiniteScrollData } from "@/lib/utils/common";

const PAGE_SIZE = 10;

interface BranchListProps {
  branches: Branch[];
  isLoading: boolean;
  isError: boolean;
  activeFilter: FilterType;
  activeSort: SortType;
  selectedId: string | null;
  onFilterChange: (f: FilterType) => void;
  onSortChange: (s: SortType) => void;
  onSelect: (b: Branch) => void;
}

export function BranchList({
  branches,
  isLoading,
  isError,
  activeFilter,
  activeSort,
  selectedId,
  onFilterChange,
  onSortChange,
  onSelect,
}: BranchListProps) {
  const [page, setPage] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isScrollingRef = useRef(false);

  const { totalPages, visibleItems: visibleBranches, visibleCount } = getInfiniteScrollData(
    branches,
    page,
    PAGE_SIZE
  );

  // Reset to page 0 when filters/sort/search change
  useEffect(() => {
    setPage(0);
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
  }, [branches]);



  // Detect scroll-to-bottom → next page, scroll-at-top (bounce back) → prev page
  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el || isScrollingRef.current) return;

    const { scrollTop, scrollHeight, clientHeight } = el;
    const atBottom = scrollTop + clientHeight >= scrollHeight - 8;

    if (atBottom && page < totalPages - 1) {
      isScrollingRef.current = true;
      setPage((p) => p + 1);
      setTimeout(() => {
        isScrollingRef.current = false;
      }, 300); // 300ms debounce to prevent double firing
    }
  }, [page, totalPages]);

  return (
    // On mobile, the list is 85vh tall and has its own internal scroll. On desktop, it takes full height.
    <aside className="flex flex-col bg-warm-white h-[85vh] md:h-full md:overflow-hidden">

      {/* Filters */}
      <div className="px-6 py-8 pb-3 border-b border-slate/20 bg-cream flex-shrink-0">
        <FilterChips active={activeFilter} onChange={onFilterChange} />
      </div>

      {/* Sort + count */}
      <div className="px-6 py-3 border-b border-slate/20 flex items-center justify-between flex-shrink-0">
        <span className="text-[1.15rem] text-slate">
          <strong className="text-midnight font-semibold">{branches.length}</strong>{" "}
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

      {/* Cards — native scroll, scrollbar hidden */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex-1 p-4 overflow-y-scroll no-scrollbar"
      >

        {isLoading && (
          <div className="flex flex-col items-center justify-center py-16 gap-4">
            <Spinner />
            <p className="text-[1.15rem] text-slate">Loading branches…</p>
          </div>
        )}

        {isError && (
          <div className="p-6 text-center">
            <p className="text-[1.15rem] text-red-500 font-medium">Failed to load branches.</p>
            <p className="text-[1rem] text-slate mt-1">Please refresh and try again.</p>
          </div>
        )}

        {!isLoading && !isError && branches.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 gap-3">
            <div className="w-14 h-14 bg-cream rounded-full grid place-items-center">
              <Search className="w-6 h-6 text-sage" strokeWidth={2} />
            </div>
            <p className="text-[1.5rem] font-semibold text-midnight">No branches found</p>
            <p className="text-[1.15rem] text-slate text-center max-w-[300px]">
              Try adjusting your search or filters.
            </p>
          </div>
        )}

        {!isLoading && !isError && visibleBranches.map((branch, i) => (
          <BranchCard
            key={branch.id}
            branch={branch}
            isActive={selectedId === branch.id}
            index={i}
            onClick={() => onSelect(branch)}
          />
        ))}

        {/* Bottom sentinel + page label */}
        {!isLoading && !isError && branches.length > 0 && (
          <div className="py-3 text-center">
            <span className="text-[0.78rem] text-slate/40">
              Showing {visibleCount} of {branches.length.toLocaleString()}
            </span>
          </div>
        )}
      </div>

    </aside>
  );
}