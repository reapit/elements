import { ButtonHTMLAttributes, FC, HTMLAttributes, MouseEvent, MouseEventHandler } from 'react'
import { cx } from '@linaria/core'
import { Intent } from '../../helpers/intent'
import { elIsLoading } from '../../styles/states'
import * as styles from './__styles__'
import {
  ElButton,
  DeprecatedElButtonGroup,
  elButtonGroupAlignCenter,
  elButtonGroupAlignLeft,
  elButtonGroupAlignRight,
  ElButtonGroupInner,
  elButtonIconOnly,
  ElButtonLoader,
  elButtonSizeLarge,
  elButtonSizeMedium,
  elButtonSizeSmall,
} from './__styles__'
import { Icon, IconNames } from '../icon'
import { elIntentDanger, elIntentNeutral, elIntentPrimary } from '../../styles/intent'
import { elMl1, elMr1 } from '../../styles/spacing'
import { handleKeyboardEvent } from '../../storybook/handle-keyboard-event'

export type ButtonSizeType = 2 | 3 | 4
export type ButtonSize = 'small' | 'medium' | 'large'
export interface ButtonIcon {
  icon: IconNames
  position: 'left' | 'right' | 'only'
}

export type ButtonGroupAlignment = 'left' | 'right' | 'center'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  intent?: Intent
  loading?: boolean
  className?: string
  buttonSize?: ButtonSize
  buttonIcon?: ButtonIcon
  onClick?: MouseEventHandler<HTMLButtonElement>
}

export interface FloatingButtonProps extends ButtonProps {
  icon: IconNames
}

/**
 * A subset of button, button group should not be used.
 * @deprecated Will be removed in future major version. Use `button-group` as parent component.
 */
export interface ButtonGroupProps extends HTMLAttributes<HTMLDivElement> {
  alignment?: ButtonGroupAlignment
}

export const resolveButtonClassName = (intent?: Intent): string => {
  // -- For Devs --
  // Please update the new Button Group component with replaced prop
  // Files to update button-group.stories.tsx and button-group.text.tsx
  //
  switch (intent) {
    case 'primary':
      return elIntentPrimary
    case 'danger':
      return elIntentDanger
    case 'neutral':
      return elIntentNeutral
    case 'pending':
    case 'success':
    case 'warning':
    case 'critical':
    case 'low':
    case 'secondary':
      console.warn(`${intent} intent is no longer supported for buttons and will be removed at v5 release.`)
      return elIntentNeutral
    default:
      return elIntentNeutral
  }
}

export const handleButtonClick =
  (onClick?: MouseEventHandler<HTMLButtonElement>) => (e: MouseEvent<HTMLButtonElement>) => {
    if (onClick) onClick(e)
  }

export const Button: FC<ButtonProps> = ({
  intent,
  loading = false,
  buttonSize,
  buttonIcon,
  className = '',
  children,
  onClick,
  ...rest
}) => {
  const intentClassname = resolveButtonClassName(intent)
  const isIconOnly = buttonIcon?.icon && buttonIcon.position === 'only'
  const sizeClass = cx(
    isIconOnly && elButtonIconOnly,
    buttonSize === 'small' && elButtonSizeSmall,
    buttonSize === 'large' && elButtonSizeLarge,
    buttonSize === 'medium' && elButtonSizeMedium,
  )
  const combinedClassName = cx(className, sizeClass, intentClassname, loading && elIsLoading)

  return (
    <ElButton
      className={combinedClassName}
      onKeyDown={handleKeyboardEvent('Enter', () => handleButtonClick(onClick))}
      onClick={handleButtonClick(onClick)}
      {...rest}
    >
      <ElButtonLoader />
      {isIconOnly ? (
        <Icon intent="default" icon={buttonIcon.icon} fontSize="1rem" />
      ) : (
        <>
          {buttonIcon?.icon && buttonIcon.position === 'left' && (
            <Icon className={elMr1} intent="default" fontSize="1rem" icon={buttonIcon.icon} />
          )}
          {children}
          {buttonIcon?.icon && buttonIcon.position === 'right' && (
            <Icon className={elMl1} intent="default" fontSize="1rem" icon={buttonIcon.icon} />
          )}
        </>
      )}
    </ElButton>
  )
}

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

export const FloatingButton: FC<FloatingButtonProps> = ({ icon, intent, ...rest }) => {
  return (
    <Button className={styles.elFloatingButton} intent={intent} {...rest}>
      <Icon icon={icon} />
    </Button>
  )
}
