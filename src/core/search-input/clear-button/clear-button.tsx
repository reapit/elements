import { Button } from '#src/core/button'
import { ClearIcon } from '#src/icons/clear'
import { CloseIcon } from '#src/icons/close'

import type { ButtonHTMLAttributes, MouseEventHandler } from 'react'

// NOTE: we omit...
// - onClick, because consumers shouldn't be able to override the click behaviour
// - type, because we want it pinned to "button" to prevent form submission
type AttributesToOmit = 'onClick' | 'type'

export namespace SearchInputClearButton {
  export interface Props extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, AttributesToOmit> {
    /** The ID of the search input to clear */
    'aria-controls': string
    /** The visual style of the input. */
    variant?: 'default' | 'borderless'
  }
}

/**
 * A simple button used to clear a `SearchInput`.
 */
export function SearchInputClearButton({
  'aria-controls': ariaControls,
  variant = 'default',
  ...rest
}: SearchInputClearButton.Props) {
  const clearInput: MouseEventHandler<HTMLButtonElement> = () => {
    const inputElement = document.getElementById(ariaControls)
    if (inputElement instanceof HTMLInputElement) {
      inputElement.value = ''
      // Dispatch an input event so that any onChange handlers are notified of the change.
      const inputEvent = new Event('input', { bubbles: true, cancelable: true })
      inputElement.dispatchEvent(inputEvent)
      inputElement.focus()
    }
  }

  return (
    <Button
      {...rest}
      aria-controls={ariaControls}
      aria-label="Clear"
      hasNoPadding
      iconLeft={variant === 'borderless' ? <ClearIcon /> : <CloseIcon />}
      onClick={clearInput}
      size="medium"
      type="button"
      variant="tertiary"
    />
  )
}
