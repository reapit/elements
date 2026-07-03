import { clearSearchInput } from '#src/core/search-input'
import { closeDialog } from '#src/utils/dialog'
import { OPTION_ROLE_SELECTOR } from '#src/utils/listbox/dom-helpers'

import type { MouseEvent, SyntheticEvent } from 'react'

/**
 * Valid values for the closeOnSelection behaviour.
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
  // Deliberately not gated on event.isTrusted: keyboard selection drives clickOption(), which
  // dispatches a synthetic (isTrusted: false) click, and it must close the popup the same way a
  // real mouse click does.
  if (event.defaultPrevented) {
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
    closeDialog(event.currentTarget)
    return
  }

  // For 'auto' mode, close only for single-select listboxes
  if (closeOnSelection === CLOSE_ON_SELECTION.AUTO) {
    const { listboxId } = optionElement.dataset
    const listboxElement = listboxId ? document.getElementById(listboxId) : null

    if (shouldCloseForAutoMode(listboxElement)) {
      closeDialog(event.currentTarget)
    }
  }
}

/**
 * Finds the closest option element from a click target.
 *
 * Searches up the DOM tree from the given element to find an element with
 * `role="option"` or `role="treeitem"`. This allows clicks on option descendants
 * (like icons or text) to be properly handled, and supports both listbox and tree
 * widget patterns.
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
    return element.closest(OPTION_ROLE_SELECTOR)
  }
  return null
}

/**
 * Determines whether the popup should close for 'auto' mode based on the listbox's
 * multi-selectable state.
 *
 * Close behaviour logic for 'auto' mode:
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

/**
 * Clears the search input when the popup closes, unless opted out.
 *
 * This function searches for a search input within the popup dialog
 * and clears its value. It respects the `data-preserve-search-on-close` attribute.
 *
 * @param event The close event from the dialog element
 *
 * @example
 * const handleClose = (event: SyntheticEvent<HTMLDialogElement>) => {
 *   clearSearchInputOnClose(event)
 * }
 */
export function clearSearchInputOnClose(event: SyntheticEvent<HTMLDialogElement>): void {
  const { preserveSearchOnClose } = event.currentTarget.dataset

  // If the search input should be preserved, do nothing.
  if (preserveSearchOnClose === 'true') {
    return
  }

  // We take a dumb approach by assuming the search input is the first and only
  // input element within the dialog. This may not hold in all cases, but it's
  // the cheapest thing we can do.
  const searchInputElement = event.currentTarget.querySelector('input')

  if (searchInputElement instanceof HTMLInputElement) {
    clearSearchInput(searchInputElement)
  }
}
