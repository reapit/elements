import type { AnchorHTMLAttributes, FC, HTMLAttributes } from 'react'
import { ElBreadcrumbs, ElBreadcrumbItem, ElBreadcrumbItemChevron, elBreadcrumbLink } from './styles'

type BreadcrumbsFC = FC<HTMLAttributes<HTMLUListElement>> & {
  Item: FC<HTMLAttributes<HTMLLIElement>>
  Link: FC<AnchorHTMLAttributes<HTMLAnchorElement>>
}

/**
 * Breadcrumbs are used to indicate to the user their flow in the application
 * and provide a navigation back step to previous pages.
 */
const Breadcrumbs: BreadcrumbsFC = ({ children, ...props }) => {
  return (
    <nav>
      <ElBreadcrumbs {...props}>{children}</ElBreadcrumbs>
    </nav>
  )
}

Breadcrumbs.Item = ({ children, ...props }) => {
  return (
    <ElBreadcrumbItem {...props}>
      {children}
      <ElBreadcrumbItemChevron icon="chevronRight" />
    </ElBreadcrumbItem>
  )
}

Breadcrumbs.Link = ({ children, ...props }) => {
  return (
    <a className={elBreadcrumbLink} {...props}>
      {children}
    </a>
  )
}

export { Breadcrumbs }
