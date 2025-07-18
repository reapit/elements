import { ElBreadcrumbLink, ElBreadcrumbLinkContent } from './styles'

import type { AnchorHTMLAttributes, ReactNode } from 'react'

export interface BreadcrumbLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  /**
   * The text content to be hyperlinked to the specified URL.
   */
  children: ReactNode
  /**
   * The URL to navigate to when the link is clicked.
   */
  href: string
}

/**
 * A breadcrumb link specifically designed for use within breadcrumb navigation.
 */
export function BreadcrumbLink({ children, ...rest }: BreadcrumbLinkProps) {
  return (
    <ElBreadcrumbLink {...rest}>
      {/* NOTE: We wrap the children so that our text-overflow behaviour does not also clip the focus outline */}
      <ElBreadcrumbLinkContent>{children}</ElBreadcrumbLinkContent>
    </ElBreadcrumbLink>
  )
}
