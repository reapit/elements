import type { HTMLAttributes } from 'react'
import {
  ElNavSearchButton,
  ElNavSearchButtonIcon,
  ElNavSearchButtonPlaceholder,
  ElNavSearchButtonShortcutText,
} from './styles'

export interface NavSearchButton extends HTMLAttributes<HTMLButtonElement> {
  isShortcutVisible?: boolean
}

export const NavSearchButton: React.FC<NavSearchButton> = ({ isShortcutVisible = true, ...props }) => {
  return (
    <ElNavSearchButton {...props}>
      <ElNavSearchButtonIcon aria-hidden="true" />
      <ElNavSearchButtonPlaceholder>Search</ElNavSearchButtonPlaceholder>
      {isShortcutVisible && <ElNavSearchButtonShortcutText>Ctrl + K</ElNavSearchButtonShortcutText>}
    </ElNavSearchButton>
  )
}
