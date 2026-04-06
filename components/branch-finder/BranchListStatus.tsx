"use client";

import { Spinner } from "@/components/ui/Spinner";
import { Search } from "lucide-react";

interface BranchListStatusProps {
  isLoading: boolean;
  isError: boolean;
  isEmpty: boolean;
}

export function BranchListStatus({
  isLoading,
  isError,
  isEmpty,
}: BranchListStatusProps) {
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-4">
        <Spinner />
        <p className="text-[1.15rem] text-slate">Loading branches…</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-6 text-center">
        <p className="text-[1.15rem] text-red-500 font-medium">
          Failed to load branches.
        </p>
        <p className="text-[1rem] text-slate mt-1">
          Please refresh and try again.
        </p>
      </div>
    );
  }

  if (isEmpty) {
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-3">
        <div className="w-14 h-14 bg-cream rounded-full grid place-items-center">
          <Search className="w-6 h-6 text-sage" strokeWidth={2} />
        </div>
        <p className="text-[1.5rem] font-semibold text-midnight">
          No branches found
        </p>
        <p className="text-[1.15rem] text-slate text-center max-w-75">
          Try adjusting your search or filters.
        </p>
      </div>
    );
  }

  return null;
}
