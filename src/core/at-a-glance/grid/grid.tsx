import { AtAGlanceGridItem } from './grid-item'
import { ElAtAGlanceGrid } from './styles'
import type { CSSProperties, HTMLAttributes, ReactNode } from 'react'

export namespace AtAGlanceGrid {
  export interface Props extends HTMLAttributes<HTMLUListElement> {
    /**
     * Width of implicitly created grid columns. Applies only when `layout="auto"`.
     * Accepts any valid [grid-auto-columns](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/grid-auto-columns) value.
     */
    autoColumns?: string
    /** The cards to display in the grid. */
    children: ReactNode
    /**
     * Number and size of explicitly created grid columns. Applies only when `layout="template"`.
     * Accepts any valid [grid-template-columns](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-columns) value.
     * @default '1fr 1fr 1fr 1fr 1fr'
     */
    templateColumns?: string
    /**
     * Layout mode for the grid. Use `"auto"` with `autoColumns` for implicit column sizing,
     * or `"template"` (default) with `templateColumns` for explicit sizing.
     * @default 'template'
     */
    layout?: 'auto' | 'template'
  }
}

/**
 * A grid container for at-a-glance cards. Access this component via `AtAGlance.Grid`.
 * Renders as a `<ul>` element, so wrap each card in `AtAGlance.GridItem` (which renders as `<li>`).
 */
export function AtAGlanceGrid({
  autoColumns,
  children,
  templateColumns = '1fr 1fr 1fr 1fr 1fr',
  layout = 'template',
  style,
  ...rest
}: AtAGlanceGrid.Props) {
  const gridStyles: CSSProperties = {
    ...(layout === 'auto' && autoColumns ? { gridAutoColumns: autoColumns } : {}),
    ...(layout === 'template' && templateColumns ? { gridTemplateColumns: templateColumns } : {}),
  }
  return (
    <ElAtAGlanceGrid {...rest} data-layout={layout} style={{ ...style, ...gridStyles }}>
      {children}
    </ElAtAGlanceGrid>
  )
}

AtAGlanceGrid.displayName = 'AtAGlance.Grid'
AtAGlanceGrid.Item = AtAGlanceGridItem
