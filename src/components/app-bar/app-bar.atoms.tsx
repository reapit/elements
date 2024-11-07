import type { HTMLAttributes } from 'react'
import {
  ElNavSearchButton,
  ElNavSearchButtonIcon,
  ElNavSearchButtonPlaceholder,
  ElNavSearchButtonShortcutText,
} from './styles'

export interface NavSearchButton extends HTMLAttributes<HTMLButtonElement> {}

export const NavSearchButton: React.FC<NavSearchButton> = (props) => {
  return (
    <ElNavSearchButton {...props}>
      <ElNavSearchButtonIcon icon="search" />
      <ElNavSearchButtonPlaceholder>Search</ElNavSearchButtonPlaceholder>
      <ElNavSearchButtonShortcutText>Ctrl + K</ElNavSearchButtonShortcutText>
    </ElNavSearchButton>
  )
}
