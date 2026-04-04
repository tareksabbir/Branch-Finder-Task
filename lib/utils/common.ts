/** Lightweight classNames helper (like clsx) */
export function cn(...classes: (string | undefined | false | null)[]): string {
  return classes.filter(Boolean).join(" ");
}

/** Debounce utility */
export function debounce<T extends (...args: Parameters<T>) => void>(
  fn: T,
  delay: number,
): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout>;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
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
