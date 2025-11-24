import { Button } from '#src/core/button'
import { clearSearchInput } from '../clear-search-input'
import { ClearIcon } from '#src/icons/clear'

import type { ButtonHTMLAttributes, MouseEventHandler } from 'react'

// NOTE: we omit...
// - onClick, because consumers shouldn't be able to override the click behaviour
// - type, because we want it pinned to "button" to prevent form submission
type AttributesToOmit = 'onClick' | 'type'

export namespace SearchInputClearButton {
  export interface Props extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, AttributesToOmit> {
    /** The ID of the search input to clear */
    'aria-controls': string
    /** The size of the clear button. */
    size: 'medium' | 'large'
  }
}

/**
 * A simple button used to clear a `SearchInput`.
 */
export function SearchInputClearButton({
  'aria-controls': ariaControls,
  size = 'medium',
  ...rest
}: SearchInputClearButton.Props) {
  const clearInput: MouseEventHandler<HTMLButtonElement> = () => {
    const inputElement = document.getElementById(ariaControls)
    if (inputElement instanceof HTMLInputElement) {
      clearSearchInput(inputElement)
      inputElement.focus()
    }
  }

  return (
    <Button
      {...rest}
      aria-controls={ariaControls}
      aria-label="Clear"
      hasNoPadding
      iconLeft={<ClearIcon />}
      onClick={clearInput}
      size={size}
      type="button"
      variant="tertiary"
    />
  )
}
