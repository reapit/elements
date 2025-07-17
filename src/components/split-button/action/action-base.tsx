import { ButtonBase } from '#src/components/button'
import { cx } from '@linaria/core'
import { elSplitButtonAction } from './styles'
import { useSplitButtonContext } from '../context'

import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'

export interface CommonSplitButtonActionBaseProps {
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

export interface SplitButtonActionAsButtonProps
  extends CommonSplitButtonActionBaseProps,
    ButtonHTMLAttributes<HTMLButtonElement> {
  as: 'button'
}

export interface SplitButtonActionAsAnchorProps
  extends CommonSplitButtonActionBaseProps,
    AnchorHTMLAttributes<HTMLAnchorElement> {
  as: 'a'
  href: string
}

export type SplitButtonActionBaseProps = SplitButtonActionAsButtonProps | SplitButtonActionAsAnchorProps

export function SplitButtonActionBase({ children, className, ...rest }: SplitButtonActionBaseProps) {
  const { size, variant } = useSplitButtonContext()
  return (
    <ButtonBase {...rest} className={cx(elSplitButtonAction, className)} size={size} variant={variant}>
      {children}
    </ButtonBase>
  )
}
