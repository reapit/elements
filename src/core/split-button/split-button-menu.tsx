import { Menu } from '#src/core/menu'
import { SplitButtonMenuButton } from './menu-button'
import { useId } from 'react'

import type { ComponentProps, ReactNode } from 'react'

export namespace SplitButtonMenu {
  export interface Props extends ComponentProps<typeof SplitButtonMenuButton> {
    /** The menu items to display in the menu */
    children: ReactNode
  }
}

/**
 * The menu for a `SplitButton`.
 */
export function SplitButtonMenu({ children, id, ...rest }: SplitButtonMenu.Props) {
  const triggerId = id ?? useId()
  const menuId = useId()
  return (
    <>
      <SplitButtonMenuButton
        {...rest}
        {...Menu.getTriggerProps({ id: triggerId, popoverTarget: menuId, popoverTargetAction: 'toggle' })}
      />
      <Menu aria-labelledby={triggerId} id={menuId} placement="bottom-end">
        {children}
      </Menu>
    </>
  )
}

SplitButtonMenu.displayName = 'SplitButton.Menu'
