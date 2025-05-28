import type { KeyboardEvent } from 'react'

/**
 *
 */
export function closeMenuGroupOnEscapeKeyDownHandler(event: KeyboardEvent<HTMLElement>) {
  if (event.key !== 'Escape') {
    return
  }

  const target = event.target

  if (target instanceof HTMLElement) {
    const detailsElement = target.closest('details')
    const currentPageElement = detailsElement?.querySelector('[aria-current="page"]')
    const summaryElement = detailsElement?.querySelector('summary')

    event.preventDefault()
    summaryElement?.focus()

    // We only close the <details> element if it has descendants that represent the current page.
    if (detailsElement && !currentPageElement) {
      detailsElement.open = false
    }
  }
}
