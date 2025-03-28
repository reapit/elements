import { FC, HTMLAttributes } from 'react'
import { ActionButton, MenuButton } from './split-button.atoms'
import { ElSplitButton } from './styles'

interface SplitButtonProps extends HTMLAttributes<HTMLDivElement> {}

interface SplitButtonFC extends FC<SplitButtonProps> {
  Action: typeof ActionButton
  Menu: typeof MenuButton
}

const SplitButton: SplitButtonFC = ({ children, ...props }) => {
  return <ElSplitButton {...props}>{children}</ElSplitButton>
}
SplitButton.Action = ActionButton
SplitButton.Menu = MenuButton

export { SplitButton }
