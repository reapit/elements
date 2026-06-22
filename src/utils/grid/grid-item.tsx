import { cx } from '@linaria/core'
import { elGridItem } from './styles'
import type { CSSProperties, ComponentPropsWithoutRef, ElementType } from 'react'

export namespace GridItem {
  export interface BaseProps {
    /**
     * Shorthand for `grid-column-start` and `grid-column-end`.
     * Accepts any valid [grid-column](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-column) value,
     * e.g. `"1 / 3"`, `"1 / -1"`, `"span 2"`.
     */
    column?: string
    /**
     * Shorthand for `grid-row-start` and `grid-row-end`.
     * Accepts any valid [grid-row](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-row) value,
     * e.g. `"1 / 3"`, `"span 2"`.
     */
    row?: string
    /**
     * Named area placement.
     * Accepts any valid [grid-area](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-area) value.
     */
    area?: string
    /**
     * Overrides block-axis alignment for this item within its cell.
     */
    alignSelf?: 'auto' | 'normal' | 'start' | 'end' | 'center' | 'stretch' | 'baseline'
    /**
     * Overrides inline-axis alignment for this item within its cell.
     */
    justifySelf?: 'auto' | 'normal' | 'start' | 'end' | 'center' | 'stretch' | 'baseline'
  }

  export type Props<C extends ElementType = 'div'> = BaseProps &
    Omit<ComponentPropsWithoutRef<C>, keyof BaseProps> & {
      as?: C
    }
}

/**
 * A polymorphic grid item. Exposes CSS grid item placement and alignment properties as React props.
 *
 * Prop-driven styles are applied as inline styles and take precedence over any `className` styles.
 *
 * Intended for use as a direct child of `Grid`.
 */
export function GridItem<C extends ElementType = 'div'>({
  as,
  column,
  row,
  area,
  alignSelf,
  justifySelf,
  className,
  style,
  ...rest
}: GridItem.Props<C>) {
  const Element = as || 'div'

  const itemStyle: CSSProperties = {
    ...(column && { gridColumn: column }),
    ...(row && { gridRow: row }),
    ...(area && { gridArea: area }),
    ...(alignSelf && { alignSelf }),
    ...(justifySelf && { justifySelf }),
  }

  return <Element {...rest} className={cx(elGridItem, className)} style={{ ...style, ...itemStyle }} />
}
