import type { HTMLAttributes, ReactNode } from 'react'
import {
  ElAtAGlanceCardContent,
  ElAtAGlanceCardContentIcon,
  ElAtAGlanceCardContentLabel,
  ElAtAGlanceCardContentDescription,
  ElAtAGlanceCardContentValue,
} from './styles'

export namespace AtAGlanceCardContent {
  export interface Props extends HTMLAttributes<HTMLDivElement> {
    /** Optional description text. */
    description?: string
    /** Optional icon to display. */
    icon?: ReactNode
    /** The label text for the card content. */
    label: string
    /** The layout for the card content. */
    layout?: 'vertical' | 'horizontal' | 'compact'
    /** The value to display. */
    value: string
  }
}

/**
 * An `AtAGlance` card content component that displays a label, value, and optional description and icon.
 * Supports three layout layouts: vertical, horizontal, and compact.
 */
export function AtAGlanceCardContent({
  label,
  value,
  description,
  icon,
  layout = 'vertical',
  ...rest
}: AtAGlanceCardContent.Props) {
  return (
    <ElAtAGlanceCardContent {...rest} data-layout={layout}>
      {icon && <ElAtAGlanceCardContentIcon>{icon}</ElAtAGlanceCardContentIcon>}
      <ElAtAGlanceCardContentLabel>{label}</ElAtAGlanceCardContentLabel>
      {description && <ElAtAGlanceCardContentDescription>{description}</ElAtAGlanceCardContentDescription>}
      <ElAtAGlanceCardContentValue>{value}</ElAtAGlanceCardContentValue>
    </ElAtAGlanceCardContent>
  )
}
