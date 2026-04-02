import { ButtonBase } from './button-base'

import type { AnchorHTMLAttributes } from 'react'

export namespace AnchorButton {
  export interface Props extends ButtonBase.CommonProps, AnchorHTMLAttributes<HTMLAnchorElement> {
    /** The URL to which this anchor button navigates */
    href: string
  }
}

/**
 * A simple button component. Comes in two varieties: `AnchorButton`, which renders as an anchor element, and `Button`,
 * which renders as a button element.
 *
 * Use `AnchorButton` when you need button-like styling but want to navigate to a URL. Use `Button` when the action
 * needs to occur on click.
 */
export function AnchorButton(props: AnchorButton.Props) {
  return <ButtonBase as="a" {...props} />
}
