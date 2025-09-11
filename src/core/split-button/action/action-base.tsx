import { ButtonBase } from '#src/core/button/index'
import { cx } from '@linaria/core'
import { elSplitButtonAction } from './styles'
import { useSplitButtonContext } from '../context'

import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'

export namespace SplitButtonActionBase {
  export interface CommonProps {
    /**
     * Whether the action is disabled. This can be used to make the action appear disabled to users, but still be
     * focusable. ARIA disabled actions, whether they are button or anchor DOM elements, will ignore click events.
     * Using `aria-disabled` is preferred when the action should still be focusable while it's disabled; for example,
     * to allow a tooltip to be displayed that explains why the action is disabled.
     */
    'aria-disabled'?: boolean | 'true' | 'false'
    /** The button's label */
    children?: ReactNode
    /** Icon to display on the left side */
    iconLeft?: ReactNode
    /**
     * Whether the action is in a busy state. A busy action will be `aria-disabled`, so will be focusable. However,
     * click events will be ignored while it is busy.
     */
    isBusy?: boolean
    /** Whether the action represents a destructive action */
    isDestructive?: boolean
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

/** @deprecated Use SplitButtonActionBase.CommonProps instead */
export type CommonSplitButtonActionBaseProps = SplitButtonActionBase.CommonProps

/** @deprecated Use SplitButtonActionBase.AsButtonProps instead */
export type SplitButtonActionAsButtonProps = SplitButtonActionBase.AsButtonProps

/** @deprecated Use SplitButtonActionBase.AsAnchorProps instead */
export type SplitButtonActionAsAnchorProps = SplitButtonActionBase.AsAnchorProps

/** @deprecated Use SplitButtonActionBase.Props instead */
export type SplitButtonActionBaseProps = SplitButtonActionBase.Props

/**
 * A polymorphic button foundation that can render as either a button or anchor element.
 * This component is used internally by the `SplitButtonAction` and `SplitButtonAnchorAction`
 * components and should not be used directly by consumers.
 */
export function SplitButtonActionBase({
  'aria-disabled': ariaDisabled,
  children,
  className,
  isBusy,
  ...rest
}: SplitButtonActionBase.Props) {
  const { busy, size, variant } = useSplitButtonContext()

  return (
    <ButtonBase
      {...rest}
      // If the menu button is busy, this action button should be ARIA disabled.
      aria-disabled={ariaDisabled || busy === 'menu-item'}
      className={cx(elSplitButtonAction, className)}
      isBusy={isBusy || busy === 'action'}
      size={size}
      variant={variant}
    >
      {children}
    </ButtonBase>
  )
}
