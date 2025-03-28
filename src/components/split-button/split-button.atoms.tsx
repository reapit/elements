import { FC } from 'react'
import { Icon } from '../icon'
import { ButtonProps } from '../button'
import { ElSplitButtonActionButton, ElSplitButtonMenuButton, ElSplitButtonIcon } from './styles'
import { ElButtonSpinner } from '../button/styles'

type SplitButtonVariant = 'primary' | 'secondary' | 'busy'

export type SplitButtonProps = ButtonProps & {
  variant?: SplitButtonVariant
}

export const ActionButton: FC<SplitButtonProps> = (props) => {
  const { children, ...rest } = props

  return <ElSplitButtonActionButton {...rest}>{children}</ElSplitButtonActionButton>
}

export const MenuButton: FC<SplitButtonProps> = (props) => {
  const { ...rest } = props
  return (
    <ElSplitButtonMenuButton {...rest}>
      <ElSplitButtonIcon>
        <ElButtonSpinner />
        <Icon icon="chevronDown" className="icon" />
      </ElSplitButtonIcon>
    </ElSplitButtonMenuButton>
  )
}
