/* eslint-disable react-hooks/exhaustive-deps */
// hooks/useBranchFinderState.ts
import { useReducer, useMemo, useCallback } from "react";
import { Branch, FilterType, SortType, State, Action } from "@/lib/types";

// --- Initial State ---
const initialState: State = {
  inputs: {
    branchName: "",
    city: "",
    country: "",
    zipCode: "",
  },
  activeFilters: {
    branchName: "",
    city: "",
    country: "",
    zipCode: "",
    type: "all",
  },
  sort: "name",
  selectedBranch: null,
};

// --- Reducer Function ---
function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_INPUT":
      return {
        ...state,
        inputs: { ...state.inputs, [action.field]: action.value },
      };
    case "APPLY_SEARCH":
      return {
        ...state,
        activeFilters: {
          ...state.activeFilters,
          branchName: state.inputs.branchName,
          city: state.inputs.city,
          country: state.inputs.country,
          zipCode: state.inputs.zipCode,
        },
      };
    case "CLEAR_ALL":
      return initialState;
    case "SET_FILTER_TYPE":
      return {
        ...state,
        activeFilters: { ...state.activeFilters, type: action.payload },
      };
    case "SET_SORT":
      return { ...state, sort: action.payload };
    case "SELECT_BRANCH":
      return { ...state, selectedBranch: action.payload };
    default:
      return state;
  }
}

// --- The Custom Hook ---
export function useBranchFinderState() {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Helper functions to dispatch actions easily
  const setInput = useCallback((field: keyof State["inputs"], value: string) => {
    dispatch({ type: "SET_INPUT", field, value });
  }, []);

  const applySearch = useCallback(() => {
    dispatch({ type: "APPLY_SEARCH" });
  }, []);

  const clearAll = useCallback(() => {
    dispatch({ type: "CLEAR_ALL" });
  }, []);

  const setFilterType = useCallback((filter: FilterType) => {
    dispatch({ type: "SET_FILTER_TYPE", payload: filter });
  }, []);

  const setSort = useCallback((sort: SortType) => {
    dispatch({ type: "SET_SORT", payload: sort });
  }, []);


  const selectBranch = useCallback((branch: Branch | null) => {
    dispatch({ type: "SELECT_BRANCH", payload: branch });
  }, []);

  // Calculate if filters are active (for UI indication)
  // Only depends on filter-related state, not selectedBranch
  const hasFilters = useMemo(() => {
    const { inputs, activeFilters, sort } = state;
    return (
      Object.values(inputs).some(Boolean) ||
      Object.values(activeFilters).some((v) => v !== "" && v !== "all") ||
      sort !== "name"
    );
  }, [state.inputs, state.activeFilters, state.sort]);

  return {
    state,
    setInput,
    applySearch,
    clearAll,
    setFilterType,
    setSort,
    selectBranch,
    hasFilters,
  };
}
