import { Menu } from '#src/components/menu'
import { SplitButtonMenuButton } from './menu-button'

import type { ComponentProps, ReactNode } from 'react'

interface SplitButtonMenuProps extends ComponentProps<typeof SplitButtonMenuButton> {
  /** The menu items to display in the menu */
  children: ReactNode
}

/**
 * The menu for a `SplitButton`.
 */
export function SplitButtonMenu({ children, ...rest }: SplitButtonMenuProps) {
  return (
    <Menu data-alignment="right">
      <Menu.Trigger>{({ getTriggerProps }) => <SplitButtonMenuButton {...getTriggerProps(rest)} />}</Menu.Trigger>
      <Menu.Popover>
        <Menu.List>{children}</Menu.List>
      </Menu.Popover>
    </Menu>
  )
}
