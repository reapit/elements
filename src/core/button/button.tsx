import { ButtonBase } from './button-base'

import type { ButtonHTMLAttributes } from 'react'
import type { ButtonBase as ButtonBaseNamespace } from './button-base'

export namespace Button {
  export interface Props extends ButtonBaseNamespace.CommonProps, ButtonHTMLAttributes<HTMLButtonElement> {
    /**
     * Whether the button is disabled or not. Unlike `aria-disabled`, buttons disabled with this prop will not be
     * focusable or interactive.
     */
    disabled?: boolean
  }
}

/**
 * A simple button component. Comes in two varieties: `Button`, which renders as a button element, and
 * `AnchorButton`, which renders as an anchor element.
 *
 * Use `Button` when the action needs to occur on click. Use `AnchorButton` when you need button-like styling but want
 * to navigate to a URL.
 */
export function Button(props: Button.Props) {
  return <ButtonBase as="button" {...props} />
}
