import { cx } from '@linaria/core'
import { ElTopBarNavItemLabel, elTopBarNavItem } from './styles'

import type { AnchorHTMLAttributes } from 'react'

interface TopBarNavItemProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  /**
   * The URL to navigate to when this item is activated.
   */
  href: string
  /**
   * When the item represents the current page, `isActive` should be supplied to communicate to visual and accessible
   * users that the item is currently "selected".
   **/
  isActive?: boolean
}

/**
 * A simple navigation item for use in the Top Bar's main navigation region. It is always an anchor element because
 * main navigation items should always navigate users to another page in the product.
 *
 * **Important:** ⚠️ This component should rarely be used directly. Instead, use `TopBar.NavItem` as it wraps the
 * anchor element in a list item (`<li>`) to ensure good semantics and accessibility when used with `SideBar.MainNav`.
 *
 * To integrate this component with React Router, simply wrap `TopBar.NavItem`. For example, with React Router 6,
 * you would do:
 *
 * ```tsx
 * function MyTopBarNavItem({ to, ...rest}) {
 *   const href = useHref(to)
 *   const isActive = useMatch(to)
 *   return (
 *     <TopBar.NavItem {...rest} href={href} isActive={isActive} />
 *   )
 * }
 * ```
 */
export function TopBarNavItem({ children, className, isActive, ...rest }: TopBarNavItemProps) {
  return (
    <a {...rest} aria-current={isActive ? 'page' : false} className={cx(elTopBarNavItem, className)}>
      <ElTopBarNavItemLabel>{children}</ElTopBarNavItemLabel>
    </a>
  )
}
