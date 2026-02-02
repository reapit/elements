import {
  AtAGlanceCard,
  AtAGlanceCardIcon,
  AtAGlanceCardLabel,
  AtAGlanceCardDescription,
  AtAGlanceCardValue,
} from '../card'
import { useId } from 'react'

import type { ButtonHTMLAttributes, ReactNode } from 'react'

// NOTE: we omit children because the component does not accept them
type AttributesToOmit = 'children'

export namespace AtAGlanceButtonCard {
  export interface Props extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, AttributesToOmit> {
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
 * A button card that triggers an action when clicked. The entire card is clickable.
 * Use this component when the card should trigger an action (onClick handler).
 * The value text is displayed in the action colour to indicate interactivity.
 */
export function AtAGlanceButtonCard({
  description,
  displayValue,
  icon,
  label,
  layout = 'vertical',
  ...rest
}: AtAGlanceButtonCard.Props) {
  const labelId = useId()
  const descriptionId = useId()
  const valueId = useId()

  return (
    <AtAGlanceCard
      {...rest}
      aria-describedby={`${description ? descriptionId : ''} ${valueId}`.trim()}
      aria-labelledby={labelId}
      as="button"
      layout={layout}
    >
      {icon && <AtAGlanceCardIcon>{icon}</AtAGlanceCardIcon>}
      <AtAGlanceCardLabel id={labelId}>{label}</AtAGlanceCardLabel>
      {description && <AtAGlanceCardDescription id={descriptionId}>{description}</AtAGlanceCardDescription>}
      <AtAGlanceCardValue id={valueId}>{displayValue}</AtAGlanceCardValue>
    </AtAGlanceCard>
  )
}

AtAGlanceButtonCard.displayName = 'AtAGlance.ButtonCard'
