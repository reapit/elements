/**
 * Returns the ARIA label for a pagination link that will navigate to the next page, or previous page.
 * When calculating the next or previous page number, the value will be clamped to the `[1, pageCount]`
 * range.
 */
export function getARIALabel(variant: 'next-page' | 'previous-page', pageNumber: number, pageCount: number) {
  switch (variant) {
    case 'next-page':
      return `Page ${Math.min(pageCount, pageNumber + 1)}`
    case 'previous-page':
      return `Page ${Math.max(1, pageNumber - 1)}`
  }
}
