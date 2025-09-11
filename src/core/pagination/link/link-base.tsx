import { ButtonBase } from '#src/core/button'
import { ChevronLeftIcon } from '#src/icons/chevron-left'
import { ChevronRightIcon } from '#src/icons/chevron-right'

import type { ButtonHTMLAttributes, HTMLAttributes } from 'react'

// NOTE: we omit...
// - children, because the previous page and next page buttons are icon-only buttons.
type AttributesToOmit = 'children'

export namespace PaginationLinkBase {
  export interface CommonProps {
    variant: 'next-page' | 'previous-page'
  }

  export interface AsAnchorProps extends CommonProps, Omit<HTMLAttributes<HTMLAnchorElement>, AttributesToOmit> {
    as: 'a'
    href: string
  }

  export interface AsButtonProps extends CommonProps, Omit<ButtonHTMLAttributes<HTMLButtonElement>, AttributesToOmit> {
    as: 'button'
  }

  export type Props = AsAnchorProps | AsButtonProps
}

/** @deprecated Use PaginationLinkBase.CommonProps instead */
export type CommonPaginationLinkProps = PaginationLinkBase.CommonProps

/** @deprecated Use PaginationLinkBase.AsAnchorProps instead */
export type PaginationLinkBaseAsAnchorProps = PaginationLinkBase.AsAnchorProps

/** @deprecated Use PaginationLinkBase.AsButtonProps instead */
export type PaginationLinkBaseAsButtonProps = PaginationLinkBase.AsButtonProps

/** @deprecated Use PaginationLinkBase.Props instead */
export type PaginationLinkBaseProps = PaginationLinkBase.Props

/**
 *
 */
export function PaginationLinkBase({ variant, ...rest }: PaginationLinkBase.Props) {
  const icon = variant === 'next-page' ? <ChevronRightIcon /> : <ChevronLeftIcon />
  return <ButtonBase {...rest} iconLeft={icon} size="small" variant="tertiary" />
}
