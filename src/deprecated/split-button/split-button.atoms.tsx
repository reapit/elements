import { FC } from 'react'
import { DeprecatedIcon } from '#src/deprecated/icon'
import { DeprecatedButtonProps } from '#src/deprecated/button'
import { ElDeprecatedSplitButtonActionButton, ElDeprecatedSplitButtonMenuButton } from './styles'

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
 *
 * @deprecated
 */
export type DeprecatedSplitButtonProps = DeprecatedButtonProps & {
  variant?: SplitButtonVariant
  iconRight?: never
}

/**
 * SplitButton Action button component:
 * This component consists of a button component.
 * @deprecated
 */
export const DeprecatedActionButton: FC<DeprecatedSplitButtonProps> = (props) => {
  const { children, ...rest } = props

  return <ElDeprecatedSplitButtonActionButton {...rest}>{children}</ElDeprecatedSplitButtonActionButton>
}

/**
 * SplitButton Menu button component:
 * This component consists of a button component.
 * @deprecated
 */
export const DeprecatedMenuButton: FC<DeprecatedSplitButtonProps> = (props) => {
  const { ...rest } = props
  return (
    <ElDeprecatedSplitButtonMenuButton
      {...rest}
      iconLeft={<DeprecatedIcon icon="chevronDown" />}
    ></ElDeprecatedSplitButtonMenuButton>
  )
}
