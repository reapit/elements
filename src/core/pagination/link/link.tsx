import { PaginationLinkBase } from './link-base'

import type { CommonPaginationLinkProps } from './link-base'
import type { HTMLAttributes } from 'react'

// NOTE: we omit...
// - children, because the previous page and next page buttons are icon-only buttons.
type AttributesToOmit = 'children'

interface PaginationLinkProps
  extends CommonPaginationLinkProps,
    Omit<HTMLAttributes<HTMLAnchorElement>, AttributesToOmit> {
  /**
   * Whether the button is disabled. This can be used to make the button appear disabled to users,
   * but still be focusable. This will typically be used when there is no next or previous page.
   */
  'aria-disabled'?: boolean
  /** The URL of the next or previous page to navigate to. */
  href: string
}

/**
 *
 */
export function PaginationLink(props: PaginationLinkProps) {
  return <PaginationLinkBase {...props} as="a" />
}
