import { cx } from '@linaria/core'
import { ElTopBarNavIconItemBadge, ElTopBarNavIconItemIcon, elTopBarNavIconItem } from './styles'
import { DeprecatedTooltip, useDeprecatedTooltip } from '#src/deprecated/tooltip'

import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'

interface TopBarNavIconItemCommonProps {
  hasBadge?: boolean
  icon: ReactNode
}

export interface TopBarNavIconItemAsAnchorProps
  extends TopBarNavIconItemCommonProps,
    AnchorHTMLAttributes<HTMLAnchorElement> {
  'aria-label': string
  as: 'a'
}

export interface TopBarNavIconItemAsButtonProps
  extends TopBarNavIconItemCommonProps,
    ButtonHTMLAttributes<HTMLButtonElement> {
  'aria-label': string
  as: 'button'
}

export type TopBarNavIconItemBaseProps = TopBarNavIconItemAsAnchorProps | TopBarNavIconItemAsButtonProps

/**
 * A simple polymorphic icon-only nav item that can render as a button or link. It is used internally by the
 * `TopBar.NavIconItemAnchor` and `TopBar.NavIconItemButton` components and should not be used directly by consumers.
 */
export function TopBarNavIconItemBase({ as: Element, className, icon, hasBadge, ...rest }: TopBarNavIconItemBaseProps) {
  const tooltip = useDeprecatedTooltip()
  return (
    <Element {...tooltip.getTriggerProps(rest)} className={cx(elTopBarNavIconItem, className)}>
      <ElTopBarNavIconItemIcon aria-hidden="true">{icon}</ElTopBarNavIconItemIcon>
      {hasBadge && <ElTopBarNavIconItemBadge />}
      <DeprecatedTooltip {...tooltip.getTooltipProps()} description={rest['aria-label']} position="bottom" />
    </Element>
  )
}
