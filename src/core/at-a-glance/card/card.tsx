import type { HTMLAttributes, ReactNode } from 'react'
import {
  elAtAGlanceCard,
  elAtAGlanceCardIcon,
  elAtAGlanceCardLabel,
  elAtAGlanceCardDescription,
  elAtAGlanceCardValue,
} from './styles'
import { cx } from '@linaria/core'

export namespace AtAGlanceCard {
  export interface Props extends HTMLAttributes<HTMLElement> {
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
 * A static card for displaying at-a-glance information.
 * Use this component when the card does not need to be interactive (no link or button behavior).
 * For interactive cards, use `AtAGlance.LinkCard` or `AtAGlance.ButtonCard`.
 */
export function AtAGlanceCard({
  className,
  description,
  displayValue,
  icon,
  label,
  layout = 'vertical',
  maxWidth,
  minWidth,
  style,
  ...rest
}: AtAGlanceCard.Props) {
  return (
    <article
      {...rest}
      className={cx(className, elAtAGlanceCard)}
      data-layout={layout}
      style={{ ...style, maxWidth, minWidth }}
    >
      {icon && <span className={elAtAGlanceCardIcon}>{icon}</span>}
      <h1 className={elAtAGlanceCardLabel}>{label}</h1>
      {description && <p className={elAtAGlanceCardDescription}>{description}</p>}
      <p className={elAtAGlanceCardValue}>{displayValue}</p>
    </article>
  )
}

AtAGlanceCard.displayName = 'AtAGlance.Card'
