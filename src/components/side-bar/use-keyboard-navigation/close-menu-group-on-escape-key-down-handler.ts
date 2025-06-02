import type { KeyboardEvent } from 'react'

/**
 * Handles the Escape key down event. If the target of the event is a descendant of a `<details>` element,
 * it will focus that `<details>` element's `<summary>`, scroll it into view and, if the `<details>` element
 * does not contain an element with `aria-current="page"`, it will close the `<details>`.
 */
export function closeMenuGroupOnEscapeKeyDownHandler(event: KeyboardEvent<HTMLElement>) {
  if (event.key !== 'Escape') {
    return
  }

  if (event.target instanceof HTMLElement) {
    const detailsElement = event.target.closest('details')
    const currentPageElement = detailsElement?.querySelector('[aria-current="page"]')
    const summaryElement = detailsElement?.querySelector('summary')

    event.preventDefault()
    summaryElement?.focus()
    summaryElement?.scrollIntoView({ block: 'nearest' })

    // We only close the <details> element if it has descendants that represent the current page.
    if (detailsElement && !currentPageElement) {
      detailsElement.open = false
    }
  }
}
