import { ElChip, ElChipClearIcon, ElChipLabel } from './styles'
import { useCallback } from 'react'

import type { ButtonHTMLAttributes, MouseEventHandler, ReactNode } from 'react'

type ElementAttributes = ButtonHTMLAttributes<HTMLButtonElement>

// We omit a few attributes from the base ElChip component (itself based on a <button>):
// - `disabled`: we use `isDisabled` instead (which maps to `aria-disabled`).
// - `type`: chips should never be used as form submit or reset buttons.
type ElementAttributesToOmit = Extract<keyof ElementAttributes, 'disabled' | 'type'>

interface ChipProps extends Omit<ElementAttributes, ElementAttributesToOmit> {
  children: ReactNode
  isDisabled?: boolean
  willTruncateLabel?: boolean
  variant: 'filter' | 'selection'
}

/**
 * An interactive chip that should be cleared (or removed) when clicked. Typically used within a `ChipGroup`.
 */
export function Chip({ children, isDisabled, onClick, variant, willTruncateLabel, ...rest }: ChipProps) {
  const handleClick = useCallback<MouseEventHandler<HTMLButtonElement>>(
    (event) => {
      // We are not using <button>'s `disabled` attribute because disabled buttons are bad for a11y.
      // Rather, we keep the <button> enabled and available in the a11y tree, but mark it as disabled using
      // `aria-disabled`. This means click events will still be fired, so we need to prevent any default action
      // for the button from occuring, stop it propagating to ancestors and avoid calling the consumer-supplied
      // `onClick` callback.
      if (isDisabled) {
        event.preventDefault()
        event.stopPropagation()
        return
      }
      onClick?.(event)
    },
    [isDisabled, onClick],
  )

  return (
    <ElChip {...rest} type="button" aria-disabled={isDisabled} data-variant={variant} onClick={handleClick}>
      <ElChipLabel data-will-truncate={willTruncateLabel}>{children}</ElChipLabel>
      <ElChipClearIcon icon="close" />
    </ElChip>
  )
}
