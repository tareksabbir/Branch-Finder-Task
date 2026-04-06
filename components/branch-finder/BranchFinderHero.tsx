"use client";

import { motion } from "framer-motion";
import { SearchBar } from "./SearchBar";

interface BranchFinderHeroProps {
  totalBranches: number;
  totalCountries: number;
  branchName: string;
  onBranchNameChange: (val: string) => void;
  city: string;
  onCityChange: (val: string) => void;
  availableCities: string[];
  country: string;
  onCountryChange: (val: string) => void;
  zipCode: string;
  onZipCodeChange: (val: string) => void;
  availableCountries: string[];
  onLocate: () => void;
  onClear: () => void;
  hasFilters: boolean;
  locating: boolean;
}

import { BranchStatsRibbon } from "./BranchStatsRibbon";

export function BranchFinderHero({
  totalBranches,
  totalCountries,
  branchName,
  onBranchNameChange,
  city,
  onCityChange,
  availableCities,
  country,
  onCountryChange,
  zipCode,
  onZipCodeChange,
  availableCountries,
  onLocate,
  onClear,
  hasFilters,
  locating,
}: BranchFinderHeroProps) {
  return (
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
            {totalBranches > 0 ? totalBranches.toLocaleString() : "1,000"}{" "}
            locations across {totalCountries > 0 ? totalCountries : "multiple"}{" "}
            countries.
          </motion.p>
        </div>

        <div className="w-full">
          <SearchBar
            branchName={branchName}
            onBranchNameChange={onBranchNameChange}
            city={city}
            onCityChange={onCityChange}
            availableCities={availableCities}
            country={country}
            onCountryChange={onCountryChange}
            zipCode={zipCode}
            onZipCodeChange={onZipCodeChange}
            availableCountries={availableCountries}
            onLocate={onLocate}
            onClear={onClear}
            hasFilters={hasFilters}
            locating={locating}
          />
        </div>
      </div>

      <BranchStatsRibbon total={totalBranches} countries={totalCountries} />
    </section>
  );
}
