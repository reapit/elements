import {
  HTMLAttributes,
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  FC,
  MouseEvent,
  MouseEventHandler,
  ReactNode,
} from 'react'
import {
  ElButton,
  elButtonSizeLarge,
  elButtonSizeMedium,
  elButtonSizeSmall,
  elButtonIconOnly,
  ElButtonSpinner,
  ElAnchorButton,
  elButtonDisabled,
  elFloatingButton,
  DeprecatedElButtonGroup,
  ElButtonGroupInner,
  elButtonGroupAlignLeft,
  elButtonGroupAlignRight,
  elButtonGroupAlignCenter,
} from './styles'
import { Icon, IconNames } from '../icon'
import { cx } from '@linaria/core'

type ButtonSize = 'small' | 'medium' | 'large'

type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'destructive' | 'busy'
type NonBusyButtonVariant = Exclude<ButtonVariant, 'busy'>

interface CommonButtonProps {
  children?: ReactNode
  variant?: ButtonVariant
  size?: ButtonSize
  iconLeft?: ReactNode
  iconRight?: ReactNode
  /** The label for button. It must be supplied for buttons with no `children` */
  ariaLabel?: string
  className?: string
}

interface ButtonAsButtonElementProps extends CommonButtonProps, ButtonHTMLAttributes<HTMLButtonElement> {
  href?: never
  target?: never
  disabled?: boolean
  onClick?: MouseEventHandler<HTMLButtonElement>
}

interface ButtonAsAnchorElementProps extends CommonButtonProps, AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: NonBusyButtonVariant
  /** Button styled <a> element should always have href */
  href: string
  target?: string
  rel?: string
  /** Anchor elements cannot be disabled. Use a button element if the component needs to be in a disabled state */
  disabled?: never
  onClick?: MouseEventHandler<HTMLAnchorElement>
}

type ButtonProps = ButtonAsButtonElementProps | ButtonAsAnchorElementProps

function isButtonAsButtonElement(props: ButtonProps): props is ButtonAsButtonElementProps {
  return !props.href
}

export const handleButtonClick =
  (onClick?: MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>) =>
  (e: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    if (onClick) onClick(e)
  }

/** @deprecated */
export interface FloatingButtonProps extends ButtonAsButtonElementProps {
  icon: IconNames
}

export type ButtonGroupAlignment = 'left' | 'right' | 'center'

/**
 * A subset of button, button group should not be used.
 * @deprecated Will be removed in future major version. Use `button-group` as parent component.
 */
export interface ButtonGroupProps extends HTMLAttributes<HTMLDivElement> {
  alignment?: ButtonGroupAlignment
}

export const Button: FC<ButtonProps> = ({
  children,
  variant,
  size = 'medium',
  iconLeft,
  iconRight,
  onClick,
  ariaLabel,
  disabled = false,
  href,
  target,
  rel,
  className,
  ...rest
}) => {
  const sizeClass = cx(
    size === 'small' && elButtonSizeSmall,
    size === 'medium' && elButtonSizeMedium,
    size === 'large' && elButtonSizeLarge,
  )

  const miscellaneousClass = cx(
    disabled && elButtonDisabled, // UI for disabled Anchor element // Need to remove this.
    !children && elButtonIconOnly, // if no children(label) then add el-button-icon-only class
  )

  const combinedClassName = cx(className, sizeClass, miscellaneousClass)

  if (!isButtonAsButtonElement({ href })) {
    return (
      <ElAnchorButton
        href={href}
        data-variant={variant}
        className={combinedClassName}
        onClick={(e) => {
          e.preventDefault()
          handleButtonClick(onClick)
        }}
        aria-label={ariaLabel}
        role="button"
        target={target}
        rel={rel}
        {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        <ElButtonSpinner />
        {variant !== 'busy' && iconLeft}
        {children}
        {variant !== 'busy' && iconRight}
      </ElAnchorButton>
    )
  } else {
    return (
      <ElButton
        data-variant={variant}
        className={combinedClassName}
        onClick={handleButtonClick(onClick)}
        aria-label={ariaLabel}
        aria-disabled={disabled}
        role="button"
        {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        <ElButtonSpinner />
        {variant !== 'busy' && iconLeft}
        {children}
        {variant !== 'busy' && iconRight}
      </ElButton>
    )
  }
}

/**
 * Moved to its own component `ButtonGroup`.
 * @deprecated `alignment` prop will not be supported in new ButtonGroup component.
 */
export const DeprecatedButtonGroup: FC<ButtonGroupProps> = ({ children, alignment, ...rest }) => {
  const alignmentClass = cx(
    alignment === 'left' && elButtonGroupAlignLeft,
    alignment === 'right' && elButtonGroupAlignRight,
    alignment === 'center' && elButtonGroupAlignCenter,
  )
  return (
    <DeprecatedElButtonGroup {...rest}>
      <ElButtonGroupInner className={alignmentClass}>{children}</ElButtonGroupInner>
    </DeprecatedElButtonGroup>
  )
}

/** @deprecated */
// Removing ClassName fixes the issue with different UI, lets look into this
export const FloatingButton: FC<FloatingButtonProps> = ({ className, icon, ...rest }) => {
  return <Button className={cx(className, elFloatingButton)} iconLeft={<Icon icon={icon} />} {...rest} />
}
