/**
 * Returns true if the given page number is the first or last page based on the specified variant.
 * Useful for determining if the `Pagination.Link` or `Pagination.LinkButton` should be disabled.
 *
 * The page number must use a 1-based page indexing number.
 */
export function isTerminalPage(variant: 'next-page' | 'previous-page', pageNumber: number, pageCount: number) {
  return variant === 'next-page' ? pageNumber === pageCount : pageNumber === 1
}
