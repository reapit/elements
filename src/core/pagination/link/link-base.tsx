import { ButtonBase } from '#src/core/button'
import { ChevronLeftIcon } from '#src/icons/chevron-left'
import { ChevronRightIcon } from '#src/icons/chevron-right'

import type { ButtonHTMLAttributes, HTMLAttributes } from 'react'

// NOTE: we omit...
// - children, because the previous page and next page buttons are icon-only buttons.
type AttributesToOmit = 'children'

export interface CommonPaginationLinkProps {
  variant: 'next-page' | 'previous-page'
}

export interface PaginationLinkBaseAsAnchorProps
  extends CommonPaginationLinkProps,
    Omit<HTMLAttributes<HTMLAnchorElement>, AttributesToOmit> {
  as: 'a'
  href: string
}

export interface PaginationLinkBaseAsButtonProps
  extends CommonPaginationLinkProps,
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, AttributesToOmit> {
  as: 'button'
}

export type PaginationLinkBaseProps = PaginationLinkBaseAsAnchorProps | PaginationLinkBaseAsButtonProps

/**
 *
 */
export function PaginationLinkBase({ variant, ...rest }: PaginationLinkBaseProps) {
  const icon = variant === 'next-page' ? <ChevronRightIcon /> : <ChevronLeftIcon />
  return <ButtonBase {...rest} iconLeft={icon} size="small" variant="tertiary" />
}
