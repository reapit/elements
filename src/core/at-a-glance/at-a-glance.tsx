import { AtAGlanceCard } from './card'
import { AtAGlanceAnchorCard } from './anchor-card'
import { AtAGlanceButtonCard } from './button-card'
import { AtAGlanceCarousel } from './carousel'
import { AtAGlanceGrid } from './grid'
import { AtAGlanceHeader } from './header'
import { ElAtAGlance } from './styles'

import type { HTMLAttributes } from 'react'
import { AtAGlanceListbox } from './listbox'

export namespace AtAGlance {
  export interface Props extends HTMLAttributes<HTMLElement> {}
}

/**
 * At a glance is a set of cards used to summarise key information from a dataset.
 * Optionally, it can be used as a way to filter the dataset or link to another section
 * or page for additional information.
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
AtAGlance.Listbox = AtAGlanceListbox
AtAGlance.ListboxOption = AtAGlanceListbox.Option
