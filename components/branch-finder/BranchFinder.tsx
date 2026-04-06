"use client";

import { useMemo, useEffect } from "react";
import { useBranches } from "@/hooks/useBranches";
import { useGeolocation } from "@/hooks/useGeolocation";
import { useBranchFinderState } from "@/hooks/useBranchFinderState";
import {
  getProcessedBranches,
  getAvailableCountries,
  getAvailableCities,
  getBranchStats,
} from "@/lib/utils/branch";
import { calculateDistances } from "@/lib/utils/geo";
import { getCookie } from "@/lib/utils/cookie";
import { BranchFinderHero } from "./BranchFinderHero";
import { MapView } from "./MapView";
import { BranchList } from "./BranchList";
import { ConsentBanner } from "./ConsentBanner";

const GOOGLE_MAPS_API_KEY =
  process.env.GOOGLE_MAPS_API_KEY_FOR_BRANCH_FINDER ??
  "AIzaSyBiGTrQuVps6dXhd3tPkLqoa0N54az4HZI";
// INTENTIONALLY PUT THAT KEY HERE FOR EVALUATION PURPOSE

export function BranchFinder() {
  // External Data Hooks
  const { data: allBranches = [], isLoading, isError } = useBranches();
  const { location, loading: locating, getLocation } = useGeolocation();

  // State Management Hook
  const {
    state,
    setInput,
    applySearch,
    clearAll,
    setFilterType,
    setSort,
    selectBranch,
    hasFilters,
  } = useBranchFinderState();

  // Derived Data
  const availableCountries = useMemo(() => {
    return getAvailableCountries(allBranches);
  }, [allBranches]);

  const availableCities = useMemo(() => {
    return getAvailableCities(allBranches);
  }, [allBranches]);

  const handleLocate = () => {
    getLocation();
    setSort("distance");
  };

  // Auto-locate if previously allowed via Consent Banner (Cookie based)
  useEffect(() => {
    const consent = getCookie("branch_finder_consent");
    if (consent === "allowed") {
      handleLocate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Debounce search when inputs change
  useEffect(() => {
    const timer = setTimeout(() => {
      applySearch();
    }, 400); // 400ms is a good balance for responsiveness

    return () => clearTimeout(timer);
  }, [state.inputs, applySearch]);

  // Calculate distance only when location or branches change
  const branchesWithDistance = useMemo(() => {
    return calculateDistances(allBranches, location);
  }, [allBranches, location]);

  // Handle filtering and sorting (skips heavy distance math)
  const displayBranches = useMemo(() => {
    return getProcessedBranches(
      branchesWithDistance,
      state.activeFilters,
      state.sort,
    );
  }, [branchesWithDistance, state.activeFilters, state.sort]);

  // Limit map markers to 100 if no filters exist to prevent extreme lag
  const mapBranches = useMemo(() => {
    if (!hasFilters && displayBranches.length > 100) {
      return displayBranches.slice(0, 100);
    }
    return displayBranches;
  }, [displayBranches, hasFilters]);

  const stats = useMemo(() => getBranchStats(allBranches), [allBranches]);

  return (
    <div>
      <BranchFinderHero
        totalBranches={stats.total}
        totalCountries={stats.countries}
        branchName={state.inputs.branchName}
        onBranchNameChange={(val) => setInput("branchName", val)}
        city={state.inputs.city}
        onCityChange={(val) => setInput("city", val)}
        availableCities={availableCities}
        country={state.inputs.country}
        onCountryChange={(val) => setInput("country", val)}
        zipCode={state.inputs.zipCode}
        onZipCodeChange={(val) => setInput("zipCode", val)}
        availableCountries={availableCountries}
        onLocate={handleLocate}
        onClear={clearAll}
        hasFilters={hasFilters}
        locating={locating}
      />

      {/* ── App Body ── */}
      <div className="flex flex-col md:flex-row border-t border-slate/20 md:h-[65vh] md:min-h-120 md:overflow-hidden">
        {/* MAP */}
        <div className="order-1 md:order-2 w-full md:flex-1 h-87.5 md:h-full relative shrink-0">
          <MapView
            branches={mapBranches}
            selectedBranch={state.selectedBranch}
            userLocation={location}
            onSelectBranch={selectBranch}
            onCloseDetail={() => selectBranch(null)}
            apiKey={GOOGLE_MAPS_API_KEY}
          />
        </div>

        {/* LIST */}
        <div className="order-2 md:order-1 w-full md:w-[22%] md:shrink-0 h-full md:overflow-hidden border-t border-slate/20 md:border-t-0 md:border-r md:border-slate/20">
          <BranchList
            branches={displayBranches}
            isLoading={isLoading}
            isError={isError}
            activeFilter={state.activeFilters.type}
            activeSort={state.sort}
            selectedId={state.selectedBranch?.id ?? null}
            onFilterChange={setFilterType}
            onSortChange={setSort}
            onSelect={selectBranch}
          />
        </div>
      </div>

      {/* Consent Banner for Location & Cookies */}
      <ConsentBanner onAllow={handleLocate} />
    </div>
  );
}
