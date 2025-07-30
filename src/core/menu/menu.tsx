import { AnchorMenuItem, MenuItem } from './item'
import { ElMenuContent } from './styles'
import { MenuDivider } from './divider'
import { MenuGroup } from './group'
import { Popover } from '#src/utils/popover'

import type { HTMLAttributes } from 'react'

// Make this helper available for convenience.
export { getPopoverTriggerProps as getMenuTriggerProps } from '#src/utils/popover'

// NOTE: We omit...
// - role, because the Menu's role should always be "menu".
type AttributesToOmit = 'role'

export interface MenuProps extends Omit<HTMLAttributes<HTMLDivElement>, AttributesToOmit> {
  /** The element that labels this menu. This should be the element that controls the menu. */
  'aria-labelledby': string
  /** The ID of the menu. */
  id: string
  /** The gap between the popover and the anchor. */
  gap?: `--spacing-${string}`
  /** The maximum height of the menu. By default, the menu will be as tall as its content requires. */
  maxHeight?: `--size-${string}`
  /** The maximum width of the menu. By default, the menu will be as wide as its widest item. */
  maxWidth?: `--size-${string}`
  /** Where the popover should be placed relative to its anchor. */
  placement?: 'top-start' | 'top' | 'top-end' | 'bottom-start' | 'bottom' | 'bottom-end'
}

/**
 * Menus provide a list of options to help users navigate, or perform actions. A menu is typically
 * triggered by a button. Designed for use with the
 * [Popover API](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API).
 */
export function Menu({
  'aria-labelledby': ariaLabelledBy,
  children,
  gap = '--spacing-1',
  maxHeight,
  maxWidth,
  placement = 'top-start',
  ...rest
}: MenuProps) {
  return (
    <Popover
      {...rest}
      aria-labelledby={ariaLabelledBy}
      anchorId={ariaLabelledBy}
      elevation="xl"
      gap={`var(${gap})`}
      maxHeight={`var(${maxHeight})`}
      maxWidth={`var(${maxWidth})`}
      placement={placement}
      positionTryFallbacks="flip-block, flip-inline"
      popover="auto"
      role="menu"
    >
      <ElMenuContent>{children}</ElMenuContent>
    </Popover>
  )
}

Menu.AnchorItem = AnchorMenuItem
Menu.Divider = MenuDivider
Menu.Group = MenuGroup
Menu.Item = MenuItem
