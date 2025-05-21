import {
  ElNavSearchButton,
  ElNavSearchButtonContainer,
  ElNavSearchButtonIcon,
  ElNavSearchButtonPlaceholder,
  ElNavSearchButtonShortcutText,
  ElNavSearchIconItem,
} from './styles'
import { Icon } from '../icon'

import type { HTMLAttributes, MouseEventHandler } from 'react'

export interface NavSearchButton extends HTMLAttributes<HTMLButtonElement> {
  onClick: MouseEventHandler<HTMLButtonElement>
  isShortcutVisible?: boolean
}

export const NavSearchButton: React.FC<NavSearchButton> = ({ isShortcutVisible = true, onClick, ...props }) => {
  return (
    <ElNavSearchButtonContainer>
      {/* NOTE: The display of these two buttons, ElNavSearchIconItem and ElNavSearchButton, is controlled
       * by their respective CSS based on the size of their container. */}
      <ElNavSearchIconItem {...props} aria-label="Search" onClick={onClick} icon={<Icon icon="search" />} />
      <ElNavSearchButton {...props} onClick={onClick} type="button">
        <ElNavSearchButtonIcon aria-hidden="true" />
        <ElNavSearchButtonPlaceholder>Search</ElNavSearchButtonPlaceholder>
        {isShortcutVisible && <ElNavSearchButtonShortcutText>Ctrl + K</ElNavSearchButtonShortcutText>}
      </ElNavSearchButton>
    </ElNavSearchButtonContainer>
  )
}
