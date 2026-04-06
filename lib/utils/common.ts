/** Lightweight classNames helper (like clsx) */
export function cn(...classes: (string | undefined | false | null)[]): string {
  return classes.filter(Boolean).join(" ");
}



/**
 * Calculate infinite scroll pagination data
 * Returns total pages, cumulative list of items up to the current page, and current visible count.
 */
export function getInfiniteScrollData<T>(
  items: T[],
  page: number,
  pageSize: number,
) {
  return {
    totalPages: Math.ceil(items.length / pageSize),
    visibleItems: items.slice(0, (page + 1) * pageSize),
    visibleCount: Math.min((page + 1) * pageSize, items.length),
  };
}
