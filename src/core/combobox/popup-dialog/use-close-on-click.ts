import { closeComboboxPopup } from './close-popup'
import { useCallback } from 'react'

import type { MouseEventHandler } from 'react'

/**
 * Valid values for the closeOnSelection behavior.
 */
const CLOSE_ON_SELECTION = {
  NEVER: 'never',
  ALWAYS: 'always',
  AUTO: 'auto',
} as const

export type CloseOnSelection = (typeof CLOSE_ON_SELECTION)[keyof typeof CLOSE_ON_SELECTION]

/**
 * Creates a click handler that closes the popup when clicking an option.
 * Calls the provided onClick handler first to allow preventing the default close behavior.
 * @param onClick - Optional click handler to call before closing.
 * @returns Click handler that closes the popup on option clicks.
 */
export function useCloseComboboxPopupOnClick(
  onClick?: MouseEventHandler<HTMLDialogElement>,
): MouseEventHandler<HTMLDialogElement> {
  return useCallback(
    (event) => {
      onClick?.(event)

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

      // Validate the closeOnSelection value; if it's not a value we understand,
      // we do nothing.
      if (!isValidCloseOnSelection(closeOnSelection)) {
        return
      }

      // Don't close if we're configured to never close on selection
      if (closeOnSelection === CLOSE_ON_SELECTION.NEVER) {
        return
      }

      // Always close if we're configured to always close on selection
      if (closeOnSelection === CLOSE_ON_SELECTION.ALWAYS) {
        closeComboboxPopup(event.currentTarget)
        return
      }

      // For 'auto' mode, we need to check the listbox's multi-selectable state
      const { listboxId } = optionElement.dataset
      const listboxElement = listboxId ? document.getElementById(listboxId) : null

      // Close the popup if this is a single-select listbox
      if (shouldClosePopup(closeOnSelection, listboxElement)) {
        closeComboboxPopup(event.currentTarget)
      }
    },
    [onClick],
  )
}

/**
 * Type guard to check if a value is a valid CloseOnSelection value.
 */
function isValidCloseOnSelection(value: unknown): value is CloseOnSelection {
  return value === CLOSE_ON_SELECTION.AUTO || value === CLOSE_ON_SELECTION.ALWAYS || value === CLOSE_ON_SELECTION.NEVER
}

/**
 * Determines whether the popup should close for 'auto' mode based on the listbox's
 * multi-selectable state.
 *
 * Close behavior logic for 'auto' mode:
 * - Close only for single-select listboxes (ariaMultiSelectable === 'false')
 * - Don't close for multi-select listboxes or if listbox element is not found
 *
 * @param closeOnSelection - The close behavior setting (should be 'auto').
 * @param listboxElement - The listbox element to check for multi-select state.
 * @returns True if the popup should close, false otherwise.
 */
function shouldClosePopup(closeOnSelection: 'auto', listboxElement: HTMLElement | null): boolean {
  // NOTE: `ariaMultiSelectable` is a Baseline 2023 "Newly Available" feature. We check for it before use.
  if ('ariaMultiSelectable' in Element.prototype) {
    return listboxElement?.ariaMultiSelectable === 'false'
  }

  // Fall back to the `aria-multiselectable` attribute.
  return listboxElement?.getAttribute('aria-multiselectable') === 'false'
}

/**
 * Finds the closest option element from a click target.
 * @param element - The element to search from (typically event.target).
 * @returns The option element if found, null otherwise.
 */
function getOptionElement(element: unknown): HTMLElement | null {
  if (element instanceof HTMLElement) {
    return element.closest('[role="option"]')
  }
  return null
}
