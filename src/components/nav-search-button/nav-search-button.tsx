import type { HTMLAttributes } from 'react'
import {
  ElNavSearchButton,
  ElNavSearchButtonContainer,
  ElNavSearchButtonIcon,
  ElNavSearchButtonPlaceholder,
  ElNavSearchButtonShortcutText,
} from './styles'
import { NavIconItem, type NavIconItemProps } from '../nav-icon-item'
import { Icon } from '../icon'

export interface NavSearchButton extends HTMLAttributes<HTMLButtonElement> {
  isShortcutVisible?: boolean
}

export const NavSearchButton: React.FC<NavSearchButton> = ({ isShortcutVisible = true, ...props }) => {
  return (
    <ElNavSearchButtonContainer>
      <NavIconItem {...(props as NavIconItemProps)} icon={<Icon icon="search" />} aria-label="nav-icon-item-example" />
      <ElNavSearchButton {...props}>
        <ElNavSearchButtonIcon aria-hidden="true" />
        <ElNavSearchButtonPlaceholder>Search</ElNavSearchButtonPlaceholder>
        {isShortcutVisible && <ElNavSearchButtonShortcutText>Ctrl + K</ElNavSearchButtonShortcutText>}
      </ElNavSearchButton>
    </ElNavSearchButtonContainer>
  )
}
