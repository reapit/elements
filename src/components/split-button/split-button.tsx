import { FC, HTMLAttributes } from 'react'
import { ActionButton, MenuButton } from './split-button.atoms'
import { ElSplitButton } from './styles'

interface SplitButtonProps extends HTMLAttributes<HTMLDivElement> {}

interface SplitButtonFC extends FC<SplitButtonProps> {
  Action: typeof ActionButton
  Menu: typeof MenuButton
}

/**
 * SplitButton component:
 * This component combines the two button components.
 * 1- Action or Primary button.
 * 2- Menu button.
 */
const SplitButton: SplitButtonFC = ({ children, ...props }) => {
  return <ElSplitButton {...props}>{children}</ElSplitButton>
}
SplitButton.Action = ActionButton
SplitButton.Menu = MenuButton

export { SplitButton }
