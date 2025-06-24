import { DeprecatedIcon } from '../../deprecated-icon'
import { TopBarNavIconItemButton } from '../../top-bar'

import type { ButtonHTMLAttributes, MouseEventHandler } from 'react'

interface AppSwitcherNavIconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  onClick: MouseEventHandler<HTMLButtonElement>
}

export function AppSwitcherNavIconButton({ 'aria-label': ariaLabel, ...rest }: AppSwitcherNavIconButtonProps) {
  return (
    <TopBarNavIconItemButton
      {...rest}
      aria-label={ariaLabel ?? 'App Switcher'}
      icon={<DeprecatedIcon icon="appSwitcher" />}
    />
  )
}
