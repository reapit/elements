import { Menu } from '#src/core/menu'
import { SplitButtonMenuButton } from './menu-button'

import { useId, type ComponentProps, type ReactNode } from 'react'

interface SplitButtonMenuProps extends ComponentProps<typeof SplitButtonMenuButton> {
  /** The menu items to display in the menu */
  children: ReactNode
}

/**
 * The menu for a `SplitButton`.
 */
export function SplitButtonMenu({ children, id, ...rest }: SplitButtonMenuProps) {
  const triggerId = id ?? useId()
  const menuId = useId()
  return (
    <>
      <SplitButtonMenuButton
        {...rest}
        {...Menu.getMenuTriggerProps({ id: triggerId, popoverTarget: menuId, popoverTargetAction: 'toggle' })}
      />
      <Menu aria-labelledby={triggerId} id={menuId} placement="bottom-end">
        {children}
      </Menu>
    </>
  )
}
