import { cx } from '@linaria/core'
import { elTableRowMoreActionsButton } from './styles'
import { MoreIcon } from '#src/icons/more'
import { useCallback } from 'react'

import type { ButtonHTMLAttributes, MouseEventHandler } from 'react'

// NOTE: we omit...
// - children, because the more actions button should never have a visual label
// - type, because the more actions button should never act as a submit button
type AttributesToOmit = 'children' | 'type'

export namespace TableRowMoreActionsButton {
  export interface Props extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, AttributesToOmit> {
    /**
     * Whether the button is disabled. This can be used to make the button appear disabled to users, but
     * still be focusable. When ARIA disabled, the button will ignore click events. Using `aria-disabled`
     * is preferred when the button should still be focusable while it's disabled; for example, to allow
     * a tooltip to be displayed that explains why the button is disabled.
     */
    'aria-disabled'?: boolean
    /**
     * The accessible name for this button. Take care to ensure it is descriptive of the table row
     * to which it's related.
     */
    'aria-label': string
    /**
     * Whether the button is disabled or not. Unlike `aria-disabled`, buttons disabled with this prop will
     * not be focusable or interactive.
     */
    disabled?: boolean
  }
}

/**
 * A simple "more actions" button for use in table rows. Ensures the button is layered above the row's
 * primary action. Can be used via `Table.MoreButton`, though `Table.MoreActions` will typically be used
 * instead, as it comes with a built-in menu.
 */
export function TableRowMoreActionsButton({
  'aria-disabled': ariaDisabled,
  className,
  disabled,
  onClick,
  ...rest
}: TableRowMoreActionsButton.Props) {
  const handleClick = useCallback<MouseEventHandler<HTMLElement>>(
    (event) => {
      const element = event.currentTarget
      // NOTE: Since click events will still be fired when `aria-disabled='true'`, we need to prevent
      // any default action for the button from occuring, stop it propagating to ancestors and avoid
      // calling the consumer-supplied `onClick` callback.
      if (element.getAttribute('aria-disabled') === 'true') {
        event.preventDefault()
        event.stopPropagation()
        return
      }

      // NOTE: We use a type assertion here to avoid having to narrow the type of `event` based on the
      // specific `Element` type.
      onClick?.(event as any)
    },
    [onClick],
  )

  return (
    <button
      {...rest}
      aria-disabled={disabled || ariaDisabled}
      className={cx(elTableRowMoreActionsButton, className)}
      disabled={disabled}
      onClick={handleClick}
      type="button"
    >
      <MoreIcon />
    </button>
  )
}

// Backward compatibility
export type TableRowMoreActionsButtonProps = TableRowMoreActionsButton.Props
