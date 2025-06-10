import { cx } from '@linaria/core'
import { ElTopBarNavIconItemBadge, ElTopBarNavIconItemIcon, elTopBarNavIconItem } from './styles'
import { Tooltip, useTooltip } from '../../tooltip'

import type { ButtonHTMLAttributes, MouseEventHandler, ReactNode } from 'react'

export interface TopBarNavIconItemButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * The accessible name of the nav icon item.
   */
  'aria-label': string
  /**
   * Optional badge to be displayed on the nav item
   */
  hasBadge?: boolean
  /**
   * The nav item's icon.
   */
  icon: ReactNode
  /**
   * Typically, clicking an button-based nav icon item will open a dropdown menu. If the item opens a drawer instead,
   * that should be handled via a navigation using an anchor-based nav icon item.
   */
  onClick: MouseEventHandler<HTMLButtonElement>
}

/**
 * A button-based, icon-only navigation item for use in the Top Bar's secondary navigation region. Typically,
 * button-based nav icon items will be used with a menu to group a number of related items.
 *
 * Button-based nav icon items do currently support an "active" state like their anchor-based counterparts.
 *
 * **Important:** Typically, this component will not be used directly. Instead, the `TopBar.NavIconItem` component
 * is preferred.
 */
export function TopBarNavIconItemButton({ className, icon, hasBadge, ...rest }: TopBarNavIconItemButtonProps) {
  const tooltip = useTooltip()
  return (
    <button {...tooltip.getTriggerProps(rest)} className={cx(elTopBarNavIconItem, className)}>
      <ElTopBarNavIconItemIcon aria-hidden="true">{icon}</ElTopBarNavIconItemIcon>
      {hasBadge && <ElTopBarNavIconItemBadge />}
      <Tooltip {...tooltip.getTooltipProps()} description={rest['aria-label']} position="bottom" />
    </button>
  )
}
