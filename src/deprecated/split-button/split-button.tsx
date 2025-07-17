import { FC, HTMLAttributes } from 'react'
import { DeprecatedActionButton, DeprecatedMenuButton } from './split-button.atoms'
import { ElDeprecatedSplitButton } from './styles'

/** @deprecated */
interface DeprecatedSplitButtonProps extends HTMLAttributes<HTMLDivElement> {}

/** @deprecated */
interface DeprecatedSplitButtonFC extends FC<DeprecatedSplitButtonProps> {
  Action: typeof DeprecatedActionButton
  Menu: typeof DeprecatedMenuButton
}

/**
 * SplitButton component:
 * This component combines the two button components.
 * 1- Action or Primary button.
 * 2- Menu button.
 *
 * @deprecated
 */
const DeprecatedSplitButton: DeprecatedSplitButtonFC = ({ children, ...props }) => {
  return <ElDeprecatedSplitButton {...props}>{children}</ElDeprecatedSplitButton>
}

/** @deprecated */
DeprecatedSplitButton.Action = DeprecatedActionButton

/** @deprecated */
DeprecatedSplitButton.Menu = DeprecatedMenuButton

export { DeprecatedSplitButton }
