import { openComboboxPopup, useComboboxPopupState } from './popup-dialog'
import { useComboboxContext } from './context'

import type { MouseEventHandler } from 'react'

export namespace useComboboxButton {
  export interface Input {
    /**
     * Optional click handler provided by the consumer. This will be called
     * before the internal popup-showing logic.
     */
    onClick?: MouseEventHandler<HTMLButtonElement>
    /**
     * Placeholder text to display when no option is selected (or multiple options
     * are selected in multi-select mode).
     * @default 'Select an option'
     */
    placeholder?: string
  }

  export interface Output {
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
}

/**
 * Provides accessibility props, event handlers, and common data for combobox buttons.
 *
 * This hook encapsulates all the common logic shared across combobox button variants:
 * - ARIA attributes and event handlers
 * - Selected options and label text computation
 * - Context values needed for rendering
 *
 * Used by `Combobox.SelectButton`, `Combobox.AutocompleteButton`, and can be used
 * by custom button implementations.
 *
 * @param input - Configuration with optional onClick handler and placeholder text
 * @returns Object containing buttonProps to spread, plus selections, labelText, and context
 *
 * @example
 * ```tsx
 * const { buttonProps, labelText, hasSelection } = useComboboxButton({
 *   onClick: handleClick,
 *   placeholder: 'Choose...'
 * })
 * <button {...buttonProps}>{labelText}</button>
 * ```
 */
export function useComboboxButton({ onClick }: useComboboxButton.Input = {}): useComboboxButton.Output {
  const { buttonId, disabled, popupId, required } = useComboboxContext()

  const isExpanded = useComboboxPopupState(popupId)

  const handleClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    onClick?.(event)
    openComboboxPopup(popupId)
  }

  return {
    'aria-controls': popupId,
    'aria-expanded': isExpanded,
    // We use aria-required to indicate a value for the _combobox_ is required.
    // See https://www.w3.org/WAI/ARIA/apg/patterns/combobox/
    'aria-required': required,
    disabled,
    id: buttonId,
    onClick: handleClick,
  }
}
