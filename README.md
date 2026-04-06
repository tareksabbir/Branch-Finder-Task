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
- [Architecture Overview](#-architecture-overview)
- [Folder Structure](#-folder-structure)
- [Core Design Decisions](#-core-design-decisions)
- [State Management Deep Dive](#-state-management-deep-dive)
- [Performance Optimizations](#-performance-optimizations)
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
| 🗺️ **Interactive Map** | Google Maps integration using modern `AdvancedMarkerElement` with fully custom, brand-aligned HTML pins |
| 🔄 **Parallel Data Loading** | High-speed GraphQL pagination — fetches all data simultaneously using concurrent `Promise.all` requests |
| 🖱️ **Virtualized List** | Uses `@tanstack/react-virtual` for intelligent windowed rendering, ensuring silky-smooth performance and low DOM overhead on large datasets |
| 🍪 **Location Persistence** | Smart consent system with highly resilient Cookie + LocalStorage hybrid storage — returning users skip permission prompts entirely |
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
 ┃ ┃ ┣ 📜 BranchList.tsx            # Infinite scroll list using IntersectionObserver
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
 ┃   ┣ 📜 map.ts                    # Google Maps helpers and custom style definitions
 ┃   └ 📜 common.ts                 # Generic helpers: cn(), debounce(), infinite scroll math
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

### 2. Parallel GraphQL Pagination with Scout + Retry

Optimizely Graph enforces a 100-item page limit. Instead of sequential fetching, the app uses:

1. **Scout Request** — a small initial query to determine the total record count
2. **Parallelization** — all remaining page requests fire simultaneously via `Promise.all`
3. **Resilience** — `gqlFetch` in `lib/api.ts` implements recursive **exponential backoff** (up to 2 retries) and `AbortSignal` support for graceful cancellation

```typescript
// Sequential (slow): 10 pages × 300ms = ~3 seconds
// Parallel (fast):   10 pages fired at once = ~300ms total
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

Haversine distance is computed across 1,000+ items — an expensive operation. This is strictly decoupled from filtering to keep search fluid:

```typescript
// Expensive — only re-runs when GPS coordinates actually change
const branchesWithDistance = useMemo(
  () => calculateDistances(allBranches, location),
  [allBranches, location],
);

// Cheap — runs on every keystroke without recomputing distances
const displayBranches = useMemo(
  () => getProcessedBranches(branchesWithDistance, activeFilters, sort),
  [branchesWithDistance, activeFilters, sort],
);
```

---

### 5. Smart Map Marker Capping

Rendering 1,000 `AdvancedMarkerElement` nodes simultaneously would freeze the Google Maps JavaScript bridge. The app intelligently handles this:

- **No active filter:** Display is capped to the **top 100 closest markers**
- **Filter applied:** The cap is lifted automatically, since the result set is naturally smaller

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
    type: BranchType | null;
  };
  sort: "name" | "distance" | "country";
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

`BranchFinder.tsx` orchestrates everything, but the UI is split into isolated subtrees to prevent cascading re-renders:

```text
BranchFinder.tsx           ← Parent: owns all state, performs data mapping
  ├── BranchFinderHero.tsx ← Context Isolation: search + stats render independently
  │     ├── SearchBar.tsx
  │     └── BranchStatsRibbon.tsx
  ├── MapView.tsx           ← Lifecycle Isolation: Google Maps managed separately from list
  │     └── BranchDetailPanel.tsx
  ├── BranchList.tsx        ← Iteration Isolation: owns scroll state and DOM Virtualization
  │     ├── BranchListHeader.tsx
  │     ├── BranchListStatus.tsx
  │     └── BranchCard.tsx  ← Leaf: wrapped in React.memo, re-renders only on prop changes
  └── ConsentBanner.tsx     ← Utility: persistent permission manager, decoupled from core
```

**Without this split:**
- Every keystroke in the search bar would trigger a full re-render of the Google Maps instance
- Selecting a branch would force all 1,000+ `BranchCard` nodes to re-render

**With this split:**
- Search state is isolated inside `BranchFinderHero`, leaving the map completely untouched
- `React.memo` on `BranchCard` + `useCallback` on event handlers ensures only the two toggled cards re-render on selection

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
cn()                    // classNames helper (like clsx)
getInfiniteScrollData() // Pagination math for the infinite scroll chunker
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

```typescript
// lib/utils/cookie.ts — Hybrid Cookie + LocalStorage preference storage
// Uses localStorage as a bulletproof fallback if browsers block strict cookies locally
setCookie("branch_finder_consent", "allowed", 365);
getCookie("branch_finder_consent"); // → "allowed" | "denied" | null

// BranchFinder.tsx — automatic re-engagement for returning users
useEffect(() => {
  const consent = getCookie("branch_finder_consent");
  if (consent === "allowed") {
    requestGeolocation(); // Skip the banner entirely for returning users
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

# Optional — override the default GraphQL endpoint
# NEXT_PUBLIC_GQL_ENDPOINT=https://your-custom-endpoint.com
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
| `NEXT_PUBLIC_GQL_ENDPOINT` | ❌ No | Custom GraphQL endpoint. Defaults to the Optimizely Graph V2 endpoint if not set |

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