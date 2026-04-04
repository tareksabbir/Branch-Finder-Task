// hooks/useBranches.ts
"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchAllBranches } from "@/lib/api";
import { mapApiBranch } from "@/lib/utils/branch";
import { Branch } from "@/lib/types";

export function useBranches() {
  return useQuery<Branch[]>({
    queryKey: ["branches"],
    queryFn: async ({ signal }) => {
      const items = await fetchAllBranches(signal);
      return items.map(mapApiBranch);
    },
    staleTime: 1000 * 60 * 60, // 1 hour — branches rarely change
    gcTime: 1000 * 60 * 60 * 2, // keep in cache 2 hours
    refetchOnWindowFocus: false,
  });
}
