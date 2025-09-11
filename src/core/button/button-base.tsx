import { cx } from '@linaria/core'
import { elButton, elButtonSpinner, ElButtonIconContainer } from './styles'
import Spinner from './spinner.svg?react'
import { useCallback } from 'react'

import type { AnchorHTMLAttributes, ButtonHTMLAttributes, HTMLAttributes, MouseEventHandler, ReactNode } from 'react'

export namespace ButtonBase {
  export interface CommonProps {
    /**
     * Whether the button is disabled. This can be used to make the button appear disabled to users, but still be
     * focusable. ARIA disabled buttons, whether they are button or anchor DOM elements, will ignore click events.
     * Using `aria-disabled` is preferred when the button should still be focusable while it's disabled; for example,
     * to allow a tooltip to be displayed that explains why the button is disabled.
     */
    'aria-disabled'?: boolean | 'true' | 'false'
    /** The button's label */
    children?: ReactNode
    /** Remove default padding. Only applies to tertiary buttons. */
    hasNoPadding?: boolean
    /** Icon to display on the left side */
    iconLeft?: ReactNode
    /** Icon to display on the right side */
    iconRight?: ReactNode
    /**
     * Whether the button is in a busy state. A busy button will be `aria-disabled`, so will be focusable. However,
     * click events will be ignored while it is busy.
     */
    isBusy?: boolean
    /** Whether the button represents a destructive action */
    isDestructive?: boolean
    /** The size of the button */
    size: 'small' | 'medium' | 'large'
    /** Whether to use link-style appearance. Only applies to tertiary buttons. */
    useLinkStyle?: boolean
    /** The visual variant of the button */
    variant: 'primary' | 'secondary' | 'tertiary'
  }

  export interface AsButtonProps extends CommonProps, ButtonHTMLAttributes<HTMLButtonElement> {
    as: 'button'
  }

  export interface AsAnchorProps extends CommonProps, AnchorHTMLAttributes<HTMLAnchorElement> {
    as: 'a'
    href: string
  }

  export type Props = AsButtonProps | AsAnchorProps
}

/**
 * A polymorphic button foundation that can render as either a button or anchor element.
 * This component is used internally by the `Button` and `AnchorButton` components and
 * should not be used directly by consumers.
 */
export function ButtonBase({
  'aria-disabled': ariaDisabled,
  as: Element,
  className,
  children,
  hasNoPadding,
  iconLeft,
  iconRight,
  isBusy,
  isDestructive,
  onClick,
  size,
  useLinkStyle,
  variant,
  ...rest
}: ButtonBase.Props) {
  // It's an icon-only button if there's no label text and only one icon
  const isIconOnly = !children && (iconLeft || iconRight) && !(iconLeft && iconRight)

  const handleClick = useCallback<MouseEventHandler<HTMLElement>>(
    (event) => {
      const element = event.currentTarget
      // NOTE: Anchor elements CANNOT be disabled using the native `disabled` attribute, so we allow the
      // `aria-disabled` attribute to disable them instead. Since click events will still be fired when
      // `aria-disabled='true'`, we need to prevent any default action for the button from occuring, stop it
      // propagating to ancestors and avoid calling the consumer-supplied `onClick` callback.
      if (element.getAttribute('aria-disabled') === 'true') {
        event.preventDefault()
        event.stopPropagation()
        return
      }

      // NOTE: We use a type assertion here to avoid having to narrow the type of `event` based on the specific
      // `Element` type.
      onClick?.(event as any)
    },
    [onClick],
  )

  return (
    // NOTE: We use a type assertion here to avoid having to narrow the type of `rest` to the specific `Element` type.
    <Element
      {...(rest as HTMLAttributes<HTMLElement>)}
      className={cx(elButton, className)}
      // NOTE: we explicitly DO NOT use `isBusy` to properly disable button-based buttons because
      // that can lead to timing issues with form submissions (disabled form elements are not part
      // of the submitted form data). Thus, busy buttons are only ever ARIA disabled.
      aria-disabled={!!isBusy || !!rest['disabled'] || !!ariaDisabled}
      data-variant={variant}
      data-size={size}
      data-has-no-padding={hasNoPadding}
      data-is-destructive={isDestructive}
      data-is-icon-only={isIconOnly}
      data-use-link-style={useLinkStyle}
      onClick={handleClick}
    >
      {isBusy ? (
        <ElButtonIconContainer aria-hidden className={elButtonSpinner}>
          <Spinner />
        </ElButtonIconContainer>
      ) : (
        iconLeft && <ElButtonIconContainer aria-hidden>{iconLeft}</ElButtonIconContainer>
      )}
      {children}
      {!isBusy && iconRight && <ElButtonIconContainer aria-hidden>{iconRight}</ElButtonIconContainer>}
    </Element>
  )
}
