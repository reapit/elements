import { FC } from 'react'
import { DeprecatedIcon } from '../deprecated-icon'
import { ButtonProps } from '../button'
import { ElSplitButtonActionButton, ElSplitButtonMenuButton } from './styles'

type SplitButtonVariant = 'primary' | 'secondary' | 'busy'

/**
 * Interface for the SplitButton component props.
 *
 * Optional variant to change the UI of the split button.
 * If can be primary, secondary (default), or busy.
 *
 * Optional iconRight is set to never as SplitButton won't facilitate iconRight.
 *
 * All other button props can be added to the SplitButton component.
 */
export type SplitButtonProps = ButtonProps & {
  variant?: SplitButtonVariant
  iconRight?: never
}

/**
 * SplitButton Action button component:
 * This component consists of a button component.
 */
export const ActionButton: FC<SplitButtonProps> = (props) => {
  const { children, ...rest } = props

  return <ElSplitButtonActionButton {...rest}>{children}</ElSplitButtonActionButton>
}

/**
 * SplitButton Menu button component:
 * This component consists of a button component.
 */
export const MenuButton: FC<SplitButtonProps> = (props) => {
  const { ...rest } = props
  return <ElSplitButtonMenuButton {...rest} iconLeft={<DeprecatedIcon icon="chevronDown" />}></ElSplitButtonMenuButton>
}
