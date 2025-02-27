import { FC, ButtonHTMLAttributes, MouseEventHandler, ReactNode, useCallback } from 'react'
import { ElActionButton, ElActionButtonLabel, ElMenuButton, ElSplitButtonIcon } from './styles'
import { Icon } from '../icon'

type ActionButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode
  isDisabled?: boolean
  onClick?: MouseEventHandler
}

type MenuButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isDisabled?: never
  onClick?: MouseEventHandler
}

export const ActionButton: FC<ActionButtonProps> = (props) => {
  const { children, isDisabled = false, 'aria-label': ariaLabel, className, onClick, ...rest } = props

  const handleClick = useCallback<MouseEventHandler<HTMLButtonElement>>(
    (event) => {
      // We are not using <button>'s `disabled` attribute because disabled buttons are bad for a11y.
      // Rather, we keep the <button> enabled and available in the a11y tree, but mark it as disabled using
      // `aria-disabled`. This means click events will still be fired, so we need to prevent any default action
      // for the button from occuring, stop it propagating to ancestors and avoid calling the consumer-supplied
      // `onClick` callback.
      if (isDisabled) {
        event.preventDefault()
        event.stopPropagation()
        return
      }
      onClick?.(event)
    },
    [isDisabled, onClick],
  )

  return (
    <ElActionButton
      role="button"
      aria-label={ariaLabel}
      aria-disabled={isDisabled}
      className={className}
      {...rest}
      onClick={handleClick}
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
