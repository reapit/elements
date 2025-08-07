import { cx } from '@linaria/core'
import { elSideBarMenuItem, ElSideBarMenuItemIcon, ElSideBarMenuItemLabel } from './styles'
import { Tooltip } from '#src/core/tooltip'
import { useId } from 'react'

import type { AnchorHTMLAttributes, ReactNode } from 'react'

interface SideBarMenuItemProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  /**
   * When the item represents the current page, `aria-current="page"` should be supplied to communicate to visual and
   * accessible users that the item is currently "selected".
   */
  'aria-current': 'page' | false
  /** The label of the menu item */
  children: ReactNode
  /** The URL to navigate to when this item is activated. */
  href: string
  /** The icon to display next to the label. */
  icon: ReactNode
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
 *   const isCurrentPage = useMatch(to)
 *   return (
 *     <SideBarMenu.Item {...rest} href={href} aria-current={isCurrentPage ? 'page' : false} />
 *   )
 * }
 * ```
 */
export function SideBarMenuItem({
  'aria-current': ariaCurrent,
  children,
  className,
  icon,
  id,
  ...rest
}: SideBarMenuItemProps) {
  const tooltipId = useId()
  const triggerId = id ?? useId()
  const truncationTargetId = useId()

  return (
    <a
      {...rest}
      {...Tooltip.getTriggerProps({ id: triggerId, tooltipId, tooltipPurpose: 'label' })}
      aria-current={ariaCurrent}
      className={cx(elSideBarMenuItem, className)}
    >
      <ElSideBarMenuItemIcon aria-hidden>{icon}</ElSideBarMenuItemIcon>
      <ElSideBarMenuItemLabel id={truncationTargetId}>{children}</ElSideBarMenuItemLabel>
      <Tooltip id={tooltipId} placement="right" triggerId={triggerId} truncationTargetId={truncationTargetId}>
        {children}
      </Tooltip>
    </a>
  )
}
