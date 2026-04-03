import { BranchApiItem, BranchApiResponse } from "./types";

const GQL_ENDPOINT =
  "https://cg.optimizely.com/content/v2?auth=iQEyR1jR1cBG5mnLQoRotCyNmKUgaO0DT5cRbJPKA3oZGGQo";

const BRANCH_QUERY = `
  query GetBranches($limit: Int, $skip: Int) {
    Branch(limit: $limit, skip: $skip) {
      total
      items {
        Name
        Street
        City
        Country
        CountryCode
        ZipCode
        Phone
        Email
        Coordinates
      }
    }
  }
`;

// Optimizely Graph max limit per request is 100
const PAGE_SIZE = 100;
const MAX_RETRIES = 2;

async function gqlFetch(
  variables: { limit: number; skip: number },
  signal?: AbortSignal,
  attempt = 0
): Promise<BranchApiResponse> {
  const res = await fetch(GQL_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query: BRANCH_QUERY, variables }),
    signal,
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    if (attempt < MAX_RETRIES) {
      await new Promise((r) => setTimeout(r, 300 * (attempt + 1)));
      return gqlFetch(variables, signal, attempt + 1);
    }
    throw new Error(`GraphQL request failed: ${res.status} ${res.statusText}`);
  }

  const json: BranchApiResponse = await res.json();

  if (!json?.data?.Branch) {
    throw new Error("Unexpected GraphQL response shape");
  }

  return json;
}

export async function fetchAllBranches(signal?: AbortSignal): Promise<BranchApiItem[]> {
  // First request — discover total and fetch first page
  const firstData = await gqlFetch({ limit: PAGE_SIZE, skip: 0 }, signal);

  const total = firstData.data.Branch.total;
  const items: BranchApiItem[] = [...firstData.data.Branch.items];

  const remaining = total - PAGE_SIZE;
  if (remaining > 0) {
    const pageCount = Math.ceil(remaining / PAGE_SIZE);

    // Parallel fetch remaining pages
    const pagePromises = Array.from({ length: pageCount }, (_, i) =>
      gqlFetch({ limit: PAGE_SIZE, skip: (i + 1) * PAGE_SIZE }, signal)
    );

    const pages = await Promise.all(pagePromises);
    for (const page of pages) {
      items.push(...page.data.Branch.items);
    }
  }

  return items;
}