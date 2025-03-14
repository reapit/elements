import { FC, ButtonHTMLAttributes, MouseEventHandler, ReactNode, useCallback } from 'react'
import { ElActionButton, ElActionButtonLabel, ElMenuButton, ElSplitButtonIcon, ElButtonSpinner } from './styles'
import { Icon } from '../icon'

type ActionButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode
  disabled?: boolean
  isBusy?: boolean
  onClick?: MouseEventHandler
}

type MenuButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  disabled?: never
  isBusy?: boolean
  onClick?: MouseEventHandler
}

export const ActionButton: FC<ActionButtonProps> = (props) => {
  const { children, disabled = false, 'aria-label': ariaLabel, isBusy = false, onClick, ...rest } = props

  const handleClick = useCallback<MouseEventHandler<HTMLButtonElement>>(
    (event) => {
      // We are not using <button>'s `disabled` attribute because disabled buttons are bad for a11y.
      // Rather, we keep the <button> enabled and available in the a11y tree, but mark it as disabled using
      // `aria-disabled`. This means click events will still be fired, so we need to prevent any default action
      // for the button from occuring, stop it propagating to ancestors and avoid calling the consumer-supplied
      // `onClick` callback.
      if (disabled) {
        event.preventDefault()
        event.stopPropagation()
        return
      }
      onClick?.(event)
    },
    [disabled, onClick],
  )

  return (
    <ElActionButton
      role="button"
      aria-label={ariaLabel}
      aria-disabled={disabled}
      aria-busy={isBusy}
      {...rest}
      onClick={handleClick}
    >
      <ElButtonSpinner />
      {children && <ElActionButtonLabel>{children}</ElActionButtonLabel>}
    </ElActionButton>
  )
}

export const MenuButton: FC<MenuButtonProps> = (props) => {
  const { 'aria-label': ariaLabel, isBusy = false, ...rest } = props
  return (
    <ElMenuButton role="button" aria-label={ariaLabel} aria-busy={isBusy} onClick={props.onClick} {...rest}>
      <ElSplitButtonIcon>
        <ElButtonSpinner />
        <Icon icon="chevronDown" />
      </ElSplitButtonIcon>
    </ElMenuButton>
  )
}
