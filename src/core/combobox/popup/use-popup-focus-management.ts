import { useComboboxPopupObserver } from './use-popup-observer'
import { focusInputOrListbox } from './focus-input-or-listbox'

export namespace useComboboxPopupFocusManagement {
  export interface Input {
    /** ID of the popup element */
    popupId: string
    /** ID of the combobox input that controls this popup (from aria-labelledby) */
    comboboxId: string
  }
}

/**
 * Manages focus when a combobox popup opens and closes.
 *
 * - When popup opens: focuses the listbox or search input inside
 * - When popup closes: returns focus to the combobox input if focus was inside popup
 *
 * @param options - Configuration for popup focus management
 */
export function useComboboxPopupFocusManagement(options: useComboboxPopupFocusManagement.Input): void {
  const { popupId, comboboxId } = options

  useComboboxPopupObserver(popupId, (event) => {
    const popupElement = document.getElementById(popupId)
    if (!popupElement) return

    if (event.newState === 'open') {
      focusInputOrListbox(popupElement)
    }

    if (event.newState === 'closed') {
      // Only return focus if it was inside the popup when it closed
      if (popupElement.contains(document.activeElement)) {
        const comboboxElement = document.getElementById(comboboxId)
        comboboxElement?.focus()
      }
    }
  })
}
