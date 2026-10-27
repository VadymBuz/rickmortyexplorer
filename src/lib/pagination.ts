export type PaginationItem = number | "start-ellipsis" | "end-ellipsis";

function range(start: number, end: number): number[] {
  return Array.from({ length: Math.max(end - start + 1, 0) }, (_, index) => start + index);
}

/**
 * The page links to show, e.g. `1 … 20 21 22 … 42`.
 *
 * Always seven items once there are more than seven pages, so the control
 * doesn't jump around while paging, and an ellipsis never hides a single page.
 */
export function getPaginationItems(page: number, totalPages: number): PaginationItem[] {
  if (totalPages <= 7) {
    return range(1, totalPages);
  }
  if (page <= 4) {
    return [...range(1, 5), "end-ellipsis", totalPages];
  }
  if (page >= totalPages - 3) {
    return [1, "start-ellipsis", ...range(totalPages - 4, totalPages)];
  }
  return [1, "start-ellipsis", page - 1, page, page + 1, "end-ellipsis", totalPages];
}
