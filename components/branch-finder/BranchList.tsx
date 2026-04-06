"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Branch, FilterType, SortType } from "@/lib/types";
import { getInfiniteScrollData } from "@/lib/utils/common";
import { BranchCard } from "./BranchCard";
import { BranchListHeader } from "./BranchListHeader";
import { BranchListStatus } from "./BranchListStatus";

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

  const {
    totalPages,
    visibleItems: visibleBranches,
    visibleCount,
  } = getInfiniteScrollData(branches, page, PAGE_SIZE);

  // Use refs so the IntersectionObserver callback always has fresh values
  // without needing to be recreated on every page/totalPages change
  const pageRef = useRef(page);
  const totalPagesRef = useRef(totalPages);
  pageRef.current = page;
  totalPagesRef.current = totalPages;

  const [prevBranches, setPrevBranches] = useState(branches);
  if (branches !== prevBranches) {
    setPrevBranches(branches);
    setPage(0);
  }

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
  }, [branches]);

  // Stable callback for the observer — reads from refs, never stale
  const handleIntersect = useCallback((entries: IntersectionObserverEntry[]) => {
    if (entries[0].isIntersecting && pageRef.current < totalPagesRef.current - 1) {
      setPage((p) => p + 1);
    }
  }, []);

  // Infinite Scroll via IntersectionObserver — created only once
  const sentinelRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersect, {
      threshold: 0.1,
      root: scrollRef.current,
    });

    const currentSentinel = sentinelRef.current;
    if (currentSentinel) observer.observe(currentSentinel);
    return () => {
      if (currentSentinel) observer.unobserve(currentSentinel);
    };
  }, [handleIntersect]);

  return (
    // On mobile, the list is 85vh tall and has its own internal scroll. On desktop, it takes full height.
    <aside className="flex flex-col bg-warm-white h-[85vh] md:h-full md:overflow-hidden">
      <BranchListHeader
        branchesCount={branches.length}
        activeFilter={activeFilter}
        activeSort={activeSort}
        onFilterChange={onFilterChange}
        onSortChange={onSortChange}
      />

      {/* Cards — native scroll, scrollbar hidden */}
      <div
        ref={scrollRef}
        className="flex-1 p-4 overflow-y-scroll no-scrollbar"
      >
        <BranchListStatus
          isLoading={isLoading}
          isError={isError}
          isEmpty={!isLoading && !isError && branches.length === 0}
        />

        {!isLoading &&
          !isError &&
          visibleBranches.map((branch, i) => (
            <BranchCard
              key={branch.id}
              branch={branch}
              isActive={selectedId === branch.id}
              index={i}
              onSelect={onSelect}
            />
          ))}

        {/* Bottom sentinel + page label */}
        {!isLoading && !isError && branches.length > 0 && (
          <div ref={sentinelRef} className="py-3 text-center">
            <span className="text-[0.78rem] text-slate/40">
              Showing {visibleCount} of {branches.length.toLocaleString()}
            </span>
          </div>
        )}
      </div>
    </aside>
  );
}
