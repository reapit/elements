import { shouldTopBarMenuGroupBeOpen } from './should-be-open'
import { useLayoutEffect, useRef } from 'react'

import type { RefObject } from 'react'

/**
 * Controls the open state of a `TopBar.MenuGroup` when it becomes active or when a descendant comes to
 * represent the current page.
 */
export function useTopBarMenuDrawerMenuGroupController(): RefObject<HTMLDetailsElement> {
  const ref = useRef<HTMLDetailsElement>(null)

  useLayoutEffect(function openOrCloseMenuGroup() {
    if (!ref.current) return

    // If an element representing the current page is within this menu group, we want the group to be open.
    if (shouldTopBarMenuGroupBeOpen(ref.current)) {
      ref.current.open = true
    }

    // We want to observe changes to the `data-is-active` attribute of the menu group itself so we can
    // update the group's open state as appropriate.
    const dataIsActiveObserver = createDataIsActiveObserver(ref.current)

    // We also want to observe changes to the `aria-current` attribute of the menu group's descendants so we
    // can update the group's open state when it changes.
    const ariaCurrentObserver = createAriaCurrentObserver(ref.current)

    return () => {
      ariaCurrentObserver.disconnect()
      dataIsActiveObserver.disconnect()
    }
  }, [])

  return ref
}

/**
 * Creates a MutationObserver that listens for changes to the `data-is-active` attribute on the given details element
 * and updates the open state of that details element.
 */
function createDataIsActiveObserver(detailsElement: HTMLDetailsElement): MutationObserver {
  const observer = new MutationObserver(() => {
    // When we observe changes to the `data-is-active` attribute, we want to open or close the menu element.
    detailsElement.open = shouldTopBarMenuGroupBeOpen(detailsElement)
  })

  // We want to observe changes to the details element's `data-is-active` attribute.
  observer.observe(detailsElement, {
    attributeFilter: ['data-is-active'],
  })

  return observer
}

/**
 * Creates a MutationObserver that listens for changes to the `aria-current` attribute within the given details element
 * and updates the open state of that details element.
 */
function createAriaCurrentObserver(detailsElement: HTMLDetailsElement): MutationObserver {
  const observer = new MutationObserver(() => {
    // When we observe changes to the `aria-current` attribute, we want to open or close the menu element.
    detailsElement.open = shouldTopBarMenuGroupBeOpen(detailsElement)
  })

  // We want to observe changes to the details element's subtree, but only changes to the `aria-current` attribute.
  observer.observe(detailsElement, {
    subtree: true,
    attributeFilter: ['aria-current'],
  })

  return observer
}
