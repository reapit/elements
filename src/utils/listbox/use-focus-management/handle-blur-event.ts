import type { FocusEvent } from 'react'

/**
 * Handles blur events for a listbox element to manage tab sequence participation.
 *
 * This function works in combination with `handleFocusEvent` to implement the roving tabindex
 * pattern for listbox keyboard navigation. When focus moves outside the listbox entirely,
 * the listbox element is restored to the document's tab sequence (tabIndex set to 0).
 *
 * This ensures that when the user tabs away from the listbox and then tabs back, they can
 * re-enter the listbox naturally. Without this behavior, the listbox would remain at
 * tabIndex -1 and become unreachable via keyboard navigation.
 *
 * **Key Behavior:**
 * - If focus is moving to a related target outside the listbox, restore tabIndex to 0
 * - If focus is moving between elements within the listbox, do nothing (keep tabIndex at -1)
 */
export function handleBlurEvent(event: FocusEvent<HTMLElement>): void {
  const listboxElement = event.currentTarget

  // If focus is moving out of the listbox (the related target is not within the listbox),
  // restore the listbox to the document's tab sequence so it can be re-entered via Tab key.
  if (!listboxElement.contains(event.relatedTarget)) {
    listboxElement.tabIndex = 0
  }
}
