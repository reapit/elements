import { cx } from '@linaria/core'
import { ElTopBarNavIconItemBadge, ElTopBarNavIconItemIcon, elTopBarNavIconItem } from './styles'
import { Tooltip, useTooltip } from '../../tooltip'

import type { AnchorHTMLAttributes, ReactNode } from 'react'

export interface TopBarNavIconItemAnchorProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  /**
   * The accessible name of the nav icon item.
   */
  'aria-label': string
  /**
   * Whether the nav item represents the current page.
   **/
  'aria-current': 'page' | false
  /**
   * Optional badge to be displayed on the nav item
   */
  hasBadge?: boolean
  /**
   * The nav item's icon.
   */
  icon: ReactNode
  /**
   * The URL to navigate to when the nav item is clicked.
   */
  href: string
}

/**
 * An anchor-based, icon-only navigation item for use in the Top Bar's secondary navigation region.
 *
 * Anchor-based nav icon items are typically used to navigate to a new page in the product.
 *
 * **Important:** Typically, this component will not be used directly. Instead, the `TopBar.NavIconItem` component
 * is preferred.
 */
export function TopBarNavIconItemAnchor({ className, icon, hasBadge, ...rest }: TopBarNavIconItemAnchorProps) {
  const tooltip = useTooltip()
  return (
    <a {...tooltip.getTriggerProps(rest)} className={cx(elTopBarNavIconItem, className)}>
      <ElTopBarNavIconItemIcon aria-hidden="true">{icon}</ElTopBarNavIconItemIcon>
      {hasBadge && <ElTopBarNavIconItemBadge />}
      <Tooltip {...tooltip.getTooltipProps()} description={rest['aria-label']} position="bottom" />
    </a>
  )
}
