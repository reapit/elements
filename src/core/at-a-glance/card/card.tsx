import type { HTMLAttributes, ReactNode } from 'react'
import { ElAtAGlanceCard } from './styles'

export namespace AtAGlanceCard {
  export interface Props extends HTMLAttributes<HTMLDivElement> {
    /** The content to display inside the card. */
    children: ReactNode
    /** Maximum width of the card. */
    maxWidth?: string
  }
}

/**
 * A simple card container for displaying at-a-glance information.
 * Use with `AtAGlance.CardContent` as children to display structured data.
 */
export function AtAGlanceCard({ children, maxWidth, style, ...rest }: AtAGlanceCard.Props) {
  return (
    <ElAtAGlanceCard style={{ ...style, maxWidth }} {...rest}>
      {children}
    </ElAtAGlanceCard>
  )
}
