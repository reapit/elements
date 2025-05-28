import { elSideBarSubmenuItem, ElSideBarSubmenuItemLabel } from './styles'
import { cx } from '@linaria/core'
import type { AnchorHTMLAttributes, ReactNode } from 'react'

interface SideBarSubmenuItemProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'aria-current'> {
  /**
   * The label of the menu item.
   */
  children: ReactNode
  /**
   * The URL to navigate to when this item is activated.
   */
  href: string
  /**
   * When the item represents the current page, `isActive` should be supplied to communicate to visual and accessible
   * users that the item is currently "selected".
   */
  isActive?: boolean
}

/**
 * A simple menu item for use in submenus within a `SideBar`. Is always an anchor element because side bar navigation
 * items should always navigate users to another page in the product.
 *
 * **Important:** ⚠️ This component should rarely be used directly. Instead, use `SideBar.SubmenuItem` as it wraps the
 * anchor element in a list item (`<li>`) to ensure good semantics and accessibility when used with `SideBar.Submenu`.
 *
 * To integrate this component with React Router, simply wrap `SideBar.SubmenuItem`. For example, with React Router 6,
 * you would do:
 *
 * ```
 * function MySideBarSubmenuItem({ to, ...props}) {
 *   const href = useHref(to)
 *   const isActive = useMatch(to)
 *   return (
 *     <SideBarSubmenu.Item {...props} href={href} isActive={isActive} />
 *   )
 * }
 * ```
 */
export function SideBarSubmenuItem({ children, className, isActive, ...props }: SideBarSubmenuItemProps) {
  return (
    <a {...props} aria-current={isActive ? 'page' : false} className={cx(elSideBarSubmenuItem, className)}>
      <ElSideBarSubmenuItemLabel>{children}</ElSideBarSubmenuItemLabel>
    </a>
  )
}
