import { closeComboboxPopup } from './close-popup'

import type { MouseEvent } from 'react'

/**
 * Valid values for the closeOnSelection behavior.
 */
export const CLOSE_ON_SELECTION = {
  AUTO: 'auto',
  ALWAYS: 'always',
  NEVER: 'never',
} as const

export type CloseOnSelection = (typeof CLOSE_ON_SELECTION)[keyof typeof CLOSE_ON_SELECTION]

/**
 * Closes the combobox popup when an option is clicked, based on the closeOnSelection setting.
 *
 * This function handles three modes:
 * - **never**: Never closes on selection
 * - **always**: Always closes on selection
 * - **auto**: Closes only for single-select listboxes
 *
 * @param event The click event from the dialog element
 *
 * @example
 * const handleClick = (event: MouseEvent<HTMLDialogElement>) => {
 *   maybeCloseOnSelection(event)
 * }
 */
export function maybeCloseOnSelection(event: MouseEvent<HTMLDialogElement>): void {
  // Don't close if default prevented or for programmatic clicks (like those created
  // with element.click())
  if (event.defaultPrevented || !event.isTrusted) {
    return
  }

  const optionElement = getOptionElement(event.target)

  // Don't close if target is NOT an option or option descendant
  if (!optionElement) {
    return
  }

  const { closeOnSelection } = event.currentTarget.dataset

  // Don't close if we're configured to never close on selection
  if (closeOnSelection === CLOSE_ON_SELECTION.NEVER) {
    return
  }

  // Always close if we're configured to always close on selection
  if (closeOnSelection === CLOSE_ON_SELECTION.ALWAYS) {
    closeComboboxPopup(event.currentTarget)
    return
  }

  // For 'auto' mode, close only for single-select listboxes
  if (closeOnSelection === CLOSE_ON_SELECTION.AUTO) {
    const { listboxId } = optionElement.dataset
    const listboxElement = listboxId ? document.getElementById(listboxId) : null

    if (shouldCloseForAutoMode(listboxElement)) {
      closeComboboxPopup(event.currentTarget)
    }
  }
}

/**
 * Closes the dialog when clicking on the backdrop (Safari workaround).
 *
 * Safari doesn't support the closedby attribute, so we handle backdrop clicks manually.
 * This function checks if the click target is the dialog element itself (not its children),
 * which indicates a backdrop click.
 *
 * @param event The click event from the dialog element
 *
 * @example
 * const handleClick = (event: MouseEvent<HTMLDialogElement>) => {
 *   closeOnBackdropClick(event)
 * }
 */
export function closeOnBackdropClick(event: MouseEvent<HTMLDialogElement>): void {
  const isClosedBySupported = 'closedBy' in HTMLDialogElement.prototype

  if (!isClosedBySupported && event.target === event.currentTarget) {
    // Click was on the backdrop, not on dialog content
    event.currentTarget.close()
  }
}

/**
 * Finds the closest option element from a click target.
 *
 * Searches up the DOM tree from the given element to find an element with
 * `role="option"`. This allows clicks on option descendants (like icons or text)
 * to be properly handled.
 *
 * @param element The element to search from (typically event.target)
 * @returns The option element if found, null otherwise
 *
 * @example
 * const optionElement = getOptionElement(event.target)
 * if (optionElement) {
 *   // Handle option click
 * }
 */
export function getOptionElement(element: unknown): HTMLElement | null {
  if (element instanceof HTMLElement) {
    return element.closest('[role="option"]')
  }
  return null
}

/**
 * Determines whether the popup should close for 'auto' mode based on the listbox's
 * multi-selectable state.
 *
 * Close behavior logic for 'auto' mode:
 * - Close only for single-select listboxes (ariaMultiSelectable === 'false')
 * - Don't close for multi-select listboxes or if listbox element is not found
 *
 * @param listboxElement The listbox element to check for multi-select state
 * @returns True if the popup should close, false otherwise
 */
function shouldCloseForAutoMode(listboxElement: HTMLElement | null): boolean {
  // NOTE: `ariaMultiSelectable` is a Baseline 2023 "Newly Available" feature. We check for it before use.
  if ('ariaMultiSelectable' in Element.prototype) {
    return listboxElement?.ariaMultiSelectable === 'false'
  }

  // Fall back to the `aria-multiselectable` attribute.
  return listboxElement?.getAttribute('aria-multiselectable') === 'false'
}
