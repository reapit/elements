import { Icon } from '../../icon'
import { NavIconItem } from '../../nav-icon-item'

import type { ButtonHTMLAttributes, MouseEventHandler } from 'react'

interface AppSwitcherNavIconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  onClick: MouseEventHandler<HTMLButtonElement>
}

export function AppSwitcherNavIconButton({ 'aria-label': ariaLabel, ...props }: AppSwitcherNavIconButtonProps) {
  return (
    <NavIconItem
      {...props}
      aria-label={ariaLabel ?? 'App Switcher'}
      icon={<Icon icon="appSwitcher" />}
      isActive={props['aria-expanded'] === 'true' || props['aria-expanded'] === true}
    />
  )
}
