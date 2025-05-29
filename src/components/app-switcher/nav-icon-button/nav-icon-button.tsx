import { MouseEvent, useCallback } from 'react'
import { Icon } from '../../icon'
import { NavIconItem } from '../../nav-icon-item'

type AppSwitcherNavIconButtonProps = {
  onClick?: (event: MouseEvent<HTMLButtonElement> | MouseEvent<HTMLAnchorElement>) => void
  'aria-expanded'?: boolean
}

export default function AppSwitcherNavIconButton(props: AppSwitcherNavIconButtonProps) {
  const { onClick, 'aria-expanded': isSelected } = props

  const handleClick = useCallback(
    (event: MouseEvent<HTMLButtonElement> | MouseEvent<HTMLAnchorElement>) => {
      onClick?.(event)
    },
    [onClick],
  )

  return (
    <NavIconItem
      aria-label="app switcher"
      icon={<Icon icon="appSwitcher" />}
      isActive={isSelected}
      onClick={handleClick}
    />
  )
}
