# 🏦 Brightstream Branch Finder

> A premium, production-grade branch locator for Brightstream Bank — enabling customers to instantly find the nearest branch from **1,000+ worldwide locations** with zero-latency search, real-time GPS proximity sorting, an interactive map experience, and intelligent client-side caching.

<div align="center">

[![Next.js](https://img.shields.io/badge/Next.js-16.2.2-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.4-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.x-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-000000?style=for-the-badge&logo=vercel)](https://branch-finder-rho.vercel.app)

</div>

---

## 📋 Table of Contents

- [Live Demo & Preview](#-live-demo--preview)
- [Key Features](#-key-features)
- [Tech Stack](#️-tech-stack)
- [Architecture Overview](#️-architecture-overview)
- [System Design: End-to-End Data Flow](#-system-design-end-to-end-data-flow)
- [Folder Structure](#-folder-structure)
- [Core Design Decisions](#-core-design-decisions)
- [State Management Deep Dive](#-state-management-deep-dive)
- [Performance Optimizations](#-performance-optimizations)
- [Why Offset Pagination Over Cursors](#-why-offset-pagination-over-cursors)
- [Location Consent System](#-location-consent-system)
- [Local Setup](#-local-setup)
- [Environment Variables](#-environment-variables)
- [Available Scripts](#-available-scripts)

---

## 🌐 Live Demo & Preview

**[→ View Deployed App on Vercel](https://branch-finder-rho.vercel.app)**

📹 **[Watch Video Walkthrough on Loom](https://www.loom.com/share/1cddebc7bbd8433ca5ae3662da848461)**

[![Branch Finder Demo](https://cdn.loom.com/sessions/thumbnails/1cddebc7bbd8433ca5ae3662da848461-3e59b882677b3fc3-full-play.gif#t=0.1)](https://www.loom.com/share/1cddebc7bbd8433ca5ae3662da848461)

![Screenshot](public/SS1.png)

---

## ✨ Key Features

| Feature | Description |
|---|---|
| ⚡ **Zero-Latency Search** | Intelligent client-side filtering of 1,000+ records — results update instantly as you type with 0ms network delay |
| 📍 **GPS Proximity Sorting** | Real-time distance calculation using the Haversine formula to rank and display the closest branches |
| 🔗 **Smart Linked Filtering** | Country and City dropdowns are bidirectionally linked — selecting one automatically updates the other for an intuitive search flow |
| 🗺️ **Interactive Map** | Google Maps integration using modern `AdvancedMarkerElement` with fully custom, brand-aligned HTML pins and strict TypeScript support |
| 🔄 **Parallel Data Loading** | High-speed GraphQL pagination — fetches all data simultaneously using concurrent `Promise.all` requests |
| 🛡️ **BFF Architecture** | Next.js API Routes proxy GraphQL requests, hiding API tokens from the browser network tab |
| 🖱️ **Virtualized List** | Uses `@tanstack/react-virtual` for intelligent windowed rendering, ensuring silky-smooth performance and low DOM overhead on large datasets |
| 🍪 **Location Persistence** | Smart consent system with native permissions intercept and highly resilient Cookie + LocalStorage hybrid storage |
| 🎨 **Premium Animations** | Framer Motion powered page transitions, staggered card reveals, and spring-physics detail panels |
| 🔁 **Retry & Resilience** | Exponential backoff retry logic with `AbortSignal` support on all GraphQL requests |

---

## 🛠️ Tech Stack

### Core Framework

| Package | Version | Why This Was Chosen |
|---|---|---|
| `next` | 16.2.2 | App Router with React Server Components; built-in routing for `/branch`, `/articles`, `/about`; `next/font` for zero-layout-shift font loading |
| `react` / `react-dom` | 19.2.4 | Latest React with concurrent features; client components are used only where interactivity is genuinely required |
| `typescript` | ^5 | Strict type safety across the entire codebase — every API response, state shape, and component prop is fully typed |

### Data Fetching & Caching

| Package | Version | Why This Was Chosen |
|---|---|---|
| `@tanstack/react-query` | ^5.96.1 | Chosen over `fetch` or SWR for its powerful caching (`staleTime`, `gcTime`), built-in `AbortSignal` support, and background refetch control. Branch data is cached for **1 hour in memory** and **2 hours before garbage collection** — navigating away and back never triggers a re-fetch |

### Mapping

| Package | Version | Why This Was Chosen |
|---|---|---|
| `@types/google.maps` | ^3.58.1 | Type definitions for the Google Maps JS API (loaded via script tag). Uses `AdvancedMarkerElement` (the modern Maps API) with fully custom HTML pins instead of the deprecated `Marker` class |

### Animations & UI

| Package | Version | Why This Was Chosen |
|---|---|---|
| `framer-motion` | ^12.38.0 | Powers page-enter animations, search bar slide-ins, staggered card appearances, and `AnimatePresence`-driven exit transitions. Preferred over CSS-only for its spring physics and mount/unmount lifecycle control |
| `lucide-react` | ^1.7.0 | Consistent, lightweight, tree-shakeable SVG icon set — only icons that are actually imported are bundled |

### Styling

| Package | Version | Why This Was Chosen |
|---|---|---|
| `tailwindcss` | ^4 | Utility-first CSS with a custom `@theme` block defining Brightstream brand tokens (`--color-midnight`, `--color-gold`, `--font-playfair`, etc.). Custom utilities like `.no-scrollbar` are declared with `@utility` |
| `@tailwindcss/postcss` | ^4 | Tailwind v4's modern PostCSS plugin — replaces the legacy `tailwind.config.js` approach entirely |

---

## 🏗️ Architecture Overview

The application follows a clean, three-layer architecture:

```
┌─────────────────────────────────────────────────────┐
│                   UI Layer (Components)              │
│  BranchFinder → Map, List, Hero, ConsentBanner      │
├─────────────────────────────────────────────────────┤
│                 Logic Layer (Hooks)                  │
│  useBranches · useBranchFinderState · useGeolocation │
├─────────────────────────────────────────────────────┤
│               Pure Utility Layer (lib/)              │
│    api.ts · branch.ts · geo.ts · cookie.ts          │
└─────────────────────────────────────────────────────┘
```

**Key principle:** Components receive data and dispatch events — they have no knowledge of *how* data is fetched or *how* state is stored. All fetch logic lives in hooks; all business logic lives in `lib/`.

---

## 🔬 System Design: End-to-End Data Flow

This section walks through exactly what happens from the moment a user opens the Branch Finder page to when results appear on screen — step by step.

---

### Step 1 — App Bootstrap (Next.js Root Layout)

```
browser request
  └─▶ app/layout.tsx
        ├─ loads Playfair Display + Jost fonts via next/font (zero layout shift)
        ├─ wraps everything in <Providers> (TanStack QueryClientProvider)
        │     └─ QueryClient config: retry: 2, refetchOnWindowFocus: false
        ├─ renders <Navbar />
        ├─ renders {children}  ← the active route's page component
        └─ renders <Footer />
```

The `QueryClient` is instantiated inside a `useState` call so it is created **once per client session** and never replaced across re-renders.

---

### Step 2 — Data Fetching Pipeline (`useBranches` → `lib/api.ts`)

When `BranchFinder.tsx` mounts, it calls `useBranches()`, which registers a TanStack Query job:

```
useBranches()
  └─▶ TanStack Query checks cache ["branches"]
        ├─ HIT (within 1hr staleTime) → returns cached data immediately, no network
        └─ MISS → calls fetchAllBranches(signal)
                    ├─ Scout request: gqlFetch({ limit: 100, skip: 0 })
                    │     └─ discovers total (e.g. 1,247 branches)
                    │     └─ fetches first 100 items
                    │
                    ├─ pageCount = Math.ceil((1247 - 100) / 100) = 12 more pages
                    │
                    └─ Promise.all([
                         gqlFetch({ limit:100, skip:100 }),
                         gqlFetch({ limit:100, skip:200 }),
                         ...12 requests in parallel
                       ])
                         └─ all pages resolve → items flattened → mapped via mapApiBranch()
                               └─ BranchApiItem (PascalCase) → Branch (camelCase, with lat/lng)
                               └─ cached for 1hr staleTime / 2hr gcTime
```

**Why no sequential cursor chain?** All offsets are known after the scout request. Parallel fetching reduces total load time from `N × RTT` to `~1 RTT` regardless of page count.

**Backend-For-Frontend (BFF) Proxy:** All requests are routed through an internal Next.js API route (`/api/graphql`) rather than hitting Optimizely Graph directly from the browser. This hides the endpoint URL and Auth Token on the server-side, securing credentials from being bundled into client JavaScript.

---

### Step 3 — State Initialization (`useBranchFinderState`)

`BranchFinder.tsx` simultaneously initializes the UI state machine:

```
useBranchFinderState()
  └─▶ useReducer(reducer, initialState)
        initialState = {
          inputs:        { branchName:"", city:"", country:"", zipCode:"" },
          activeFilters: { branchName:"", city:"", country:"", zipCode:"", type:"all" },
          sort:          "name",
          selectedBranch: null
        }
  └─▶ returns: { state, setInput, applySearch, clearAll,
                  setFilterType, setSort, selectBranch, hasFilters }
```

All dispatcher functions are wrapped in `useCallback([])` — they are **referentially stable** across every render, which prevents child components from re-rendering when the parent re-renders.

---

### Step 4 — Consent Check & Auto-Locate on Mount

```
BranchFinder useEffect (runs once on mount)
  └─ getCookie("branch_finder_consent")
       ├─ "allowed" → handleLocate() called immediately
       │    └─ useGeolocation.getLocation() → navigator.geolocation.getCurrentPosition()
       │    └─ setSort("distance")  ← auto-switch sort to distance
       └─ null/"denied" → ConsentBanner renders (slide-in animation)
```

---

### Step 5 — Derived Data Computation (`useMemo` pipeline)

Once `allBranches` is populated from cache, a chain of `useMemo` calls computes derived data:

```
allBranches (from cache)
  │
  ├─▶ [memo] getAvailableCountries(allBranches)  → string[]   (runs once)
  ├─▶ [memo] getAvailableCities(allBranches)      → string[]   (runs once)
  ├─▶ [memo] getCityCountryMap(allBranches)       → { cityToCountry, countryToCities } (runs once)
  ├─▶ [memo] getBranchStats(allBranches)          → { total, countries } (runs once)
  │
  ├─▶ [memo] calculateDistances(allBranches, location)  → Branch[] with .distance
  │          ^ re-runs ONLY when GPS location changes
  │
  └─▶ [memo] getProcessedBranches(branchesWithDistance, activeFilters, sort)
             ^ re-runs on every filter/sort change (cheap — no math, just filter+sort)
               └─ applies: branchName, city, country, zipCode, type filters
               └─ sorts by: name | distance | country
               └─▶ displayBranches  (what the list renders)

  └─▶ [memo] mapBranches (capped to 100 if no active filters, to protect Google Maps)
             ^ displayBranches.slice(0, 100) when hasFilters === false
```

**Key insight:** Distance calculation (expensive — runs Haversine across 1,000+ items) is memoized separately from filtering (cheap). Typing in the search box never re-triggers the Haversine loop.

---

### Step 6 — Debounced Search Trigger

```
user types in SearchBar
  └─▶ setInput(field, value)  → reducer: SET_INPUT action
        └─▶ state.inputs updated (inputs ≠ activeFilters yet)
              └─▶ useEffect watching [state.inputs] fires
                    └─▶ setTimeout(applySearch, 400ms)
                          └─▶ reducer: APPLY_SEARCH action
                                └─▶ activeFilters ← copied from current inputs
                                      └─▶ getProcessedBranches() re-runs
                                            └─▶ list and map update
```

400ms debounce balances responsiveness with avoiding unnecessary re-renders on every keystroke.

---

### Step 7 — Smart Linked Filter (City ↔ Country)

```
user selects a CITY
  └─▶ handleCityChange(city)
        ├─ setInput("city", city)
        └─ cityToCountry.get(city) → mapped country
             └─ setInput("country", mappedCountry)  ← auto-fills country

user selects a COUNTRY
  └─▶ handleCountryChange(country)
        ├─ setInput("country", country)
        └─ if current city ∉ that country's cities:
             └─ setInput("city", "")  ← clears invalid city

availableCities list:
  └─▶ [memo] if country selected → countryToCities.get(country) (filtered)
             else                → allCities (full list)
```

---

### Step 8 — Component Prop Wiring

```
BranchFinder.tsx  (orchestrator — owns all state and derived data)
  │
  ├─▶ <BranchFinderHero>
  │     Props: totalBranches, totalCountries, branchName, city, country, zipCode,
  │            availableCities, availableCountries, hasFilters, locating
  │     Events: onBranchNameChange, onCityChange, onCountryChange,
  │             onZipCodeChange, onLocate, onClear
  │       └─▶ <SearchBar>         search fields + near-me button
  │       └─▶ <BranchStatsRibbon> animated total + countries display
  │
  ├─▶ <MapView>
  │     Props: branches (capped), selectedBranch, userLocation, apiKey
  │     Events: onSelectBranch, onCloseDetail
  │       └─▶ <BranchDetailPanel>  slide-in overlay (conditional render)
  │
  ├─▶ <BranchList>
  │     Props: branches (full filtered), isLoading, isError, activeFilter,
  │            activeSort, selectedId
  │     Events: onFilterChange, onSortChange, onSelect
  │       └─▶ <BranchListHeader>  sort + filter controls
  │       └─▶ <BranchListStatus>  loading / error / empty states
  │       └─▶ <BranchCard> ×N    (only visible ones — react-virtual)
  │
  └─▶ <ConsentBanner>
        Events: onAllow → triggers handleLocate()
```

---

### Step 9 — MapView Lifecycle (Google Maps)

```
<MapView> mounts
  └─▶ checks: window.google?.maps?.marker already loaded?
        ├─ YES → initMap() immediately
        └─ NO  → injects <script> tag dynamically with callback=initGoogleMaps
                   └─▶ window.initGoogleMaps = initMap (global callback)
                          └─▶ Google Maps SDK loads → calls initMap()

initMap()
  └─▶ new google.maps.Map(mapRef.current, { mapId, zoom:5, center: USA })
  └─▶ ResizeObserver attached → triggers map "resize" event on container resize
  └─▶ renderMarkers() called

renderMarkers()  (called when branch list changes)
  └─▶ clears all existing AdvancedMarkerElement instances (.map = null)
  └─▶ creates new AdvancedMarkerElement for each branch
        └─▶ content: createBranchPin(isSelected) — custom HTML div element
        └─▶ gmp-click listener → onSelectBranch(branch)

branch selected (selectedBranch prop changes)
  └─▶ lightweight pin swap (NO full re-render):
        ├─ prev marker: createBranchPin(false) → deselected style
        └─ next marker: createBranchPin(true)  → selected style (gold, larger)
        └─ mapInstance.moveCamera({ center, zoom: 14 }) → smooth pan + zoom

user location changes
  └─▶ old userMarkerRef.current?.map = null (remove)
  └─▶ new AdvancedMarkerElement at userLocation with createUserPin()
  └─▶ mapInstance.panTo(userLocation) + setZoom(10)
```

---

### Step 10 — React Render Optimization Summary

| Technique | Where Applied | Effect |
|---|---|---|
| `React.memo` + custom comparator | `BranchCard` | Only re-renders when id, distance, isActive, or onSelect changes |
| `useCallback([])` | All dispatch wrappers in `useBranchFinderState` | Stable references → memo'd children don't re-render |
| `useMemo` — distance layer | `branchesWithDistance` | Haversine runs only on GPS change, not on every keystroke |
| `useMemo` — filter layer | `displayBranches` | Filtering runs on filter change, skips expensive distance math |
| `useMemo` — map cap | `mapBranches` | Google Maps never receives >100 markers without active filter |
| `useVirtualizer` | `BranchList` | DOM always contains only ~10–15 visible cards regardless of total |
| In-place pin swap | `MapView` | Selection never triggers full marker re-render — just 2 DOM mutations |
| `AbortSignal` | `fetchAllBranches` | Route change cancels in-flight GraphQL requests automatically |

---

## 📁 Folder Structure

```text
📦 brightstream-branch-finder
 ┣ 📂 app/                          # Next.js App Router pages
 ┃ ┣ 📂 branch/                     # /branch — Branch Finder page
 ┃ ┣ 📂 articles/                   # /articles route
 ┃ ┣ 📂 about/                      # /about route
 ┃ ┣ 📂 personal/ business/ wealth/ # Product vertical pages
 ┃ ┣ 📜 layout.tsx                  # Root layout: Navbar + Footer wrapping all pages
 ┃ ┣ 📜 page.tsx                    # Homepage
 ┃ ┣ 📜 providers.tsx               # React Query client provider (client boundary)
 ┃ └ 📜 globals.css                 # Brand design tokens + base styles
 ┃
 ┣ 📂 components/
 ┃ ┣ 📂 branch-finder/              # Domain-specific components (self-contained feature folder)
 ┃ ┃ ┣ 📜 BranchFinder.tsx          # Orchestrator: wires hooks, state, and all subcomponents
 ┃ ┃ ┣ 📜 BranchFinderHero.tsx      # Hero section with animated stats and headline
 ┃ ┃ ┣ 📜 SearchBar.tsx             # Multi-field auto-search UI
 ┃ ┃ ┣ 📜 BranchList.tsx            # Virtualized scrollable list using @tanstack/react-virtual
 ┃ ┃ ┣ 📜 BranchListHeader.tsx      # Sort controls and result count header
 ┃ ┃ ┣ 📜 BranchListStatus.tsx      # Loading, Error, and Empty state displays
 ┃ ┃ ┣ 📜 BranchCard.tsx            # Single branch card with distance badge (React.memo optimized)
 ┃ ┃ ┣ 📜 FilterChips.tsx           # Category and Region toggle buttons
 ┃ ┃ ┣ 📜 MapView.tsx               # Google Maps integration and marker lifecycle
 ┃ ┃ ┣ 📜 BranchDetailPanel.tsx     # Animated slide-in overlay for branch details
 ┃ ┃ ┣ 📜 BranchStatsRibbon.tsx     # Animated stats ribbon (Total Branches, Countries covered)
 ┃ ┃ └ 📜 ConsentBanner.tsx         # Location and cookie consent UI with persistence
 ┃ ┃
 ┃ ┣ 📂 ui/                         # Generic design system primitives (no domain knowledge)
 ┃ ┃ ┣ 📜 Button.tsx                # Multi-variant button component
 ┃ ┃ ┣ 📜 Card.tsx                  # Framer Motion-enabled card wrapper
 ┃ ┃ ┣ 📜 Badge.tsx                 # Pill-style status indicators
 ┃ ┃ └ 📜 Spinner.tsx               # Brand-aligned loading indicators
 ┃ ┃
 ┃ ┣ 📂 layout/                     # Site-wide shell components
 ┃ ┃ ┣ 📜 navbar.tsx                # Animated navigation with responsive mobile menu
 ┃ ┃ └ 📜 footer.tsx                # Global footer
 ┃ ┃
 ┃ ┗ 📂 home/ articles/ about/      # Page-specific section components
 ┃   📂 personal/ business/ wealth/ # Vertical-specific components
 ┃
 ┣ 📂 hooks/                        # Stateful React logic layer
 ┃ ┣ 📜 useBranches.ts              # Data fetching and 1-hour caching via TanStack Query
 ┃ ┣ 📜 useBranchFinderState.ts     # Centralized UI state management via useReducer
 ┃ └ 📜 useGeolocation.ts           # Browser GPS integration with consent awareness
 ┃
 ┣ 📂 lib/                          # Pure logic layer — zero React dependencies
 ┃ ┣ 📜 api.ts                      # GraphQL client with retry, pagination, AbortSignal support
 ┃ ┣ 📜 types.ts                    # Global TypeScript type definitions
 ┃ └ 📂 utils/
 ┃   ┣ 📜 branch.ts                 # Domain logic: API mapping, filtering, sorting
 ┃   ┣ 📜 geo.ts                    # Math utilities: Haversine formula, distance formatting
 ┃   ┣ 📜 cookie.ts                 # Lightweight persistent preference manager
 ┃   ┣ 📜 map.ts                    # Google Maps helpers: custom HTML pin factories for branch and user location markers
 ┃   └ 📜 common.ts                 # Generic helpers: cn() classNames utility
```

### Why This Structure?

**Feature folders** (`branch-finder/`) group all components for a single domain concern. Deleting the Branch Finder feature means deleting one folder — nothing else bleeds out.

**`ui/` for primitives** — generic components with no knowledge of "branches" live separately so they can be composed anywhere (articles page, home page, etc.) without coupling.

**`hooks/`** keeps stateful React logic entirely out of components. Components are dumb — they receive data and dispatch events.

**`lib/`** contains zero React. It's pure TypeScript, making these functions trivially testable, safely importable server-side, and free of accidental client-side dependencies.

---

## 💡 Core Design Decisions

### 1. Fetch Everything Once, Filter Client-Side (Zero-Latency)

The app uses a **fetch-once, search-everywhere** strategy. On initial load, `useBranches` fetches all 1,000+ branch records via TanStack Query, normalizes them, and caches the result for 1 hour.

```
Initial Load:  ~1.2MB JSON transferred once
All searches:  0ms — pure in-memory filtering, no network
```

**Trade-off:** Slightly larger initial payload.  
**Benefit:** Every search, filter, and sort operation is instantaneous — results appear as you type, with no loading spinners, no debounce delays, no round-trips.

---

### 2. Parallel GraphQL Pagination with Scout + Resilience

Optimizely Graph enforces a 100-item page limit. Instead of sequential fetching, the app fires all page requests simultaneously with `Promise.all` after a single scout request determines the `total`.

> For the full data fetching flow with code diagrams, see [System Design Step 2](#step-2--data-fetching-pipeline-usebranches--libapits).

```typescript
// Sequential: N pages × 300ms = seconds | Parallel: always ~300ms
const pages = await Promise.all(pageRequests);
```

---

### 3. High-Performance Virtualized List Rendering

Rendering 1,000+ DOM nodes simultaneously would freeze any device. Previously, this was solved via an infinite scrolling chunker, but it still meant the DOM node count strictly grew as the user scrolled.

`BranchList.tsx` instead utilizes `@tanstack/react-virtual` for true "**windowed rendering**":

- Only the specific branch cards that are currently visible on the user's screen are actually rendered into the HTML DOM.
- As the user scrolls, cards that leave the viewport are instantly unmounted, freeing up memory.
- **Why this was chosen:** It guarantees an absolute <math>O(1)</math> memory architecture. The browser only ever paints a fixed amount of HTML regardless of whether the user scrolls through 10 or 1,000 locations, eliminating scroll-jank and preventing memory crashes on low-end mobile devices.

---

### 4. Decoupled Geospatial Processing

Haversine distance computation (runs across 1,000+ items) is memoized separately from filter/sort so that typing in the search box never re-triggers the expensive distance loop.

> For the full `useMemo` pipeline with dependency breakdown, see [System Design Step 5](#step-5--derived-data-computation-usememo-pipeline).

---

### 5. Smart Map Marker Capping

Rendering 1,000 `AdvancedMarkerElement` nodes simultaneously would freeze the Google Maps JavaScript bridge. The app intelligently handles this:

- **No active filter:** Display is capped to the **top 100 closest markers**
- **Filter applied:** The cap is lifted automatically, since the result set is naturally smaller

---

### 6. Why Offset Pagination Over Cursors

Optimizely Graph exposes both a cursor field and `skip`/`limit` offset parameters. This was a deliberate decision — **offset pagination was chosen over cursor-based pagination** for this architecture.

#### The Core Incompatibility: Cursors Are Sequential

Cursor-based pagination means each page's starting point depends on the *previous page's* response. Page 2's cursor only exists after page 1 has resolved. This forces a **sequential waterfall**:

```
// Cursor-based fetch-all — unavoidably sequential:
page1 = await fetch(cursor: null)
page2 = await fetch(cursor: page1.cursor)  // blocked until page1 finishes
page3 = await fetch(cursor: page2.cursor)  // blocked until page2 finishes
// N pages × ~300ms = seconds of serial waiting
```

Offset pagination, by contrast, makes all page positions **deterministically computable** from a single `total` count — no page depends on another:

```typescript
// Offset-based fetch-all — fully parallelisable:
const offsets = [100, 200, 300, ...]; // computed instantly from `total`
const pages = await Promise.all(
  offsets.map(skip => gqlFetch({ limit: 100, skip }))
);
// All pages in-flight simultaneously → fastest possible total time
```

#### Decision Matrix

| Concern | `skip`/`limit` (chosen) | Cursor-based |
|---|---|---|
| **Parallel fetching** | ✅ All pages fire simultaneously | ❌ Strictly sequential — each page blocks the next |
| **Fetch-all speed** | ✅ ~300ms regardless of page count | ❌ Grows linearly: N pages × RTT |
| **Random page access** | ✅ `skip = page × limit` — instant | ❌ Must replay every prior cursor to reach a page |
| **Data consistency** | ⚠️ Stable for rarely-changing data (branches) | ✅ Handles live-inserting datasets better |
| **Implementation complexity** | ✅ Simple, stateless, testable | ❌ Requires cursor state threaded between requests |

#### When Cursors Would Be the Right Choice

Cursor-based pagination is the correct tool when **lazy/incremental loading** is the goal — loading 20 items at a time as a user clicks "Load More", with live data that could shift between fetches. Since this app fetches *everything upfront once* and then filters entirely in-memory, cursors provide no benefit and impose a significant performance penalty.

> **Rule of thumb:** Use cursors for incremental UX (load-more, live feeds). Use offsets when you need parallel bulk fetching of a stable dataset.

---

## 🧠 State Management Deep Dive

### Why `useReducer` Instead of `useState`?

The Branch Finder manages **8 interconnected pieces of state**:

```typescript
{
  inputs: {
    branchName: string;
    city: string;
    country: string;
    zipCode: string;
  };
  activeFilters: {
    branchName: string;
    city: string;
    country: string;
    zipCode: string;
    type: "all" | "us" | "international"; // FilterType
  };
  sort: "name" | "distance" | "country";   // SortType
  selectedBranch: Branch | null;
}
```

Using plain `useState` for each would mean **8+ separate `useState` calls**, with filtering logic scattered across multiple `useEffect` calls watching each other — a classic recipe for sync bugs.

`useReducer` solves this cleanly:

| Problem | Solution |
|---|---|
| State sync bugs between fields | **Single source of truth** — one `state` object, one `dispatch` function |
| Hard to trace what changed | **Named actions** — `APPLY_SEARCH`, `CLEAR_ALL`, `SET_FILTER_TYPE` are self-documenting |
| Multiple re-renders per action | **Atomic updates** — `APPLY_SEARCH` copies all 4 inputs into `activeFilters` in one render cycle |
| Context provider complexity | **Not needed** — the entire state lives in `useBranchFinderState`, passed as stable props |

```typescript
// ❌ Before — 8 useState calls, sync bugs everywhere:
const [branchName, setBranchName] = useState("");
const [city, setCity] = useState("");
const [activeCity, setActiveCity] = useState(""); // which one is the "committed" value?
// ...and 5 more useState calls, each out of sync with the others

// ✅ After — one hook, zero sync issues:
const { state, setInput, applySearch, clearAll } = useBranchFinderState();
```

---

## ⚡ Performance Optimizations

### Component Tree & Render Isolation

`BranchFinder.tsx` orchestrates everything but the UI is split into isolated subtrees:

- `BranchFinderHero` owns search inputs — typing never re-renders the map
- `MapView` manages the Google Maps lifecycle independently from the list
- `BranchList` owns scroll and virtualizer state — isolated from parent re-renders
- `BranchCard` is wrapped in `React.memo` with a custom comparator — only re-renders when its own data changes

> For the full component prop wiring diagram see [System Design Step 8](#step-8--component-prop-wiring).  
> For the complete render optimization breakdown see [System Design Step 10](#step-10--react-render-optimization-summary).

---

## 🔧 Utility Layer Design

`lib/utils/` is split into **purpose-named files** rather than one monolithic `utils.ts`:

### `geo.ts` — Geography & Math

```typescript
parseCoordinates()    // "lat, lng" string → { lat, lng }
haversineDistance()   // Spherical earth distance formula
formatDistance()      // 0.3 → "300 m" | 12.5 → "12.5 km"
calculateDistances()  // Applies Haversine across the entire branch array
```

These are pure math functions — no knowledge of filters, components, or sorting. Isolated for independent testing and easy algorithm replacement.

### `branch.ts` — Branch Domain Logic

```typescript
mapApiBranch()          // BranchApiItem (PascalCase) → Branch (camelCase)
getProcessedBranches()  // Applies filters + sort to a branch array
getAvailableCountries() // Returns unique, sorted country list
getAvailableCities()    // Returns unique, sorted city list
getCityCountryMap()     // Builds bidirectional Map<city, country> and Map<country, city[]>
getBranchStats()        // { total, countries } for the hero stats ribbon
```

These functions know about the `Branch` type and business rules. They form the domain layer.

### `common.ts` — Generic Utilities

```typescript
cn()   // classNames helper (like clsx) — merges conditional class strings
```

Zero knowledge of branches or geography. Freely reusable across the entire project.

> **The rule:** A function lives in the file whose name describes *why it exists*, not *where it's currently used*.

---

## 📍 Location Consent System

A custom, non-intrusive location consent flow built to handle common mobile browser quirks (particularly iOS Safari's silent permission blocking without a user gesture).

### Why a Custom Solution?

1. **Reliable Permission Prompts** — iOS Safari only triggers native GPS prompts following a direct user gesture (a button click). Requesting location on page load silently fails.
2. **Context First** — Users see *why* GPS is needed (finding nearest branches) before being asked, which meaningfully improves permission acceptance rates.
3. **Smart Re-engagement** — If a user selects "Later", the choice is respected while the "Near me" button remains active for manual override at any time.

### Technical Implementation

**1. Native Permission Intercept**
The `useGeolocation.ts` hook actively queries the native `navigator.permissions` API. If the OS or browser has explicitly blocked location access, it intercepts the action and outputs a helpful error instructing the user to check settings, instead of failing silently.

**2. Storage Persistence**

```typescript
// lib/utils/cookie.ts — Hybrid Cookie + LocalStorage preference storage
// Uses localStorage as a bulletproof fallback if browsers block strict cookies locally
setCookie("branch_finder_consent", "allowed", 365);
getCookie("branch_finder_consent"); // → "allowed" | "denied" | null

// BranchFinder.tsx — automatic re-engagement for returning users
useEffect(() => {
  const consent = getCookie("branch_finder_consent");
  if (consent === "allowed") {
    handleLocate(); // Skip the banner entirely for returning users
  }
}, []);
```

The `ConsentBanner.tsx` uses Framer Motion for a smooth slide-in/out effect, with Brightstream Gold and Midnight brand colors for a premium, on-brand feel.

---

## 🚀 Local Setup

```bash
# 1. Clone the repository
git clone <your-repo-url>
cd brightstream-branch-finder

# 2. Install dependencies
npm install

# 3. Configure environment variables
cp .env.example .env.local
```

Edit `.env.local` with your credentials:

```env
# Required — Google Maps JavaScript API key (Maps + Marker APIs must be enabled)
GOOGLE_MAPS_API_KEY_FOR_BRANCH_FINDER=your_google_maps_api_key_here

# Optional — override the default GraphQL endpoint internally
# OPTIMIZELY_GRAPH_ENDPOINT=https://your-custom-endpoint.com
```

```bash
# 4. Start the development server
npm run dev
```

Open **[http://localhost:3000](http://localhost:3000)** in your browser.

---

## 📁 Environment Variables

| Variable | Required | Description |
|---|---|---|
| `GOOGLE_MAPS_API_KEY_FOR_BRANCH_FINDER` | ✅ Yes | Google Maps JavaScript API key. Requires the **Maps JavaScript API** and **Map Marker API** to be enabled in Google Cloud Console |
| `OPTIMIZELY_GRAPH_ENDPOINT` | ❌ No | Custom Server-side GraphQL endpoint. Defaults to the internal Optimizely Graph V2 fallback if not set |

---

## 🧪 Available Scripts

```bash
npm run dev        # Start the development server with hot reload
npm run build      # Create an optimized production build
npm run start      # Serve the production build locally
npm run lint       # Run ESLint checks across the codebase
npx tsc --noEmit   # Run TypeScript type checking without emitting output files
```

---

## 📐 Key Architectural Principles (Summary)

| Principle | Implementation |
|---|---|
| **Separation of Concerns** | UI → Hooks → lib/utils — each layer has one clear responsibility |
| **Prop Stability** | `useCallback` + `React.memo` prevent cascading re-renders on large lists |
| **Data Locality** | Feature-specific components, hooks, and utils are co-located |
| **Immutable State** | `useReducer` ensures all state transitions are explicit, predictable, and atomic |
| **Performance by Default** | `useMemo`, DOM Virtualization (`react-virtual`), and marker capping prevent expensive operations from blocking the main thread |

---

*Developed with excellence as part of the Brightstream Bank task assignment.*