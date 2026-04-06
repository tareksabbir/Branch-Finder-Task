"use client";

import { useRef, useEffect } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { Branch, FilterType, SortType } from "@/lib/types";
import { BranchCard } from "./BranchCard";
import { BranchListHeader } from "./BranchListHeader";
import { BranchListStatus } from "./BranchListStatus";

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
  const scrollRef = useRef<HTMLDivElement>(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const rowVirtualizer = useVirtualizer({
    count: branches.length,
    getScrollElement: () => scrollRef.current,
    estimateSize: () => 160, 
    overscan: 5,
  });

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
    rowVirtualizer.measure();
  }, [branches, rowVirtualizer]);

  return (
    <aside className="flex flex-col bg-warm-white h-[85vh] md:h-full md:overflow-hidden">
      <BranchListHeader
        branchesCount={branches.length}
        activeFilter={activeFilter}
        activeSort={activeSort}
        onFilterChange={onFilterChange}
        onSortChange={onSortChange}
      />

      <div
        ref={scrollRef}
        className="flex-1 p-4 overflow-y-auto overflow-x-hidden no-scrollbar"
      >
        <BranchListStatus
          isLoading={isLoading}
          isError={isError}
          isEmpty={!isLoading && !isError && branches.length === 0}
        />

        {!isLoading && !isError && branches.length > 0 && (
          <div
            style={{
              height: `${rowVirtualizer.getTotalSize()}px`,
              width: "100%",
              position: "relative",
            }}
          >
            {rowVirtualizer.getVirtualItems().map((virtualItem) => {
              const branch = branches[virtualItem.index];
              return (
                <div
                  key={virtualItem.key}
                  data-index={virtualItem.index}
                  ref={rowVirtualizer.measureElement}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    transform: `translateY(${virtualItem.start}px)`,
                    paddingBottom: "16px",
                  }}
                >
                  <BranchCard
                    branch={branch}
                    isActive={selectedId === branch.id}
                    index={virtualItem.index}
                    onSelect={onSelect}
                  />
                </div>
              );
            })}
          </div>
        )}

        {!isLoading && !isError && branches.length > 0 && (
          <div className="py-3 mt-4 text-center">
            <span className="text-[0.78rem] text-slate/40">
              Showing {branches.length.toLocaleString()} locations
            </span>
          </div>
        )}
      </div>
    </aside>
  );
}
