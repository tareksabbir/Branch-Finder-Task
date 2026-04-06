"use client";

import { useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { useBranches } from "@/hooks/useBranches";
import { useGeolocation } from "@/hooks/useGeolocation";
import { SearchBar } from "./SearchBar";
import { BranchList } from "./BranchList";
import { MapView } from "./MapView";
import { ConsentBanner } from "./ConsentBanner";
import { useBranchFinderState } from "@/hooks/useBranchFinderState";
import {
  getProcessedBranches,
  getAvailableCountries,
  getAvailableCities,
  getBranchStats,
} from "@/lib/utils/branch";
import { calculateDistances } from "@/lib/utils/geo";
import { getCookie } from "@/lib/utils/cookie";

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
    setSortDistance,
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
    setSortDistance();
  };

  // Auto-locate if previously allowed via Consent Banner (Cookie based)
  useEffect(() => {
    const consent = getCookie("branch_finder_consent");
    if (consent === "allowed") {
      handleLocate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      {/* ── Hero Section ── */}
      <section className="flex-none bg-linear-to-br from-midnight to-deep-teal text-center relative overflow-hidden cta-radial">
        <div className="absolute inset-0 bg-linear-to-br from-deep-teal/85 via-midnight/70 to-deep-teal/80" />
        <div className="absolute inset-0 [background:radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.45)_100%)]" />

        <div className="relative w-full max-w-310 mx-auto text-center px-4 md:px-6 pt-52 pb-28">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="flex items-center justify-center gap-3 mb-4"
            >
              <span className="h-px w-7 bg-gold/40" />
              <span className="text-[0.85rem] font-semibold text-white uppercase tracking-[0.16em]">
                Find Your Branch
              </span>
              <span className="h-px w-7 bg-gold/40" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-[clamp(2.5rem,5vw,4rem)] font-bold text-warm-white leading-[1.15] mb-8 font-playfair"
            >
              Banking, <span className="text-gold italic">Close to home</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-warm-white/50 font-light text-[1.15rem] max-w-2xl mx-auto mb-10 leading-relaxed"
            >
              Locate your nearest Brightstream branch from over{" "}
              {stats.total > 0 ? stats.total.toLocaleString() : "1,000"}{" "}
              locations across{" "}
              {stats.countries > 0 ? stats.countries : "multiple"} countries.
            </motion.p>
          </div>

          <div className="w-full">
            <SearchBar
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
              onSearch={applySearch}
              onLocate={handleLocate}
              onClear={clearAll}
              hasFilters={hasFilters}
              locating={locating}
            />
          </div>
        </div>

        {/* Stats Ribbon */}
        <div className="relative border-t border-gold/15 bg-navy/60">
          <div className="flex justify-center gap-12 md:gap-16 py-8 px-6">
            {[
              { num: stats.total || "—", label: "Branches Worldwide" },
              { num: stats.countries || "—", label: "Countries" },
              { num: "24/7", label: "Digital Support" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-xl md:text-2xl font-bold text-gold font-playfair">
                  {typeof s.num === "number" ? s.num.toLocaleString() : s.num}
                </div>
                <div className="text-[0.85rem] text-warm-white/40 uppercase tracking-widest mt-0.5">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

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
