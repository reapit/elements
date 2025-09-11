import { AppSwitcherIcon } from '#src/icons/app-switcher'
import { TopBarNavIconItemButton } from '../../top-bar'

import type { ButtonHTMLAttributes, MouseEventHandler } from 'react'

export namespace AppSwitcherNavIconButton {
  export interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    onClick?: MouseEventHandler<HTMLButtonElement>
  }
}

export function AppSwitcherNavIconButton({ 'aria-label': ariaLabel, ...rest }: AppSwitcherNavIconButton.Props) {
  return <TopBarNavIconItemButton {...rest} aria-label={ariaLabel ?? 'App Switcher'} icon={<AppSwitcherIcon />} />
}
