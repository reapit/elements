import type { HTMLAttributes } from 'react'
import {
  ElNavSearchButton,
  ElNavSearchButtonIcon,
  ElNavSearchButtonPlaceholder,
  ElNavSearchButtonShortcutText,
} from './styles'

export interface NavSearchButton extends HTMLAttributes<HTMLButtonElement> {
  useShortcut?: boolean
}

export const NavSearchButton: React.FC<NavSearchButton> = ({ useShortcut = true, ...props }) => {
  return (
    <ElNavSearchButton {...props}>
      <ElNavSearchButtonIcon aria-hidden="true" />
      <ElNavSearchButtonPlaceholder>Search</ElNavSearchButtonPlaceholder>
      {useShortcut && <ElNavSearchButtonShortcutText>Ctrl + K</ElNavSearchButtonShortcutText>}
    </ElNavSearchButton>
  )
}
