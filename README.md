# 🏦 Brightstream Branch Finder

> A premium, interactive branch locator built for Brightstream Bank — enabling customers to find their nearest branch from 1,000+ worldwide locations with zero-latency search, real-time GPS proximity sorting, and an interactive map experience.

---

## 📹 Video Walkthrough

<div>
  <a href="https://www.loom.com/share/1cddebc7bbd8433ca5ae3662da848461">
    <p>Branch Finder — Brightstream Bank - 4 April 2026 - Watch Video</p>
  </a>
  <a href="https://www.loom.com/share/1cddebc7bbd8433ca5ae3662da848461">
    <img style="max-width:300px;" src="https://cdn.loom.com/sessions/thumbnails/1cddebc7bbd8433ca5ae3662da848461-3e59b882677b3fc3-full-play.gif#t=0.1">
  </a>
</div>

---

## 🌐 Live Demo

**[→ View Deployed App on Vercel](https://branch-finder-rho.vercel.app)**

---

## 📸 Screenshots

![Branch Finder](public/SS1.png)

---

## 🛠️ Tech Stack & Why Each Tool Was Chosen

### Core Framework

| Package               | Version | Why Used                                                                                                                                                |
| --------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `next`                | 16.2.2  | App Router with React Server Components, built-in routing for `/branch`, `/articles`, `/about` etc., and `next/font` for zero-layout-shift font loading |
| `react` / `react-dom` | 19.2.4  | Latest React with concurrent features; used client components only where interactivity is needed                                                        |
| `typescript`          | ^5      | Strict type safety across the entire codebase — every API response, state shape, and component prop is typed                                            |

### Data Fetching & Caching

| Package                 | Version | Why Used                                                                                                                                                                                                                                                                                          |
| ----------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `@tanstack/react-query` | ^5.96.1 | Chosen over plain `fetch` or SWR for its powerful caching (`staleTime`, `gcTime`), built-in `AbortSignal` support, and automatic background refetch control. Branch data is cached for **1 hour in memory** and **2 hours in garbage collection** — so navigating away and back never re-fetches. |

### Mapping

| Package              | Version | Why Used                                                                                                                                                                                            |
| -------------------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `@types/google.maps` | ^3.58.1 | Type definitions for the Google Maps JavaScript API loaded via script tag. Used `AdvancedMarkerElement` (the modern Maps API) with fully custom HTML pins instead of the deprecated `Marker` class. |

### Animations & UI

| Package         | Version  | Why Used                                                                                                                                                                                                                                   |
| --------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `framer-motion` | ^12.38.0 | Used for page-enter animations, the search bar slide-in, branch card staggered appearance, and the `AnimatePresence`-powered detail panel exit animation. Chosen over CSS-only for its spring physics and mount/unmount lifecycle control. |
| `lucide-react`  | ^1.7.0   | Consistent, lightweight SVG icon set replacing all custom inline SVGs across the project. Tree-shakeable — only imported icons are bundled.                                                                                                |

### Styling

| Package                | Version | Why Used                                                                                                                                                                                                                 |
| ---------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `tailwindcss`          | ^4      | Utility-first CSS with a custom `@theme` block defining the Brightstream brand tokens (`--color-midnight`, `--color-gold`, `--font-playfair`, etc.). Custom utilities like `.no-scrollbar` are declared with `@utility`. |
| `@tailwindcss/postcss` | ^4      | Tailwind v4's modern PostCSS plugin — replaces the old `tailwind.config.js` approach entirely.                                                                                                                           |

---

## 🏗️ Folder Structure & Design Rationale

```text
📦 brightstream-branch-finder
 ┣ 📂 app/                          # Next.js App Router pages
 ┃ ┣ 📂 branch/                     # /branch route (Branch Finder page)
 ┃ ┣ 📂 articles/                   # /articles route
 ┃ ┣ 📂 about/                      # /about route
 ┃ ┣ 📂 personal/ business/ wealth/ # Product pages
 ┃ ┣ 📜 layout.tsx                  # Root layout: Navbar + Footer wrapping all pages
 ┃ ┣ 📜 page.tsx                    # Homepage
 ┃ ┣ 📜 providers.tsx               # React Query client provider (client boundary)
 ┃ └ 📜 globals.css                 # Brand design tokens + base styles
 ┃
 ┣ 📂 components/
 ┃ ┣ 📂 branch-finder/              # Domain-specific components (feature folder)
 ┃ ┃ ┣ 📜 BranchFinder.tsx          # Orchestrator: wires hooks, state, and subcomponents
 ┃ ┃ ┣ 📜 SearchBar.tsx             # Multi-field search UI (name, city, country, zip)
 ┃ ┃ ┣ 📜 BranchList.tsx            # Infinite scroll list with sort + filter chips
 ┃ ┃ ┣ 📜 BranchCard.tsx            # Single branch card (name, address, distance badge)
 ┃ ┃ ┣ 📜 FilterChips.tsx           # All / US / International toggle buttons
 ┃ ┃ ┣ 📜 MapView.tsx               # Google Maps container + marker management
 ┃ ┃ └ 📜 BranchDetailPanel.tsx     # Animated detail overlay (address, phone, email, directions)
 ┃ ┃
 ┃ ┣ 📂 ui/                         # Generic reusable UI primitives (design system)
 ┃ ┃ ┣ 📜 Button.tsx                # Multi-variant button (primary, secondary, ghost, link…)
 ┃ ┃ ┣ 📜 Card.tsx                  # Motion-enabled card with variants (default, interactive, glass)
 ┃ ┃ ┣ 📜 Badge.tsx                 # Pill-style badge
 ┃ ┃ └ 📜 Spinner.tsx               # Loading indicator
 ┃ ┃
 ┃ ┣ 📂 layout/                     # App shell components
 ┃ ┃ ┣ 📜 navbar.tsx                # Sticky animated navbar with mobile slide-in menu
 ┃ ┃ └ 📜 footer.tsx                # Site footer
 ┃ ┃
 ┃ ┣ 📂 home/                       # Homepage section components
 ┃ ┣ 📂 articles/                   # Articles page components
 ┃ ┣ 📂 about/                      # About page components
 ┃ └ 📂 personal/ business/ wealth/ # Product page components
 ┃
 ┣ 📂 hooks/                        # Custom React hooks (logic layer)
 ┃ ┣ 📜 useBranches.ts              # TanStack Query: fetches + caches all branch data
 ┃ ┣ 📜 useBranchFinderState.ts     # useReducer: centralised finder UI state
 ┃ └ 📜 useGeolocation.ts           # Browser Geolocation API with error code mapping
 ┃
 ┣ 📂 lib/                          # Pure logic, no React
 ┃ ┣ 📜 api.ts                      # GraphQL fetcher with pagination + retry logic
 ┃ ┣ 📜 types.ts                    # All shared TypeScript interfaces & types
 ┃ └ 📂 utils/
 ┃   ┣ 📜 branch.ts                 # Branch-specific: mapApiBranch, filtering, sorting, stats
 ┃   ┣ 📜 geo.ts                    # Geography: Haversine formula, distance formatting, coord parsing
 ┃   └ 📜 common.ts                 # Generic helpers: cn(), debounce(), getInfiniteScrollData()
```

**Why this folder structure?**

- **Feature folders** (`branch-finder/`) group all components that exist for one single domain concern. If you delete the Branch Finder feature, you delete one folder — nothing else bleeds out.
- **`ui/` for primitives** — generic reusable components that have no knowledge of "branches" live separately so they can be used on any page (articles, home, etc.) without coupling.
- **`hooks/`** keeps all stateful React logic out of components entirely. Components receive data and dispatch events; they don't know _how_ data is fetched or _how_ state is stored.
- **`lib/`** contains zero React — it's pure TypeScript functions. This means they're easily testable, importable server-side, and have no accidental client-side dependencies.

---

## 🧠 Why `useReducer` Instead of `useState`?

The Branch Finder has **8 interconnected pieces of state**:

```typescript
{
  inputs: { branchName, city, country, zipCode },   // what's typed in search
  activeFilters: { branchName, city, country, zipCode, type }, // what's applied
  sort: "name" | "distance" | "country",
  selectedBranch: Branch | null,
}
```

Using plain `useState` for each would mean **8 separate `useState` calls**, with filtering logic scattered across multiple `useEffect` calls watching each other's values.

`useReducer` solves this by:

1. **Single source of truth** — one `state` object, one `dispatch` function, no state sync bugs between fields
2. **Predictable transitions** — every state change goes through a named action (`APPLY_SEARCH`, `CLEAR_ALL`, `SET_FILTER_TYPE`). You can read the reducer and understand every possible state transition at a glance
3. **Atomic updates** — `APPLY_SEARCH` copies all 4 input values into `activeFilters` in one render cycle. With `useState`, you'd need 4 separate `setState` calls which could cause 4 re-renders
4. **No Context needed** — the entire state lives in one hook (`useBranchFinderState`). It's passed down as stable function props. No provider, no consumer, no re-render cascade

```typescript
// Before (problematic with useState):
const [branchName, setBranchName] = useState("");
const [city, setCity] = useState("");
const [activeCity, setActiveCity] = useState(""); // which one is "applied"?
// ...8 more useState calls, sync bugs everywhere

// After (useReducer):
const { state, setInput, applySearch, clearAll } = useBranchFinderState();
// One state object. One hook. Zero sync issues.
```

---

## 🗂️ Why Utils Are Split Into Separate Files

The `lib/utils/` directory is split into **3 purpose-named files** instead of one giant `utils.ts`:

### `geo.ts` — Geography & Math only

```typescript
parseCoordinates(); // "lat, lng" string → { lat, lng }
haversineDistance(); // spherical earth distance formula
formatDistance(); // 0.3 → "300 m", 12.5 → "12.5 km"
calculateDistances(); // applies haversine across entire branches array
```

**Why separate?** These functions are pure math. They don't know about filters, sorting, or components. Isolating them makes them easy to test independently and easy to swap (e.g. replace Haversine with a faster algorithm later).

### `branch.ts` — Branch domain logic only

```typescript
mapApiBranch(); // BranchApiItem (PascalCase) → Branch (camelCase)
getProcessedBranches(); // filters + sorts a branch array
getAvailableCountries(); // unique sorted country list
getAvailableCities(); // unique sorted city list
getBranchStats(); // { total, countries } for the hero stats ribbon
```

**Why separate?** These functions know about the `Branch` type and business rules (what "US" filter means, how country sort works). They're the domain layer.

### `common.ts` — Generic utilities only

```typescript
cn(); // classNames helper (like clsx)
debounce(); // generic debounce for any function
getInfiniteScrollData(); // pagination math for infinite scroll
```

**Why separate?** These have zero knowledge of branches or geography. They're reusable across the entire project. `cn()` is used in `Card.tsx`, `FilterChips.tsx`, and beyond.

**The rule:** A function lives in the file whose name describes _why it exists_, not _where it's used_.

---

## 🧩 Why Big Components Are Split

`BranchFinder.tsx` is the orchestrator — it owns state and data. But the actual UI is split into focused components:

### The Problem with One Big Component

If `BranchFinder.tsx` contained the SearchBar, the Map, the List, and the Cards all inline:

- Every keypress in the search input would re-render the **entire tree** including the Google Map
- The 1,000-branch list re-renders every time a card is selected
- You can't reuse a "branch card" design elsewhere (e.g. a featured branch on the homepage)
- The file would be 700+ lines — impossible to navigate

### How it's Split

```
BranchFinder.tsx          ← Parent: owns all state, computes derived data
  ├── SearchBar.tsx        ← Presentational: renders inputs, fires callbacks
  ├── MapView.tsx          ← Isolated: manages Google Maps lifecycle independently
  │     └── BranchDetailPanel.tsx  ← Animated overlay, knows only 1 branch
  └── BranchList.tsx       ← Owns only: scroll state, pagination
        ├── FilterChips.tsx ← Dumb: renders filter buttons, fires 1 callback
        └── BranchCard.tsx  ← Dumb: renders 1 branch card, fires 1 callback
```

**The key principle:** Each component only re-renders when _its own_ props change. `BranchCard` doesn't care about the search query — it just gets a `branch` object and an `isActive` flag. Selecting a card doesn't re-render all other cards unnecessarily.

---

## 💡 Key Architecture Decisions

### 1. Fetch Everything Once, Filter Client-Side

The Optimizely Graph API is queried once on page load. All 1,000+ branches are fetched (using paginated `Promise.all`), normalized, and handed to TanStack Query which caches them for 1 hour.

**Trade-off:** ~1–2MB initial network transfer  
**Benefit:** Every search, filter, and sort after that is **0ms** — no loading spinners, no debounced API requests, no server round-trips

This is the right choice because branch data changes infrequently (weekly at most) and the dataset fits comfortably in browser memory.

### 2. Distance Calculation is Decoupled from Filtering

```typescript
// Step 1: Only runs when userLocation changes (expensive math)
const branchesWithDistance = useMemo(
  () => calculateDistances(allBranches, location),
  [allBranches, location],
);

// Step 2: Only runs when filters/sort changes (cheap array ops)
const displayBranches = useMemo(
  () => getProcessedBranches(branchesWithDistance, activeFilters, sort),
  [branchesWithDistance, activeFilters, sort],
);
```

Typing in the search box only triggers Step 2. The Haversine formula for 1,000+ branches (Step 1) only re-runs if your GPS location changes.

### 3. Map Marker Limit

```typescript
const mapBranches = useMemo(() => {
  if (!hasFilters && displayBranches.length > 100) {
    return displayBranches.slice(0, 100); // Prevents DOM freezing
  }
  return displayBranches; // Filters lift the cap
}, [displayBranches, hasFilters]);
```

Rendering 1,000 `AdvancedMarkerElement` nodes simultaneously would freeze the Google Maps DOM. When no filters are active, only the first 100 markers load. Applying any filter automatically removes the cap (filtered results are typically much smaller).

### 4. Parallel GraphQL Pagination

```typescript
// First request discovers total count
const firstData = await gqlFetch({ limit: 100, skip: 0 });
const total = firstData.data.Branch.total;

// Remaining pages fetched simultaneously — not sequentially
const pagePromises = Array.from({ length: pageCount }, (_, i) =>
  gqlFetch({ limit: 100, skip: (i + 1) * 100 }),
);
const pages = await Promise.all(pagePromises); // All parallel
```

If there are 1,200 branches: 1 scout request + 11 parallel requests = **12 total requests finishing at the speed of the slowest one**, not 12 sequential requests chained together.

---

## 🚀 Local Setup

```bash
# 1. Clone the repo
git clone <your-repo-url>
cd brightstream-branch-finder

# 2. Install dependencies
npm install

# 3. Add environment variables
cp .env.example .env.local
```

Edit `.env.local`:

```env
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
```

```bash
# 4. Run the development server
npm run dev
```

Open **[http://localhost:3000](http://localhost:3000)**

---

## 🧪 Scripts

```bash
npm run dev      # Start dev server (hot reload)
npm run build    # Production build
npm run start    # Serve production build locally
npm run lint     # ESLint check
npx tsc --noEmit # TypeScript type check (no output files)
```

---

## 📁 Environment Variables

| Variable                                | Required | Description                                                    |
| --------------------------------------- | -------- | -------------------------------------------------------------- |
| `GOOGLE_MAPS_API_KEY_FOR_BRANCH_FINDER` | ✅ Yes   | Google Maps JavaScript API key with Maps & Marker APIs enabled |

---

_Developed as part of the Brightstream Bank task assignment._
