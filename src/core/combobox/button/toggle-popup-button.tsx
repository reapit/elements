import { Button } from '#src/core/button'
import { ChevronDownIcon } from '#src/icons/chevron-down'
import { toggleComboboxPopup } from '../popup'

import type { ButtonHTMLAttributes, MouseEventHandler } from 'react'

export namespace ComboboxButtonTogglePopupButton {
  export interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    /** Accessible label for the button. Defaults to "Toggle popup". */
    'aria-label'?: string
    /** ID of the popup element controlled by this button. */
    'aria-controls': string
  }
}

/**
 * Secondary action button that toggles combobox popup visibility. Used as a trailing action within
 * the combobox button container.
 */
export function ComboboxButtonTogglePopupButton({
  'aria-label': ariaLabel = 'Toggle popup',
  'aria-controls': ariaControls,
  onClick,
  ...rest
}: ComboboxButtonTogglePopupButton.Props) {
  const handleClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    onClick?.(event)
    toggleComboboxPopup(ariaControls)
  }

  return (
    <Button
      {...rest}
      aria-controls={ariaControls}
      aria-label={ariaLabel}
      hasNoPadding
      iconLeft={<ChevronDownIcon />}
      onClick={handleClick}
      size="small"
      // Removed from tab order because this is primarily a visual addon
      tabIndex={-1}
      variant="tertiary"
    />
  )
}
