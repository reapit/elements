import type { HTMLAttributes } from 'react'
import { Icon } from '../icon'
import { NavIconItem, NavIconItemProps } from '../nav-icon-item'
import {
  ElNavSearchButton,
  ElNavSearchButtonContainer,
  ElNavSearchButtonIcon,
  ElNavSearchButtonPlaceholder,
  ElNavSearchButtonShortcutText,
} from './styles'

export interface NavSearchButton extends HTMLAttributes<HTMLButtonElement> {
  isShortcutVisible?: boolean
}

export const NavSearchButton: React.FC<NavSearchButton> = ({ isShortcutVisible = true, ...props }) => {
  return (
    <ElNavSearchButtonContainer>
      <NavIconItem
        {...(props as NavIconItemProps)}
        icon={<Icon icon="search" fontSize="1rem" />}
        aria-label="nav-icon-item-example"
      />
      <ElNavSearchButton {...props}>
        <ElNavSearchButtonIcon aria-hidden="true" />
        <ElNavSearchButtonPlaceholder>Search</ElNavSearchButtonPlaceholder>
        {isShortcutVisible && <ElNavSearchButtonShortcutText>Ctrl + K</ElNavSearchButtonShortcutText>}
      </ElNavSearchButton>
    </ElNavSearchButtonContainer>
  )
}
