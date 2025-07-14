import {
  HTMLAttributes,
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  FC,
  MouseEventHandler,
  ReactNode,
  useCallback,
  MouseEvent,
} from 'react'
import {
  ElDeprecatedButton,
  elDeprecatedButtonSizeLarge,
  elDeprecatedButtonSizeMedium,
  elDeprecatedButtonSizeSmall,
  elDeprecatedButtonIconOnly,
  ElDeprecatedButtonSpinner,
  ElDeprecatedAnchorButton,
  elDeprecatedFloatingButton,
  DeprecatedElButtonGroup,
  ElDeprecatedButtonGroupInner,
  elDeprecatedButtonGroupAlignLeft,
  elDeprecatedButtonGroupAlignRight,
  elDeprecatedButtonGroupAlignCenter,
  ElDeprecatedButtonLabel,
} from './styles'
import { DeprecatedIcon, IconNames } from '../icon'
import { cx } from '@linaria/core'

/** @deprecated */
type DeprecatedButtonSize = 'small' | 'medium' | 'large'

/** @deprecated */
type DeprecatedButtonAsButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'destructive' | 'busy'

/** @deprecated */
type DeprecatedButtonAsAnchorVariant = Exclude<DeprecatedButtonAsButtonVariant, 'busy'>

/** @deprecated */
interface DeprecatedCommonButtonProps {
  children?: ReactNode
  size?: DeprecatedButtonSize
  iconLeft?: ReactNode
  iconRight?: ReactNode
  /** The label for button. It must be supplied for buttons with no `children` */
  'aria-label'?: string
  className?: string
}

// Define a specialized type for tertiary variant for prop hasNoPadding
/** @deprecated */
type DeprecatedTertiaryButtonProps = {
  variant: 'tertiary'
  hasNoPadding?: boolean // Only tertiary buttons can use hasNoPadding
}

// Define the general type for non-tertiary variants
/** @deprecated */
type DeprecatedNonTertiaryButtonProps = {
  variant?: Exclude<DeprecatedButtonAsButtonVariant, 'tertiary'>
  hasNoPadding?: never // Disallow hasNoPadding for other variants
}

// Combine the above two into a Variant-specific prop type
/** @deprecated */
type DeprecatedVariantSpecificProps = DeprecatedTertiaryButtonProps | DeprecatedNonTertiaryButtonProps

/** @deprecated */
type DeprecatedButtonAsButtonElementProps = DeprecatedCommonButtonProps &
  DeprecatedVariantSpecificProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: never
    target?: never
    isDisabled?: boolean
    onClick?: MouseEventHandler<HTMLButtonElement>
  }

/** @deprecated */
type DeprecatedButtonAsAnchorElementProps = DeprecatedCommonButtonProps &
  DeprecatedVariantSpecificProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    variant?: DeprecatedButtonAsAnchorVariant
    /** Button styled <a> element should always have href */
    href: string
    target?: string
    rel?: string
    /** Anchor elements cannot be disabled. Use a button element if the component needs to be in a disabled state */
    isDisabled?: never
    onClick?: MouseEventHandler<HTMLAnchorElement>
  }

/** @deprecated */
export type DeprecatedButtonProps = DeprecatedButtonAsButtonElementProps | DeprecatedButtonAsAnchorElementProps

function isButtonAsButtonElement(props: DeprecatedButtonProps): props is DeprecatedButtonAsButtonElementProps {
  return !props.href
}

/** @deprecated */
export type DeprecatedFloatingButtonProps = DeprecatedButtonAsButtonElementProps & {
  icon: IconNames
}

/** @deprecated */
export type DeprecatedButtonGroupAlignment = 'left' | 'right' | 'center'

/**
 * A subset of button, button group should not be used.
 * @deprecated Will be removed in future major version. Use `button-group` as parent component.
 */
export interface DeprecatedButtonGroupProps extends HTMLAttributes<HTMLDivElement> {
  alignment?: DeprecatedButtonGroupAlignment
}

/** @deprecated */
export const DeprecatedButton: FC<DeprecatedButtonProps> = (props) => {
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
    onClick,
    ...rest
  } = props

  const sizeClass = cx(
    size === 'small' && elDeprecatedButtonSizeSmall,
    size === 'medium' && elDeprecatedButtonSizeMedium,
    size === 'large' && elDeprecatedButtonSizeLarge,
  )

  const miscellaneousClass = cx(
    !children && elDeprecatedButtonIconOnly, // if no children(label) then add el-button-icon-only class
  )

  const combinedClassName = cx(className, sizeClass, miscellaneousClass)

  const handleClick = useCallback(
    (event: MouseEvent<HTMLButtonElement> | MouseEvent<HTMLAnchorElement>) => {
      // We are not using <button>'s `disabled` attribute because disabled buttons are bad for a11y.
      // Rather, we keep the <button> enabled and available in the a11y tree, but mark it as disabled using
      // `aria-disabled`. This means click events will still be fired, so we need to prevent any default action
      // for the button from occuring, stop it propagating to ancestors and avoid calling the consumer-supplied
      // `onClick` callback.
      if (isDisabled && isButtonAsButtonElement(props)) {
        event.preventDefault()
        event.stopPropagation()
        return
      }

      onClick?.(event as any) // Safe because event type has been handled
    },
    [isDisabled, onClick],
  )

  if (!isButtonAsButtonElement(props)) {
    return (
      <ElDeprecatedAnchorButton
        {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}
        href={href}
        data-variant={variant}
        data-has-no-padding={hasNoPadding}
        className={combinedClassName}
        onClick={handleClick}
        aria-label={ariaLabel}
        role="button"
        target={target}
        rel={rel}
      >
        <ElDeprecatedButtonSpinner />
        {variant !== 'busy' && iconLeft}
        {children && <ElDeprecatedButtonLabel>{children}</ElDeprecatedButtonLabel>}
        {variant !== 'busy' && iconRight}
      </ElDeprecatedAnchorButton>
    )
  } else {
    return (
      <ElDeprecatedButton
        {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
        data-variant={variant}
        data-has-no-padding={hasNoPadding}
        className={combinedClassName}
        aria-label={ariaLabel}
        aria-disabled={isDisabled}
        role="button"
        onClick={handleClick}
      >
        <ElDeprecatedButtonSpinner />
        {variant !== 'busy' && iconLeft}
        {children && <ElDeprecatedButtonLabel>{children}</ElDeprecatedButtonLabel>}
        {variant !== 'busy' && iconRight}
      </ElDeprecatedButton>
    )
  }
}

/**
 * Moved to its own component `ButtonGroup`.
 * @deprecated `alignment` prop will not be supported in new ButtonGroup component.
 */
export const DeprecatedButtonGroup: FC<DeprecatedButtonGroupProps> = ({ children, alignment, ...rest }) => {
  const alignmentClass = cx(
    alignment === 'left' && elDeprecatedButtonGroupAlignLeft,
    alignment === 'right' && elDeprecatedButtonGroupAlignRight,
    alignment === 'center' && elDeprecatedButtonGroupAlignCenter,
  )
  return (
    <DeprecatedElButtonGroup {...rest}>
      <ElDeprecatedButtonGroupInner className={alignmentClass}>{children}</ElDeprecatedButtonGroupInner>
    </DeprecatedElButtonGroup>
  )
}

/** @deprecated */
// Removing ClassName fixes the issue with different UI, lets look into this
export const DeprecatedFloatingButton: FC<DeprecatedFloatingButtonProps> = ({ className, icon, ...rest }) => {
  return (
    <DeprecatedButton
      className={cx(className, elDeprecatedFloatingButton)}
      iconLeft={<DeprecatedIcon icon={icon} />}
      {...rest}
    />
  )
}
