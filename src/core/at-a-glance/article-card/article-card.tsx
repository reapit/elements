import { AtAGlanceCard } from '../card'
import { AtAGlanceCardIcon } from '../card/icon'
import { AtAGlanceCardLabel } from '../card/label'
import { AtAGlanceCardDescription } from '../card/description'
import { AtAGlanceCardValue } from '../card/value'

import type { HTMLAttributes, ReactNode } from 'react'

// NOTE: we omit children because the component doesn't accept them
type AttributesToOmit = 'children'

export namespace AtAGlanceArticleCard {
  export interface Props extends Omit<HTMLAttributes<HTMLElement>, AttributesToOmit> {
    /** Secondary text below the label. */
    description?: ReactNode
    /** The display value/metric to show. */
    displayValue: ReactNode
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
 * A static article card for displaying at-a-glance information.
 * Use this component when the card has no click action or navigation.
 */
export function AtAGlanceArticleCard({
  description,
  displayValue,
  icon,
  label,
  layout = 'vertical',
  ...rest
}: AtAGlanceArticleCard.Props) {
  return (
    <AtAGlanceCard {...rest} layout={layout}>
      {icon && <AtAGlanceCardIcon>{icon}</AtAGlanceCardIcon>}
      <AtAGlanceCardLabel>{label}</AtAGlanceCardLabel>
      {description && <AtAGlanceCardDescription>{description}</AtAGlanceCardDescription>}
      <AtAGlanceCardValue>{displayValue}</AtAGlanceCardValue>
    </AtAGlanceCard>
  )
}

AtAGlanceArticleCard.displayName = 'AtAGlance.ArticleCard'
