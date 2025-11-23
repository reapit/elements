import { openComboboxPopup, useComboboxPopupState } from './popup-dialog'
import { useComboboxContext } from './context'

import type { MouseEventHandler } from 'react'

export namespace useComboboxButtonProps {
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
 * Provides accessibility props and event handlers for a combobox button.
 *
 * Used by `Combobox.SelectButton` and `Combobox.AutocompleteButton`.
 *
 * @param input - Configuration with optional onClick handler
 * @returns Button props including ARIA attributes and click handler
 *
 * @example
 * ```tsx
 * const buttonProps = useComboboxButtonProps({ onClick: handleClick })
 * <button {...buttonProps}>Click me</button>
 * ```
 */
export function useComboboxButtonProps({ onClick }: useComboboxButtonProps.Input = {}): useComboboxButtonProps.Output {
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
