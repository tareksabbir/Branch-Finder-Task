// components/branch-finder/SearchBar.tsx
"use client";

import { motion } from "framer-motion";
import { Search, LocateFixed, ChevronDown, MapPin } from "lucide-react";
import Button from "@/components/ui/Button";

interface SearchBarProps {
  branchName: string;
  onBranchNameChange: (v: string) => void;
  city: string;
  onCityChange: (v: string) => void;
  availableCities: string[];
  country: string;
  onCountryChange: (v: string) => void;
  zipCode: string;
  onZipCodeChange: (v: string) => void;
  availableCountries: string[];
  onSearch: () => void;
  onLocate: () => void;
  onClear: () => void;
  hasFilters: boolean;
  locating: boolean;
}

export function SearchBar({
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
  onSearch,
  onLocate,
  onClear,
  hasFilters,
  locating,
}: SearchBarProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="flex flex-col lg:flex-row items-center gap-3 lg:gap-0 bg-warm-white lg:rounded-full rounded-2xl shadow-xl border border-slate/20 p-3 lg:pl-5 lg:pr-2 lg:py-2 max-w-[1100px] mx-auto"
    >
      {/* Branch Name */}
      <div className="w-full flex-1 flex items-center bg-white lg:bg-transparent rounded-xl lg:rounded-none px-4 py-2.5 lg:p-0 border lg:border-none border-slate/20">
        <Search className="text-gold flex-shrink-0 w-5 h-5 mr-3" strokeWidth={2} />
        <input
          type="text"
          value={branchName}
          onChange={(e) => onBranchNameChange(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onSearch()}
          placeholder="Branch name..."
          className="w-full bg-transparent outline-none text-[1.05rem] text-midnight placeholder:text-slate/50 font-medium"
        />
      </div>

      <div className="hidden lg:block w-[1px] h-10 bg-slate/20 mx-3 flex-shrink-0" />

      {/* City Select */}
      <div className="w-full lg:w-[150px] flex items-center relative bg-white lg:bg-transparent rounded-xl lg:rounded-none px-4 py-2.5 lg:p-0 border lg:border-none border-slate/20">
        <MapPin className="text-slate/50 flex-shrink-0 w-5 h-5 mr-3 lg:hidden" strokeWidth={2} />
        <select
          value={city}
          onChange={(e) => onCityChange(e.target.value)}
          className="w-full bg-transparent outline-none text-[1.05rem] text-midnight font-medium appearance-none cursor-pointer pr-6"
        >
          <option value="">Select City</option>
          {availableCities.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <ChevronDown className="w-4 h-4 absolute right-4 lg:right-0 text-slate pointer-events-none" />
      </div>

      <div className="hidden lg:block w-[1px] h-10 bg-slate/20 mx-3 flex-shrink-0" />

      {/* Country Select */}
      <div className="w-full lg:w-[190px] flex items-center relative bg-white lg:bg-transparent rounded-xl lg:rounded-none px-4 py-2.5 lg:p-0 border lg:border-none border-slate/20">
        <MapPin className="text-slate/50 flex-shrink-0 w-5 h-5 mr-3 lg:hidden" strokeWidth={2} />
        <select
          value={country}
          onChange={(e) => onCountryChange(e.target.value)}
          className="w-full bg-transparent outline-none text-[1.05rem] text-midnight font-medium appearance-none cursor-pointer pr-6"
        >
          <option value="">Select Country</option>
          {availableCountries.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <ChevronDown className="w-4 h-4 absolute right-4 lg:right-0 text-slate pointer-events-none" />
      </div>

      <div className="hidden lg:block w-[1px] h-10 bg-slate/20 mx-3 flex-shrink-0" />

      {/* Zip Code */}
      <div className="w-full lg:w-[110px] flex items-center bg-white lg:bg-transparent rounded-xl lg:rounded-none px-4 py-2.5 lg:p-0 border lg:border-none border-slate/20">
        <input
          type="text"
          value={zipCode}
          onChange={(e) => onZipCodeChange(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onSearch()}
          placeholder="Zip code"
          className="w-full bg-transparent outline-none text-[1.05rem] text-midnight placeholder:text-slate/50 font-medium"
        />
      </div>

      {/* Actions */}
      <div className="flex w-full lg:w-auto items-center gap-2 lg:ml-3 lg:pl-1">
        {hasFilters && (
          <Button
            variant="link"
            size="sm"
            onClick={onClear}
            className="text-slate hover:text-midnight whitespace-nowrap px-2"
          >
            Clear
          </Button>
        )}

        <Button
          onClick={onLocate}
          disabled={locating}
          variant="secondary"
          size="md"
          className="bg-gold/15 hover:bg-gold/20 flex-1 lg:flex-none"
          title="Near Me"
          leftIcon={!locating && <LocateFixed className="w-[16px] h-[16px]" strokeWidth={2.5} />}
          isLoading={locating}
        >
          <span className="lg:hidden xl:inline">Near me</span>
        </Button>

        <Button
          onClick={onSearch}
          variant="midnight"
          size="md"
          className="flex-1 lg:flex-none px-8"
        >
          Search
        </Button>
      </div>
    </motion.div>
  );
}
