import { Menu } from '#src/core/menu'
import { TopBarAvatarButton } from '../avatar-button'
import { useId } from 'react'

import type { ButtonHTMLAttributes, ReactNode } from 'react'

export interface AvatarMenuProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** The menu items. */
  children: ReactNode
  /** The avatar's text. Typically the initials of the current user. */
  initials: ReactNode
  maxWidth?: `--size-${string}`
  maxHeight?: `--size-${string}`
}

/**
 * A combination of a `TopBar.AvatarButton` and `Menu`.
 */
export function TopBarAvatarMenu({ children, id, initials, maxWidth, maxHeight, ...rest }: AvatarMenuProps) {
  const triggerId = id ?? useId()
  const menuId = useId()
  return (
    <>
      <TopBarAvatarButton
        {...rest}
        {...Menu.getTriggerProps({ id: triggerId, popoverTarget: menuId, popoverTargetAction: 'toggle' })}
      >
        {initials}
      </TopBarAvatarButton>
      <Menu aria-labelledby={triggerId} id={menuId} maxWidth={maxWidth} maxHeight={maxHeight} placement="bottom-end">
        {children}
      </Menu>
    </>
  )
}
