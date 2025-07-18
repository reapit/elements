import { ButtonBase } from './button-base'

import type { ButtonHTMLAttributes } from 'react'
import type { CommonButtonBaseProps } from './button-base'

export interface ButtonProps extends CommonButtonBaseProps, ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Whether the button is disabled or not. Unlike `aria-disabled`, buttons disabled with this prop will not be
   * focusable or interactive.
   */
  disabled?: boolean
}

/**
 * A simple button component. Comes in two varieties: `Button`, which renders as a button element, and
 * `AnchorButton`, which renders as an anchor element.
 *
 * Use `Button` when the action needs to occur on click. Use `AnchorButton` when you need button-like styling but want
 * to navigate to a URL.
 */
export function Button(props: ButtonProps) {
  return <ButtonBase as="button" {...props} />
}
