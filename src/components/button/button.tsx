import { HTMLAttributes, AnchorHTMLAttributes, ButtonHTMLAttributes, FC, MouseEvent, MouseEventHandler } from 'react'
import {
  elButtonDestructive,
  elButtonBusy,
  ElButton,
  elButtonPrimary,
  elButtonSecondary,
  elButtonSizeLarge,
  elButtonSizeMedium,
  elButtonSizeSmall,
  elButtonTertiary,
  elButtonIconOnly,
  ElButtonIcon,
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
import { IconNames } from '../icon'
import { cx } from '@linaria/core'

type ButtonSize = 'small' | 'medium' | 'large'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement | HTMLAnchorElement> {
  isPrimary?: boolean
  isSecondary?: boolean
  isTertiary?: boolean
  isDestructive?: boolean
  isBusy?: boolean
  isToggle?: boolean
  isPressed?: boolean
  size?: ButtonSize
  iconOnly?: IconNames
  iconLeft?: IconNames
  iconRight?: IconNames
  onClick?: MouseEventHandler<HTMLButtonElement>
  /** The lable for button. It must be supplied for buttons with no `children` */
  ariaLabel?: string
  isDisabled?: boolean
  href?: string
  target?: AnchorHTMLAttributes<HTMLAnchorElement>['target']
  rel?: AnchorHTMLAttributes<HTMLAnchorElement>['rel']
  className?: string
}

const fontSizeMap: Record<ButtonSize, string> = {
  small: '1rem',
  medium: '1rem',
  large: '1.25rem',
}

export const handleButtonClick =
  (onClick?: MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>) =>
  (e: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    if (onClick) onClick(e)
  }

/** @deprecated */
export interface FloatingButtonProps extends ButtonProps {
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
  isPrimary,
  isSecondary,
  isTertiary,
  isDestructive,
  isBusy = false,
  isToggle = false,
  isPressed,
  size = 'medium',
  iconOnly,
  iconLeft,
  iconRight,
  onClick,
  ariaLabel,
  isDisabled = false,
  href,
  target,
  rel,
  className,
  ...rest
}) => {
  const variant =
    (isPrimary && elButtonPrimary) ||
    (isSecondary && elButtonSecondary) ||
    (isTertiary && elButtonTertiary) ||
    (isDestructive && elButtonDestructive) ||
    '' // Default to empty - secondary Button style applied to default

  const sizeClass = cx(
    iconOnly && elButtonIconOnly,
    size === 'small' && elButtonSizeSmall,
    size === 'medium' && elButtonSizeMedium,
    size === 'large' && elButtonSizeLarge,
  )

  const miscellaneousClass = cx(
    isBusy && elButtonBusy,
    isDisabled && elButtonDisabled, // UI for disabled Anchor element
    !children && isBusy && elButtonIconOnly, // if no children(label) and is busy then add el-button-icon-only class
  )

  // Determine the icon font size based on the button size
  const iconFontSize = fontSizeMap[size]

  const combinedClassName = cx(className, sizeClass, variant, miscellaneousClass)

  console.log('c', combinedClassName)

  if (href) {
    return (
      <ElAnchorButton
        href={isDisabled || isBusy ? undefined : href}
        className={combinedClassName}
        onClick={(e) => {
          if (isDisabled) {
            e.preventDefault() // Prevent default action if disabled
          } else {
            handleButtonClick(onClick)(e)
          }
        }}
        aria-label={ariaLabel || (iconOnly ? iconOnly : undefined)}
        aria-pressed={isToggle ? isPressed : undefined}
        aria-disabled={isDisabled ? 'true' : undefined}
        role="button"
        target={target}
        rel={rel}
        {...rest}
      >
        <ElButtonSpinner />
        {iconOnly && !isBusy ? (
          <ElButtonIcon icon={iconOnly} fontSize={iconFontSize} />
        ) : (
          <>
            {!isBusy && <>{iconLeft && <ElButtonIcon icon={iconLeft} fontSize={iconFontSize} />}</>}
            {children}
            {!isBusy && <>{iconRight && <ElButtonIcon icon={iconRight} fontSize={iconFontSize} />}</>}
          </>
        )}
      </ElAnchorButton>
    )
  }
  return (
    <ElButton
      className={combinedClassName}
      onClick={handleButtonClick(onClick)}
      aria-label={ariaLabel || (iconOnly ? iconOnly : undefined)}
      aria-pressed={isToggle ? isPressed : undefined}
      aria-disabled={isDisabled}
      disabled={isDisabled}
      role="button"
      {...rest}
    >
      <ElButtonSpinner />
      {iconOnly && !isBusy ? (
        <ElButtonIcon icon={iconOnly} fontSize={iconFontSize} />
      ) : (
        <>
          {!isBusy && <>{iconLeft && <ElButtonIcon icon={iconLeft} fontSize={iconFontSize} />}</>}
          {children}
          {!isBusy && <>{iconRight && <ElButtonIcon icon={iconRight} fontSize={iconFontSize} />}</>}
        </>
      )}
    </ElButton>
  )
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
  return <Button className={cx(className, elFloatingButton)} iconOnly={icon} {...rest} />
}
