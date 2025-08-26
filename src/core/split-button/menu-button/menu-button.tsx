import { Button } from '#src/core/button/index'
import { ChevronDownIcon } from '#src/icons/chevron-down'
import { cx } from '@linaria/core'
import { elSplitButtonMenuButton } from './styles'
import { useSplitButtonContext } from '../context'

import type { ButtonHTMLAttributes } from 'react'

// NOTE: We omit...
// - children, because it has no visual label
// - type, because it should always be type="button"
type AttributesToOmit = 'children' | 'type'

interface SplitButtonMenuButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, AttributesToOmit> {
  /**
   * Whether the action is disabled. This can be used to make the action appear disabled to users, but still be
   * focusable. ARIA disabled actions, whether they are button or anchor DOM elements, will ignore click events.
   * Using `aria-disabled` is preferred when the action should still be focusable while it's disabled; for example,
   * to allow a tooltip to be displayed that explains why the action is disabled.
   */
  'aria-disabled'?: boolean | 'true' | 'false'
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
  'aria-disabled': ariaDisabled,
  className,
  isBusy,
  ...rest
}: SplitButtonMenuButtonProps) {
  const { busy, size, variant } = useSplitButtonContext()

  return (
    <Button
      {...rest}
      // If the main action is busy, this menu button should be ARIA disabled. Importantly,
      // we do not allow `aria-disabled` to be forced to `false` when the split button
      // communicates the menu is busy.
      aria-disabled={ariaDisabled || busy === 'action'}
      className={cx(elSplitButtonMenuButton, className)}
      iconLeft={<ChevronDownIcon />}
      isBusy={isBusy ?? busy === 'menu-item'}
      size={size}
      type="button"
      variant={variant}
    />
  )
}
