import type { FC, ButtonHTMLAttributes, MouseEventHandler, ReactNode } from 'react'
import { ElActionButton, ElActionButtonLabel, ElMenuButton, ElSplitButtonIcon } from './styles'
import { Icon } from '../icon'

type ActionButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode
  onClick?: MouseEventHandler
}

type MenuButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  disabled?: never
  onClick?: MouseEventHandler
}

export const ActionButton: FC<ActionButtonProps> = (props) => {
  const { children, disabled = false, 'aria-label': ariaLabel, className, ...rest } = props
  return (
    <ElActionButton
      role="button"
      aria-label={ariaLabel}
      aria-disabled={disabled}
      disabled={disabled}
      className={className}
      onClick={props.onClick}
      {...rest}
    >
      {children && <ElActionButtonLabel>{children}</ElActionButtonLabel>}
    </ElActionButton>
  )
}

export const MenuButton: FC<MenuButtonProps> = (props) => {
  const { 'aria-label': ariaLabel, className, ...rest } = props
  return (
    <ElMenuButton role="button" aria-label={ariaLabel} className={className} onClick={props.onClick} {...rest}>
      <ElSplitButtonIcon>
        <Icon icon="chevronDown" />
      </ElSplitButtonIcon>
    </ElMenuButton>
  )
}
