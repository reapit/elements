import { OPTION_SELECTOR, SELECTED_OPTION_SELECTOR } from '../dom-helpers'
import type { FocusEvent } from 'react'
import { getListboxSelectElement } from '../dom-helpers/common'

/**
 * Type guard to check if an element is an HTMLButtonElement.
 *
 * This is used to safely narrow the type of elements when querying the DOM
 * for option elements within the listbox.
 */
function isOptionElement(element: unknown): element is HTMLButtonElement {
  return element instanceof HTMLButtonElement
}

/**
 * Determines if the current focus was triggered by keyboard navigation.
 *
 * Uses the :focus-visible pseudo-class to distinguish between keyboard focus
 * (which shows a focus ring) and pointer/mouse focus (which typically doesn't).
 * This is important because some behaviors, like selection following focus,
 * should only occur for keyboard navigation.
 */
function isKeyboardFocus(target: EventTarget | null): boolean {
  return target instanceof HTMLElement && target.matches(':focus-visible')
}

/**
 * Handles focus events for a listbox element to manage keyboard navigation and selection behavior.
 *
 * This function implements the ARIA listbox focus management pattern, ensuring proper
 * keyboard navigation and selection behavior. It handles two primary scenarios:
 *
 * **Behavior 1: Focus moving between options within the listbox**
 * When focus moves from one option to another via keyboard navigation and `selectionFollowsFocus`
 * is enabled, the newly focused option is automatically clicked to select it. This provides
 * a more efficient keyboard navigation experience where users don't need to press Enter/Space
 * to confirm their selection.
 *
 * **Behavior 2: Focus entering the listbox from outside**
 * When focus enters the listbox from outside (e.g., via Tab key), the listbox is removed from
 * the tab sequence (tabIndex set to -1) to implement roving tabindex. Focus is then moved to:
 * 1. The first selected option (if any exists), OR
 * 2. The first available option (if no selections exist)
 *
 * In case 2, if `selectionFollowsFocus` is enabled and focus was via keyboard, the first
 * option is also automatically selected.
 */
export function handleFocusEvent(event: FocusEvent<HTMLElement>): void {
  const listboxElement = event.currentTarget
  const selectElement = getListboxSelectElement(listboxElement)
  const selectionFollowsFocus = listboxElement.dataset.selectionFollowsFocus === 'true'
  const { relatedTarget, target } = event

  // Determine if this is keyboard focus (as opposed to mouse/pointer focus)
  const isKeyboard = isKeyboardFocus(target)

  // We only manage focus when it's changing via the keyboard. For mouse clicks,
  // we want the clicked element to be focused.

  const isFocusFromOutside = !listboxElement.contains(relatedTarget)
  const isFocusBetweenOptions =
    listboxElement.contains(relatedTarget) && isOptionElement(target) && isOptionElement(relatedTarget)

  // Behavior 1: Focus moving between options within the listbox
  if (isKeyboard && isFocusBetweenOptions && selectionFollowsFocus) {
    target.click()
    return
  }

  // Behavior 2: Focus entering the listbox from outside
  if (isFocusFromOutside) {
    if (event.isTrusted) {
      // If the event is trusted (i.e. fired by the user agent), we dispatch a focusin event on the select
      // so that onFocus listeners can react to the focus change. Basically, this helps us pretend
      // focusing the listbox is the same as focusing the hidden select.
      selectElement.dispatchEvent(
        new FocusEvent('focusin', { bubbles: true, cancelable: true, relatedTarget: event.relatedTarget }),
      )
    }

    if (isKeyboard) {
      // Remove listbox from tab sequence (roving tabindex pattern)
      listboxElement.tabIndex = -1

      // Try to focus the first selected option
      const firstSelectedOption = listboxElement.querySelector(SELECTED_OPTION_SELECTOR)
      if (isOptionElement(firstSelectedOption)) {
        firstSelectedOption.focus()
        return
      }

      // If no selection, focus the first available option
      const firstOption = listboxElement.querySelector(OPTION_SELECTOR)
      if (isOptionElement(firstOption)) {
        firstOption.focus()
        // Auto-select the first option if selection follows focus
        if (selectionFollowsFocus) {
          firstOption.click()
        }
      }
    }
  }
}
