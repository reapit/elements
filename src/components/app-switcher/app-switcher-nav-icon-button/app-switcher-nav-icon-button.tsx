import { MouseEvent, useCallback } from 'react'
import { Icon } from '../../icon'
import { ElAppSwitcherNavIconButton } from './styles'

export default function AppSwitcherNavIconButton(props) {
  const { onClick, 'aria-expanded': isSelected } = props

  const handleClick = useCallback(
    (event: MouseEvent<HTMLButtonElement> | MouseEvent<HTMLAnchorElement>) => {
      onClick?.(event)
    },
    [onClick],
  )

  return (
    <ElAppSwitcherNavIconButton onClick={handleClick} data-selected={isSelected}>
      <Icon icon="appSwitcher" />
    </ElAppSwitcherNavIconButton>
  )
}
