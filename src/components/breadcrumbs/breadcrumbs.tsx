import type { AnchorHTMLAttributes, FC, HTMLAttributes } from 'react'
import {
  ElBreadcrumbs,
  ElBreadcrumbsItem,
  ElBreadcrumbsItemChevron,
  elBreadcrumbsLink,
  ElBreadcrumbsList,
} from './styles'

type BreadcrumbsFC = FC<HTMLAttributes<HTMLElement>> & {
  Item: FC<HTMLAttributes<HTMLLIElement>>
  Link: FC<AnchorHTMLAttributes<HTMLAnchorElement>>
}

/**
 * Breadcrumbs are used to indicate to the user their flow in the application
 * and provide a navigation back step to previous pages.
 */
const Breadcrumbs: BreadcrumbsFC = ({ children, ...props }) => {
  return (
    <ElBreadcrumbs {...props}>
      <ElBreadcrumbsList>{children}</ElBreadcrumbsList>
    </ElBreadcrumbs>
  )
}

Breadcrumbs.Item = ({ children, ...props }) => {
  return (
    <ElBreadcrumbsItem {...props}>
      {children}
      <ElBreadcrumbsItemChevron icon="chevronRight" />
    </ElBreadcrumbsItem>
  )
}

Breadcrumbs.Link = ({ children, ...props }) => {
  return (
    <a className={elBreadcrumbsLink} {...props}>
      {children}
    </a>
  )
}

export { Breadcrumbs }
