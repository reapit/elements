import { HTMLAttributes, AnchorHTMLAttributes, ButtonHTMLAttributes, FC, MouseEventHandler, ReactNode } from 'react'
import {
  ElButton,
  elButtonSizeLarge,
  elButtonSizeMedium,
  elButtonSizeSmall,
  elButtonIconOnly,
  ElButtonSpinner,
  ElAnchorButton,
  elFloatingButton,
  DeprecatedElButtonGroup,
  ElButtonGroupInner,
  elButtonGroupAlignLeft,
  elButtonGroupAlignRight,
  elButtonGroupAlignCenter,
  ElButtonLabel,
} from './styles'
import { Icon, IconNames } from '../icon'
import { cx } from '@linaria/core'

type ButtonSize = 'small' | 'medium' | 'large'

type ButtonAsButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'destructive' | 'busy'
type ButtonAsAnchorVariant = Exclude<ButtonAsButtonVariant, 'busy'>

interface CommonButtonProps {
  children?: ReactNode
  size?: ButtonSize
  iconLeft?: ReactNode
  iconRight?: ReactNode
  /** The label for button. It must be supplied for buttons with no `children` */
  'aria-label'?: string
  className?: string
}

// Define a specialized type for tertiary variant for prop hasNoPadding
type TertiaryButtonProps = {
  variant: 'tertiary'
  hasNoPadding?: boolean // Only tertiary buttons can use hasNoPadding
}

// Define the general type for non-tertiary variants
type NonTertiaryButtonProps = {
  variant?: Exclude<ButtonAsButtonVariant, 'tertiary'>
  hasNoPadding?: never // Disallow hasNoPadding for other variants
}

// Combine the above two into a Variant-specific prop type
type VariantSpecificProps = TertiaryButtonProps | NonTertiaryButtonProps

type ButtonAsButtonElementProps = CommonButtonProps &
  VariantSpecificProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: never
    target?: never
    isDisabled?: boolean
    onClick?: MouseEventHandler<HTMLButtonElement>
  }

type ButtonAsAnchorElementProps = CommonButtonProps &
  VariantSpecificProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    variant?: ButtonAsAnchorVariant
    /** Button styled <a> element should always have href */
    href: string
    target?: string
    rel?: string
    /** Anchor elements cannot be disabled. Use a button element if the component needs to be in a disabled state */
    isDisabled?: never
    onClick?: MouseEventHandler<HTMLAnchorElement>
  }

export type ButtonProps = ButtonAsButtonElementProps | ButtonAsAnchorElementProps

function isButtonAsButtonElement(props: ButtonProps): props is ButtonAsButtonElementProps {
  return !props.href
}

/** @deprecated */
export type FloatingButtonProps = ButtonAsButtonElementProps & {
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

export const Button: FC<ButtonProps> = (props) => {
  const {
    children,
    variant,
    size = 'medium',
    iconLeft,
    iconRight,
    'aria-label': ariaLabel,
    isDisabled = false,
    href,
    target,
    rel,
    className,
    hasNoPadding,
    ...rest
  } = props

  const sizeClass = cx(
    size === 'small' && elButtonSizeSmall,
    size === 'medium' && elButtonSizeMedium,
    size === 'large' && elButtonSizeLarge,
  )

  const miscellaneousClass = cx(
    !children && elButtonIconOnly, // if no children(label) then add el-button-icon-only class
  )

  const combinedClassName = cx(className, sizeClass, miscellaneousClass)

  if (!isButtonAsButtonElement(props)) {
    return (
      <ElAnchorButton
        {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}
        href={href}
        data-variant={variant}
        data-has-no-padding={hasNoPadding}
        className={combinedClassName}
        onClick={(e) => {
          if (props.onClick) {
            props.onClick(e)
          }
        }}
        aria-label={ariaLabel}
        role="button"
        target={target}
        rel={rel}
      >
        <ElButtonSpinner />
        {variant !== 'busy' && iconLeft}
        {children && <ElButtonLabel>{children}</ElButtonLabel>}
        {variant !== 'busy' && iconRight}
      </ElAnchorButton>
    )
  } else {
    return (
      <ElButton
        {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
        data-variant={variant}
        data-has-no-padding={hasNoPadding}
        className={combinedClassName}
        aria-label={ariaLabel}
        aria-disabled={isDisabled}
        role="button"
        onClick={(e) => {
          if (!isDisabled) {
            if (props.onClick) {
              props.onClick(e)
            }
          } else {
            e.preventDefault() // Explicitly prevent default if disabled
            e.stopPropagation() // Explicitly prevent event from propogating
            return
          }
        }}
      >
        <ElButtonSpinner />
        {variant !== 'busy' && iconLeft}
        {children && <ElButtonLabel>{children}</ElButtonLabel>}
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
