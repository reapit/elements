import { cx } from '@linaria/core'
import { ElTopBarNavItemLabel, elTopBarNavItem } from './styles'

import type { AnchorHTMLAttributes } from 'react'

export namespace TopBarNavItem {
  export interface Props extends AnchorHTMLAttributes<HTMLAnchorElement> {
    /**
     * Whether the nav item represents the current page.
     */
    'aria-current': 'page' | false
    /**
     * The URL to navigate to when this item is activated.
     */
    href: string
  }
}

/**
 * A simple navigation item for use in the Top Bar's main navigation region. It is always an anchor element because
 * main navigation items should always navigate users to another page in the product.
 *
 * **Important:** ⚠️ Ensure you use this component via `TopBar.NavItem` as it wraps the anchor element in a list item
 * (`<li>`) to ensure good semantics and accessibility when used with `TopBar.MainNav`.
 *
 * To integrate this component with React Router, simply wrap `TopBar.NavItem`. For example, with React Router 6,
 * you would do:
 *
 * ```tsx
 * function MyTopBarNavItem({ to, ...rest}) {
 *   const href = useHref(to)
 *   const isCurrentPage = useMatch(to)
 *   return (
 *     <TopBar.NavItem {...rest} aria-current={isCurrentPage ? 'page' : false} href={href} />
 *   )
 * }
 * ```
 */
export function TopBarNavItem({ 'aria-current': ariaCurrent, children, className, ...rest }: TopBarNavItem.Props) {
  return (
    <a {...rest} aria-current={ariaCurrent} className={cx(elTopBarNavItem, className)}>
      <ElTopBarNavItemLabel>{children}</ElTopBarNavItemLabel>
    </a>
  )
}
