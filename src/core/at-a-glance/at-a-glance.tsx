import { AtAGlanceCard } from './card'
import { AtAGlanceAnchorCard } from './anchor-card'
import { AtAGlanceButtonCard } from './button-card'
import { AtAGlanceCarousel } from './carousel'
import { AtAGlanceGrid } from './grid'
import { AtAGlanceHeader } from './header'
import { ElAtAGlance } from './styles'

import type { HTMLAttributes } from 'react'

export namespace AtAGlance {
  export interface Props extends HTMLAttributes<HTMLElement> {}
}

/**
 * Container component for at-a-glance information displays.
 * Use with the nested card components to create information dashboards.
 */
export function AtAGlance(props: AtAGlance.Props) {
  return <ElAtAGlance {...props} />
}

AtAGlance.AnchorCard = AtAGlanceAnchorCard
AtAGlance.ButtonCard = AtAGlanceButtonCard
AtAGlance.Card = AtAGlanceCard
AtAGlance.Carousel = AtAGlanceCarousel
AtAGlance.Grid = AtAGlanceGrid
AtAGlance.GridItem = AtAGlanceGrid.Item
AtAGlance.Header = AtAGlanceHeader
