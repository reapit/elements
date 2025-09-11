import { BreadcrumbItem } from './item'
import { BreadcrumbLink } from './link'
import { ElBreadcrumbs, ElBreadcrumbsList } from './styles'

import type { HTMLAttributes } from 'react'

export namespace Breadcrumbs {
  export interface Props extends HTMLAttributes<HTMLElement> {
    /**
     * Force the breadcrumb trail to grow to its maximum content width, or to 100% of its parent container.
     */
    overflow?: 'scroll' | 'truncate'
  }
}

/**
 * Breadcrumbs are used to indicate to the user their flow in the application and provide
 * a navigation back step to previous pages. By default, the breadcrumb trails behaviour changes
 * based on screen size.
 *
 * - In XS viewport or container sizes, the trail will grow to its maximum content
 *   width and be horizontally scrollable.
 * - In SM-2XL viewport or container sizes, the trail will grow to its parent container
 *   and truncate the text of each item using ellipses.
 *
 * This dynamic behaviour can be overridden by specifying the `width` property.
 */
export function Breadcrumbs({ children, overflow, ...rest }: Breadcrumbs.Props) {
  return (
    <ElBreadcrumbs {...rest} data-overflow={overflow}>
      <ElBreadcrumbsList>{children}</ElBreadcrumbsList>
    </ElBreadcrumbs>
  )
}

Breadcrumbs.Item = BreadcrumbItem
Breadcrumbs.Link = BreadcrumbLink

/** @deprecated use Breadcrumbs.Props instead */
export type BreadcrumbsProps = Breadcrumbs.Props
