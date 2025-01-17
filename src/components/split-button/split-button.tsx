import { FC, HTMLAttributes } from 'react'
import { ActionButton, MenuButton } from './split-button.atoms'
import { ElSplitButton } from './styles'

type SplitButtonFC = FC<
  HTMLAttributes<HTMLDivElement> & {
    'data-variant'?: 'primary' | 'secondary'
    'data-size'?: 'small' | 'medium' | 'large'
  }
> & {
  Action: typeof ActionButton
  Menu: typeof MenuButton
}

const SplitButton: SplitButtonFC = ({ children, ...props }) => {
  return <ElSplitButton {...props}>{children}</ElSplitButton>
}
SplitButton.Action = ActionButton
SplitButton.Menu = MenuButton

export { SplitButton }
