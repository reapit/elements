import { DeprecatedMenu } from '#src/deprecated/menu'
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
    <DeprecatedMenu data-alignment="right">
      <DeprecatedMenu.Trigger>
        {({ getTriggerProps }) => <SplitButtonMenuButton {...getTriggerProps(rest)} />}
      </DeprecatedMenu.Trigger>
      <DeprecatedMenu.Popover>
        <DeprecatedMenu.List>{children}</DeprecatedMenu.List>
      </DeprecatedMenu.Popover>
    </DeprecatedMenu>
  )
}
