import {
  AtAGlanceCard,
  AtAGlanceCardIcon,
  AtAGlanceCardLabel,
  AtAGlanceCardDescription,
  AtAGlanceCardValue,
} from '../card'
import { useId } from 'react'

import type { AnchorHTMLAttributes, ReactNode } from 'react'

// NOTE: we omit children because this component doesn't accept children.
type AttributesToOmit = 'children'

export namespace AtAGlanceAnchorCard {
  export interface Props extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, AttributesToOmit> {
    /** Indicates the link represents the current page. */
    'aria-current'?: 'page' | false
    /** Secondary text below the label. */
    description?: ReactNode
    /** The display value/metric to show. */
    displayValue: ReactNode
    /** The URL to link to. */
    href: string
    /** Icon displayed in the icon grid area. */
    icon?: ReactNode
    /** The label text for the card content. */
    label: ReactNode
    /**
     * The layout for the card content.
     * @default 'vertical'
     */
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
 * The value text is displayed in the action colour to indicate interactivity.
 */
export function AtAGlanceAnchorCard({
  description,
  displayValue,
  icon,
  label,
  layout = 'vertical',
  ...rest
}: AtAGlanceAnchorCard.Props) {
  const labelId = useId()
  const descriptionId = useId()
  const valueId = useId()

  return (
    <AtAGlanceCard
      {...rest}
      aria-describedby={`${description ? descriptionId : ''} ${valueId}`.trim()}
      aria-labelledby={labelId}
      as="a"
      layout={layout}
    >
      {icon && <AtAGlanceCardIcon>{icon}</AtAGlanceCardIcon>}
      <AtAGlanceCardLabel id={labelId}>{label}</AtAGlanceCardLabel>
      {description && <AtAGlanceCardDescription id={descriptionId}>{description}</AtAGlanceCardDescription>}
      <AtAGlanceCardValue id={valueId}>{displayValue}</AtAGlanceCardValue>
    </AtAGlanceCard>
  )
}

AtAGlanceAnchorCard.displayName = 'AtAGlance.AnchorCard'
