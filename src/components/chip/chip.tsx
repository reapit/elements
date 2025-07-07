import { CloseIcon } from '#src/icons/close'
import { ElChip, ElChipClearIcon, ElChipLabel } from './styles'
import { useCallback } from 'react'

import type { ButtonHTMLAttributes, MouseEventHandler, ReactNode } from 'react'

type ElementAttributes = ButtonHTMLAttributes<HTMLButtonElement>

// We omit a few attributes from the base ElChip component (itself based on a <button>):
// - `disabled`: we use `isDisabled` instead (which maps to `aria-disabled`).
// - `type`: chips should never be used as form submit or reset buttons.
type ElementAttributesToOmit = Extract<keyof ElementAttributes, 'disabled' | 'type'>

interface ChipProps extends Omit<ElementAttributes, ElementAttributesToOmit> {
  /**
   * Whether the chip is disabled. This can be used to make the chip appear disabled to users, but still be
   * focusable. ARIA disabled chips, whether they are button or anchor DOM elements, will ignore click events.
   * Using `aria-disabled` is preferred when the chip should still be focusable while it's disabled; for example,
   * to allow a tooltip to be displayed that explains why the chip is disabled.
   */
  'aria-disabled'?: boolean | 'true' | 'false'
  /** The label of the chip */
  children: ReactNode
  /**
   * Whether the button is disabled or not. Unlike `aria-disabled`, chips disabled with this prop will not be
   * focusable or interactive.
   */
  disabled?: boolean
  /** The maximum width of the chip. If not provided, the chip will be as wide as its content. */
  maxWidth?: `--size-${string}`
  /** The variant of the chip */
  variant: 'filter' | 'selection'
  /** Whether the label of the chip should be truncated if it is too long */
  willTruncateLabel?: boolean
}

/**
 * An interactive chip that should be cleared (or removed) when clicked. Typically used within a `ChipGroup`.
 */
export function Chip({
  'aria-disabled': ariaDisabled,
  children,
  onClick,
  maxWidth,
  variant,
  willTruncateLabel,
  ...rest
}: ChipProps) {
  const handleClick = useCallback<MouseEventHandler<HTMLButtonElement>>(
    (event) => {
      const element = event.currentTarget
      // NOTE: Button elements disabled using the native `disabled` attribute are not focusable or interactive.
      // Sometimes, we want them to be in order to communicate _why_ they are disabled (e.g. via a tooltip). As such
      // we allow the `aria-disabled` attribute to functionally disable them as well. Since click events will still
      // be fired when `aria-disabled='true'`, we need to prevent any default action for the button from occuring, stop
      // it propagating to ancestors and avoid calling the consumer-supplied `onClick` callback.
      if (element.getAttribute('aria-disabled') === 'true') {
        event.preventDefault()
        event.stopPropagation()
        return
      }
      onClick?.(event)
    },
    [ariaDisabled, onClick],
  )

  return (
    <ElChip
      {...rest}
      type="button"
      aria-disabled={!!rest['disabled'] || ariaDisabled}
      data-variant={variant}
      onClick={handleClick}
      // NOTE: We'd prefer --chip-max-width to be a data attribute, but browsers do not support CSS' advanced
      // attr() function syntax yet. Thus, we use a CSS variable instead.
      style={maxWidth ? { '--chip-max-width': `var(${maxWidth})` } : undefined}
    >
      <ElChipLabel data-will-truncate={willTruncateLabel}>{children}</ElChipLabel>
      <ElChipClearIcon>
        <CloseIcon />
      </ElChipClearIcon>
    </ElChip>
  )
}
