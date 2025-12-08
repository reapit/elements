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
  }

  export interface Output {
    /** ID of the popup element controlled by this button */
    'aria-controls': string
    /** ID of element(s) describing the combobox */
    'aria-describedby'?: string
    /** ID of element providing error message for the combobox */
    'aria-errormessage'?: string
    /** Whether the popup is currently open */
    'aria-expanded': boolean
    /** Whether the combobox value is invalid */
    'aria-invalid'?: boolean | 'false' | 'true' | 'grammar' | 'spelling'
    /** Whether a selection is required for the combobox */
    'aria-required': boolean
    /** Whether the button is disabled */
    disabled: boolean
    /** ID for the button element */
    id: string
    /** Click handler that triggers the popup and calls consumer's onClick */
    onClick: MouseEventHandler<HTMLButtonElement>
    /** Role for the button element */
    role: 'combobox'
  }
}

/**
 * Returns accessibility props, event handlers, and common data for combobox buttons.
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
  const { ariaDescribedBy, ariaErrorMessage, ariaInvalid, comboboxId, disabled, popupId, required } =
    useComboboxContext()

  const isExpanded = useComboboxPopupState(popupId)

  const handleClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    onClick?.(event)
    openComboboxPopup(popupId)
  }

  return {
    'aria-controls': popupId,
    'aria-describedby': ariaDescribedBy,
    'aria-errormessage': ariaErrorMessage,
    'aria-expanded': isExpanded,
    'aria-invalid': ariaInvalid,
    // We use aria-required to indicate a value for the _combobox_ is required.
    // See https://www.w3.org/WAI/ARIA/apg/patterns/combobox/
    'aria-required': required,
    disabled,
    id: comboboxId,
    onClick: handleClick,
    role: 'combobox',
  }
}
