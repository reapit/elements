import { Icon } from '../../icon'
import { TopBarNavIconItem } from '../../top-bar'

import type { ButtonHTMLAttributes, MouseEventHandler } from 'react'

interface AppSwitcherNavIconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  onClick: MouseEventHandler<HTMLButtonElement>
}

export function AppSwitcherNavIconButton({ 'aria-label': ariaLabel, ...rest }: AppSwitcherNavIconButtonProps) {
  return (
    <TopBarNavIconItem
      {...rest}
      aria-label={ariaLabel ?? 'App Switcher'}
      as="button"
      icon={<Icon icon="appSwitcher" />}
    />
  )
}
