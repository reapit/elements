import { ChevronRightIcon } from '#src/icons/chevron-right'
import { ElBreadcrumbItem, ElBreadcrumbItemSeparator } from './styles'

import type { HTMLAttributes, ReactNode } from 'react'

export namespace BreadcrumbItem {
  export interface Props extends HTMLAttributes<HTMLLIElement> {
    /**
     * The content of the breadcrumb item. Typically a `Breadcrumb.Link`.
     */
    children: ReactNode
  }
}

/**
 * A breadcrumb item component that provides a chevron separator for navigation hierarchy within the breadcrumb trail.
 * Will typically be provided a single `Breadcrumb.Link` as its child.
 */
export function BreadcrumbItem({ children, ...rest }: BreadcrumbItem.Props) {
  return (
    <ElBreadcrumbItem {...rest}>
      {children}
      <ElBreadcrumbItemSeparator aria-hidden>
        <ChevronRightIcon />
      </ElBreadcrumbItemSeparator>
    </ElBreadcrumbItem>
  )
}

// Backward compatibility
export type BreadcrumbItemProps = BreadcrumbItem.Props
