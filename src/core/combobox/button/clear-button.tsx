import { Button } from '#src/core/button'
import { clearListboxValue } from '#src/utils/listbox'
import { CloseIcon } from '#src/icons/close'

import type { ButtonHTMLAttributes, MouseEventHandler } from 'react'

export namespace ComboboxButtonClearButton {
  export interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    /** Accessible label for the button. Defaults to "Clear selection". */
    'aria-label'?: string
    /** ID of the combobox listbox element cleared by this button. */
    'aria-controls': string
  }
}

/**
 * Secondary action button that clears the combobox selection. Used as a trailing action within
 * the combobox button container.
 */
export function ComboboxButtonClearButton({
  'aria-label': ariaLabel = 'Clear selection',
  'aria-controls': ariaControls,
  onClick,
  ...rest
}: ComboboxButtonClearButton.Props) {
  const handleClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    onClick?.(event)
    clearListboxValue(ariaControls)
  }

  return (
    <Button
      {...rest}
      aria-controls={ariaControls}
      aria-label={ariaLabel}
      hasNoPadding
      iconLeft={<CloseIcon />}
      onClick={handleClick}
      size="small"
      // Removed from tab order because this is primarily a visual addon
      tabIndex={-1}
      variant="tertiary"
    />
  )
}
