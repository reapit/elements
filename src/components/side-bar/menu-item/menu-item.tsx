import { cx } from '@linaria/core'
import { elSideBarMenuItem, ElSideBarMenuItemIcon, ElSideBarMenuItemLabel } from './styles'

import type { AnchorHTMLAttributes, ReactNode } from 'react'

// We don't want:
// - `aria-current` because it is always derived from the `isActive` prop.
type AttributesToOmit = 'aria-current'

interface SideBarMenuItemProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, AttributesToOmit> {
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
 * Standard menu item for use in a `SideBar`. Is always an anchor element because side bar navigation
 * items should always navigate users to another page in the product.
 *
 * **Important:** ⚠️ This component should rarely be used directly. Instead, use `SideBar.MenuItem` as it wraps the
 * anchor element in a list item (`<li>`) to ensure good semantics and accessibility when used with `SideBar.MenuList`.
 *
 * To integrate this component with React Router, simply wrap `SideBar.MenuItem`. For example, with React Router 6,
 * you would do:
 *
 * ```
 * function MySideBarMenuItem({ to, ...rest}) {
 *   const href = useHref(to)
 *   const isActive = useMatch(to)
 *   return (
 *     <SideBarMenu.Item {...rest} href={href} isActive={isActive} />
 *   )
 * }
 * ```
 */
export function SideBarMenuItem({ children, className, icon, isActive, ...rest }: SideBarMenuItemProps) {
  return (
    <a {...rest} aria-current={isActive ? 'page' : false} className={cx(elSideBarMenuItem, className)}>
      <ElSideBarMenuItemIcon aria-hidden>{icon}</ElSideBarMenuItemIcon>
      <ElSideBarMenuItemLabel>{children}</ElSideBarMenuItemLabel>
    </a>
  )
}
