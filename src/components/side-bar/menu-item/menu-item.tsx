import { cx } from '@linaria/core'
import { elSideBarMenuItem, ElSideBarMenuItemIcon, ElSideBarMenuItemLabel } from './styles'

import type { AnchorHTMLAttributes, ReactNode } from 'react'

interface SideBarMenuItemProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'aria-current'> {
  /** The label of the menu item */
  children: ReactNode
  /** The URL to navigate to when this item is activated. */
  href: string
  /** The icon to display next to the label. */
  icon: ReactNode
  /**
   * When the item represents the current page, `isActive` should be supplied to communicate to visual and accessible
   * users that the item is currently "selected".
   */
  isActive?: boolean
}

/**
 * Basic menu item for use in a `SideBar`. Is always an anchor element because side bar navigation items
 * should always navigate users to another page in the product. Note that this component is rarely used directly.
 * Instead, `SideBar.MenuItem` will typically be used as it wraps the anchor element in a list item (`<li>`).
 *
 * If trying to integrate submenu items with React Router, its best to wrap `SideBar.MenuItem` instead of
 * `SideBarMenuItem`, as the former will correctly render the link within a list item. For example, with
 * React Router 6, you would do:
 *
 * ```
 * function MySideBarMenuItem({ to, ...props}) {
 *   const href = useHref(to)
 *   const isActive = useMatch(to)
 *   return (
 *     <SideBar.MenuItem {...props} href={href} isActive={isActive} />
 *   )
 * }
 * ```
 */
export function SideBarMenuItem({ children, className, icon, id, isActive, ...props }: SideBarMenuItemProps) {
  return (
    <a {...props} aria-current={isActive ? 'page' : false} className={cx(elSideBarMenuItem, className)}>
      <ElSideBarMenuItemIcon aria-hidden>{icon}</ElSideBarMenuItemIcon>
      <ElSideBarMenuItemLabel>{children}</ElSideBarMenuItemLabel>
    </a>
  )
}
