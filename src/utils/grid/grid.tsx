import { cx } from '@linaria/core'
import { GridItem } from './grid-item'
import { elGrid } from './styles'
import type { CSSProperties, ComponentPropsWithoutRef, ElementType } from 'react'

export namespace Grid {
  export interface BaseProps {
    /**
     * Number and size of explicitly created columns.
     * Accepts any valid [grid-template-columns](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-columns) value.
     */
    templateColumns?: string
    /**
     * Number and size of explicitly created rows.
     * Accepts any valid [grid-template-rows](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-rows) value.
     */
    templateRows?: string
    /**
     * Named grid areas, defining the structure of the grid.
     * Accepts any valid [grid-template-areas](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-areas) value.
     */
    templateAreas?: string
    /**
     * Size of implicitly created columns.
     * Accepts any valid [grid-auto-columns](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-auto-columns) value.
     */
    autoColumns?: string
    /**
     * Size of implicitly created rows.
     * Accepts any valid [grid-auto-rows](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-auto-rows) value.
     */
    autoRows?: string
    /**
     * Direction and density of the auto-placement algorithm.
     */
    autoFlow?: 'row' | 'column' | 'row dense' | 'column dense'
    /**
     * Gap between rows and columns. Accepts a spacing token name, e.g. `--spacing-4`.
     * Use `columnGap` or `rowGap` to set individual axes.
     */
    gap?: `--spacing-${string}`
    /**
     * Gap between columns. Accepts a spacing token name, e.g. `--spacing-4`.
     */
    columnGap?: `--spacing-${string}`
    /**
     * Gap between rows. Accepts a spacing token name, e.g. `--spacing-4`.
     */
    rowGap?: `--spacing-${string}`
    /**
     * Alignment of items along the block (column) axis.
     */
    alignItems?: 'normal' | 'start' | 'end' | 'center' | 'stretch' | 'baseline'
    /**
     * Alignment of items along the inline (row) axis within their cells.
     */
    justifyItems?: 'normal' | 'start' | 'end' | 'center' | 'stretch'
    /**
     * Alignment of tracks along the block axis when extra space is available.
     */
    alignContent?: 'start' | 'end' | 'center' | 'stretch' | 'space-between' | 'space-around' | 'space-evenly'
    /**
     * Alignment of tracks along the inline axis when extra space is available.
     */
    justifyContent?: 'start' | 'end' | 'center' | 'stretch' | 'space-between' | 'space-around' | 'space-evenly'
    /**
     * When `true`, renders as an inline grid container (`display: inline-grid`).
     * When `false`, explicitly forces `display: grid`.
     */
    isInline?: boolean
  }

  export type Props<C extends ElementType = 'div'> = BaseProps &
    Omit<ComponentPropsWithoutRef<C>, keyof BaseProps> & {
      as?: C
    }

  export type ItemBaseProps = GridItem.BaseProps
  export type ItemProps<C extends ElementType = 'div'> = GridItem.Props<C>
}

/**
 * A polymorphic grid container. Exposes mainstream CSS grid container properties as React props.
 *
 * Prop-driven styles are applied as inline styles and take precedence over any `className` styles.
 *
 * Use `Grid.Item` for child items.
 */
export function Grid<C extends ElementType = 'div'>({
  as,
  isInline,
  templateColumns,
  templateRows,
  templateAreas,
  autoColumns,
  autoRows,
  autoFlow,
  gap,
  columnGap,
  rowGap,
  alignItems,
  justifyItems,
  alignContent,
  justifyContent,
  className,
  style,
  ...rest
}: Grid.Props<C>) {
  const Element = as || 'div'

  const gridStyle: CSSProperties = {
    ...(isInline !== undefined && { display: isInline ? 'inline-grid' : 'grid' }),
    ...(templateColumns && { gridTemplateColumns: templateColumns }),
    ...(templateRows && { gridTemplateRows: templateRows }),
    ...(templateAreas && { gridTemplateAreas: templateAreas }),
    ...(autoColumns && { gridAutoColumns: autoColumns }),
    ...(autoRows && { gridAutoRows: autoRows }),
    ...(autoFlow && { gridAutoFlow: autoFlow }),
    ...(gap && { gap: `var(${gap})` }),
    ...(columnGap && { columnGap: `var(${columnGap})` }),
    ...(rowGap && { rowGap: `var(${rowGap})` }),
    ...(alignItems && { alignItems }),
    ...(justifyItems && { justifyItems }),
    ...(alignContent && { alignContent }),
    ...(justifyContent && { justifyContent }),
  }

  return <Element {...rest} className={cx(elGrid, className)} style={{ ...style, ...gridStyle }} />
}

Grid.Item = GridItem
