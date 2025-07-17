import { Button } from '#src/components/button'
import { ChevronDownIcon } from '#src/icons/chevron-down'
import { ChevronUpIcon } from '#src/icons/chevron-up'
import { cx } from '@linaria/core'
import { elSplitButtonMenuButton } from './styles'
import { useSplitButtonContext } from '../context'

import type { ButtonHTMLAttributes } from 'react'

interface SplitButtonMenuButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  /**
   * Whether the action is disabled. This can be used to make the action appear disabled to users, but still be
   * focusable. ARIA disabled actions, whether they are button or anchor DOM elements, will ignore click events.
   * Using `aria-disabled` is preferred when the action should still be focusable while it's disabled; for example,
   * to allow a tooltip to be displayed that explains why the action is disabled.
   */
  'aria-disabled'?: boolean | 'true' | 'false'
  /** Whether the menu this button controls is expanded */
  'aria-expanded'?: boolean | 'true' | 'false'
  /** The button's label */
  'aria-label': string
  /**
   * Whether the button is disabled or not. Unlike `aria-disabled`, buttons disabled with this prop will not be
   * focusable or interactive.
   */
  disabled?: boolean
  /** Whether the menu button is in a busy state */
  isBusy?: boolean
}

/**
 * The `SplitButton.MenuButton` component is used to represent the menu button in a `SplitButton`. It will typically
 * be used via `SplitButton.Menu`, which includes the `Menu` component baked-in.
 */
export function SplitButtonMenuButton({
  'aria-expanded': ariaExpanded,
  className,
  ...rest
}: SplitButtonMenuButtonProps) {
  const { size, variant } = useSplitButtonContext()
  return (
    <Button
      {...rest}
      aria-expanded={ariaExpanded}
      className={cx(elSplitButtonMenuButton, className)}
      iconLeft={ariaExpanded ? <ChevronUpIcon /> : <ChevronDownIcon />}
      size={size}
      variant={variant}
    />
  )
}
