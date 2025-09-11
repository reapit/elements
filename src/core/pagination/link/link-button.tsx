import { PaginationLinkBase } from './link-base'

import type { ButtonHTMLAttributes } from 'react'
import type { PaginationLinkBase as PaginationLinkBaseType } from './link-base'

// NOTE: we omit...
// - children, because the previous page and next page buttons are icon-only buttons.
type AttributesToOmit = 'children'

export namespace PaginationLinkButton {
  export interface Props
    extends PaginationLinkBaseType.CommonProps,
      Omit<ButtonHTMLAttributes<HTMLButtonElement>, AttributesToOmit> {
    /**
     * Whether the button is disabled. This can be used to make the button appear disabled to users,
     * but still be focusable. This will typically be used when there is no next or previous page.
     */
    'aria-disabled'?: boolean | 'true' | 'false'
    /**
     * Whether the button is disabled or not. Unlike `aria-disabled`, buttons disabled with this prop will
     * not be focusable or interactive.
     */
    disabled?: boolean
  }
}

/**
 *
 */
export function PaginationLinkButton({ type = 'button', ...rest }: PaginationLinkButton.Props) {
  return <PaginationLinkBase {...rest} as="button" type={type} />
}

/** @deprecated Use PaginationLinkButton.Props instead */
export type PaginationLinkButtonProps = PaginationLinkButton.Props
