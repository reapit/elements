import { cx } from '@linaria/core'
import {
  elAtAGlanceCard,
  elAtAGlanceCardDescription,
  elAtAGlanceCardIcon,
  elAtAGlanceCardLabel,
  elAtAGlanceCardValue,
} from '../card'
import { elAtAGlanceButtonCard } from './styles'
import { useId } from 'react'

import type { ButtonHTMLAttributes, ReactNode } from 'react'

export namespace AtAGlanceButtonCard {
  export interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    /** Optional description text. */
    description?: ReactNode
    /** The display value/metric to show. */
    displayValue: ReactNode
    /** Optional icon to display. */
    icon?: ReactNode
    /** The label text for the card content. */
    label: ReactNode
    /** The layout for the card content. */
    layout?: 'vertical' | 'horizontal' | 'compact'
    /** Maximum width of the card. */
    maxWidth?: string
    /** Minimum width of the card. */
    minWidth?: string
  }
}

/**
 * A button card that triggers an action when clicked. The entire card is clickable.
 * Use this component when the card should trigger an action (onClick handler).
 * The value text is displayed in the action color to indicate interactivity.
 *
 * This component can be used standalone or integrated with Listbox via `AtAGlance.ListboxButtonCard`.
 */
export function AtAGlanceButtonCard({
  'aria-checked': ariaChecked,
  'aria-pressed': ariaPressed,
  'aria-selected': ariaSelected,
  className,
  description,
  displayValue,
  icon,
  label,
  layout = 'vertical',
  maxWidth,
  minWidth,
  style,
  type = 'button',
  ...rest
}: AtAGlanceButtonCard.Props) {
  const labelId = useId()
  const descriptionId = useId()
  const displayValueId = useId()
  return (
    <button
      {...rest}
      aria-checked={ariaChecked}
      aria-pressed={ariaPressed}
      aria-selected={ariaSelected}
      aria-labelledby={labelId}
      aria-describedby={`${description ? descriptionId : ''} ${displayValueId}`}
      className={cx(className, elAtAGlanceCard, elAtAGlanceButtonCard)}
      data-layout={layout}
      style={{ ...style, maxWidth, minWidth }}
      type={type}
    >
      {icon && <span className={elAtAGlanceCardIcon}>{icon}</span>}
      <span className={elAtAGlanceCardLabel} id={labelId}>
        {label}
      </span>
      {description && (
        <span className={elAtAGlanceCardDescription} id={descriptionId}>
          {description}
        </span>
      )}
      <span className={elAtAGlanceCardValue} id={displayValueId}>
        {displayValue}
      </span>
    </button>
  )
}

AtAGlanceButtonCard.displayName = 'AtAGlance.ButtonCard'
