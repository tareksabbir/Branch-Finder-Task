// lib/types.ts

export interface Branch {
  id: string;
  name: string;
  street: string;
  city: string;
  country: string;
  countryCode: string;
  zipCode: string;
  phone: string;
  email: string;
  coordinates: string;
  lat: number;
  lng: number;
  distance?: number; // km, calculated client-side
}

export interface BranchApiItem {
  Name: string;
  Street: string;
  City: string;
  Country: string;
  CountryCode: string;
  ZipCode: string;
  Phone: string;
  Email: string;
  Coordinates: string;
}

export interface BranchApiResponse {
  data: {
    Branch: {
      total: number;
      items: BranchApiItem[];
    };
  };
}

export type FilterType = "all" | "us" | "international";
export type SortType = "distance" | "name" | "country";

export interface GeoLocation {
  lat: number;
  lng: number;
}

export interface ActiveFilters {
  branchName: string;
  city: string;
  country: string;
  zipCode: string;
  type: FilterType;
}

export interface State {
  inputs: {
    branchName: string;
    city: string;
    country: string;
    zipCode: string;
  };
  activeFilters: ActiveFilters;
  sort: SortType;
  selectedBranch: Branch | null;
}

export type Action =
  | { type: "SET_INPUT"; field: keyof State["inputs"]; value: string }
  | { type: "APPLY_SEARCH" }
  | { type: "CLEAR_ALL" }
  | { type: "SET_FILTER_TYPE"; payload: FilterType }
  | { type: "SET_SORT"; payload: SortType }
  | { type: "SELECT_BRANCH"; payload: Branch | null };

export interface UseGeolocationReturn {
  location: GeoLocation | null;
  loading: boolean;
  error: string | null;
  getLocation: () => void;
  clearLocation: () => void;
}