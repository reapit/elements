import { showComboboxPopup, useComboboxPopupState } from './popup'
import { useComboboxContext } from './context'
import { useComboboxSelectedOptions } from './use-selected-options'
import { useComboboxSelectionSummary } from './use-selection-summary'

import type { ComboboxSelectedOption } from './use-selected-options'
import type { MouseEventHandler } from 'react'

export namespace useComboboxButton {
  /**
   * Input parameters for the `useComboboxButton` hook.
   */
  export interface Input {
    /**
     * Optional click handler provided by the consumer. This will be called
     * before the internal popup-showing logic.
     */
    onClick?: MouseEventHandler<HTMLButtonElement>
    /**
     * Text to display when no selections have been made.
     */
    placeholder: string
  }

  /**
   * Output of the `useComboboxButton` hook containing props and state
   * needed by combobox button components.
   */
  export interface Output {
    /**
     * Props to spread onto the button element for accessibility and behavior.
     */
    props: {
      /** ID of the popup element controlled by this button */
      'aria-controls': string
      /** Whether the popup is currently open */
      'aria-expanded': boolean
      /** Whether a selection is required for the combobox */
      'aria-required': boolean
      /** Whether the button is disabled */
      disabled: boolean
      /** ID for the button element */
      id: string
      /** Click handler that triggers the popup and calls consumer's onClick */
      onClick: MouseEventHandler<HTMLButtonElement>
    }
    /**
     * Array of currently selected options with their labels and values.
     */
    selections: ComboboxSelectedOption[]
    /**
     * Human-readable summary of the current selection (e.g., "2 selected" or
     * the single selected option's label, or the placeholder).
     */
    selectionSummary: string
  }
}

/**
 * **INTERNAL USE ONLY**
 *
 * Provides props and state for a combobox button. This hook consolidates
 * the button's accessibility attributes, event handlers, and selection state
 * management.
 *
 * Used by `Combobox.SelectButton` and `Combobox.AutocompleteButton`.
 *
 * @param input - Configuration including optional onClick handler and placeholder text
 * @returns Object containing button props, current selections, and selection summary
 *
 * @example
 * ```tsx
 * const { props, selections, selectionSummary } = useComboboxButton({
 *   onClick: handleClick,
 *   placeholder: 'Select an option'
 * })
 * ```
 */
export function useComboboxButton({ onClick, placeholder }: useComboboxButton.Input): useComboboxButton.Output {
  const { buttonId, disabled, listboxId, popupId, required } = useComboboxContext()
  const selections = useComboboxSelectedOptions(listboxId)
  const selectionSummary = useComboboxSelectionSummary(selections, placeholder)
  const isExpanded = useComboboxPopupState(popupId)

  const handleClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    onClick?.(event)
    showComboboxPopup(popupId)
  }

  return {
    props: {
      'aria-controls': popupId,
      'aria-expanded': isExpanded,
      // We use aria-required to indicate a value for the _combobox_ is required.
      // See https://www.w3.org/WAI/ARIA/apg/patterns/combobox/
      'aria-required': required,
      disabled,
      id: buttonId,
      onClick: handleClick,
    },
    selections,
    selectionSummary,
  }
}
