import { cx } from '@linaria/core'
import {
  elAtAGlanceCard,
  elAtAGlanceCardIcon,
  elAtAGlanceCardLabel,
  elAtAGlanceCardDescription,
  elAtAGlanceCardValue,
} from '../card'
import { elAtAGlanceAnchorCard } from './styles'
import { useId } from 'react'

import type { AnchorHTMLAttributes, ReactNode } from 'react'

export namespace AtAGlanceAnchorCard {
  export interface Props extends AnchorHTMLAttributes<HTMLAnchorElement> {
    /** Indicates the link represents the current page. */
    'aria-current'?: 'page' | false
    /** Optional description text. */
    description?: ReactNode
    /** The display value/metric to show. */
    displayValue: ReactNode
    /** The URL to link to. */
    href: string
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
 * A navigable card that links to a URL. The entire card is clickable.
 * Use this component when the card should navigate to another page or section.
 * The value text is displayed in the action color to indicate interactivity.
 */
export function AtAGlanceAnchorCard({
  'aria-current': ariaCurrent,
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
}: AtAGlanceAnchorCard.Props) {
  const labelId = useId()
  const descriptionId = useId()
  const displayValueId = useId()
  return (
    <a
      {...rest}
      aria-current={ariaCurrent}
      aria-labelledby={labelId}
      aria-describedby={`${description ? descriptionId : ''} ${displayValueId}`}
      className={cx(className, elAtAGlanceCard, elAtAGlanceAnchorCard)}
      data-layout={layout}
      style={{ ...style, maxWidth, minWidth }}
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
    </a>
  )
}

AtAGlanceAnchorCard.displayName = 'AtAGlance.AnchorCard'
