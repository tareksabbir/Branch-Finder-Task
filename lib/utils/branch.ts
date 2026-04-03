import { Branch, BranchApiItem, ActiveFilters, SortType } from "../types";
import { parseCoordinates } from "./geo";

/** Map raw API item → clean Branch object */
export function mapApiBranch(item: BranchApiItem, index: number): Branch {
  const { lat, lng } = parseCoordinates(item.Coordinates ?? "");
  return {
    id: `branch-${index}-${(item.Name ?? "unknown").replace(/\s+/g, "-").toLowerCase()}`,
    name: item.Name ?? "Unknown Branch",
    street: item.Street ?? "",
    city: item.City ?? "",
    country: item.Country ?? "",
    countryCode: item.CountryCode ?? "",
    zipCode: item.ZipCode ?? "",
    phone: item.Phone ?? "",
    email: item.Email ?? "",
    coordinates: item.Coordinates ?? "",
    lat,
    lng,
  };
}

/**
 * Filters and sorts branches based on active filters and sort type.
 * Assumes branches array already contains calculated distances if applicable.
 */
export function getProcessedBranches(
  branches: Branch[],
  filters: ActiveFilters,
  sort: SortType
): Branch[] {
  let list = branches.slice(); // Copy to avoid mutating original

  // 1. Filtering
  if (filters.branchName) {
    const query = filters.branchName.toLowerCase();
    list = list.filter((b) => b.name.toLowerCase().includes(query));
  }

  if (filters.city) {
    const query = filters.city.toLowerCase();
    list = list.filter((b) => b.city.toLowerCase() === query);
  }

  if (filters.country) {
    list = list.filter((b) => b.country === filters.country);
  }

  if (filters.zipCode) {
    const query = filters.zipCode.toLowerCase();
    list = list.filter((b) => b.zipCode.toLowerCase().includes(query));
  }

  if (filters.type === "us") {
    list = list.filter((b) => b.countryCode === "US");
  } else if (filters.type === "international") {
    list = list.filter((b) => b.countryCode !== "US");
  }

  // 2. Sorting
  if (sort === "distance") {
    list.sort((a, b) => (a.distance ?? Infinity) - (b.distance ?? Infinity));
  } else if (sort === "name") {
    list.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sort === "country") {
    list.sort(
      (a, b) =>
        a.country.localeCompare(b.country) || a.name.localeCompare(b.name)
    );
  }

  return list;
}

/** Get a unique sorted list of available countries from branches */
export function getAvailableCountries(branches: Branch[]): string[] {
  return Array.from(new Set(branches.map((b) => b.country))).sort();
}

/** Get a unique sorted list of available cities from branches */
export function getAvailableCities(branches: Branch[]): string[] {
  return Array.from(new Set(branches.map((b) => b.city))).sort();
}

/** Calculate summary stats for branches */
export function getBranchStats(branches: Branch[]): { total: number; countries: number } {
  return {
    total: branches.length,
    countries: new Set(branches.map((b) => b.country)).size,
  };
}
