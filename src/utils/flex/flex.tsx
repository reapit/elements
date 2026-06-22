import { cx } from '@linaria/core'
import { FlexItem } from './flex-item'
import { elFlex } from './styles'

import type { CSSProperties, ComponentPropsWithoutRef, ElementType } from 'react'

export namespace Flex {
  export interface BaseProps {
    /**
     * Controls how rows are distributed along the cross axis when there is extra space.
     */
    alignContent?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'space-between' | 'space-around' | 'space-evenly'
    /**
     * Aligns flex items along the cross axis.
     */
    alignItems?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline'
    /**
     * The gap between all flex items, using a spacing token (e.g. `'--spacing-2'`).
     * Expanded to `columnGap` and `rowGap` internally; either prop takes precedence if also set.
     */
    gap?: `--spacing-${string}`
    /**
     * The gap between columns, using a spacing token (e.g. `'--spacing-2'`).
     */
    columnGap?: `--spacing-${string}`
    /**
     * The direction in which flex items are laid out.
     */
    direction?: 'row' | 'row-reverse' | 'column' | 'column-reverse'
    /**
     * Whether to use `inline-flex` instead of `flex`.
     */
    isInline?: boolean
    /**
     * Distributes flex items along the main axis.
     */
    justifyContent?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly'
    /**
     * The gap between rows, using a spacing token (e.g. `'--spacing-2'`).
     */
    rowGap?: `--spacing-${string}`
    /**
     * Controls whether flex items are forced onto a single line or can wrap onto multiple lines.
     */
    wrap?: 'nowrap' | 'wrap' | 'wrap-reverse'
  }

  export type Props<C extends ElementType = 'div'> = BaseProps &
    Omit<ComponentPropsWithoutRef<C>, keyof BaseProps> & {
      /**
       * The element to render as. Defaults to `div`.
       */
      as?: C
    }

  export type ItemBaseProps = FlexItem.BaseProps
  export type ItemProps<C extends ElementType = 'div'> = FlexItem.Props<C>
}

/**
 * A layout component that applies CSS flexbox to its container. Use `Flex.Item` to control
 * item-level flex properties on individual children.
 */
export function Flex<C extends ElementType = 'div'>({
  alignContent,
  alignItems,
  as,
  className,
  columnGap,
  direction,
  gap,
  isInline,
  justifyContent,
  rowGap,
  style,
  wrap,
  ...rest
}: Flex.Props<C>) {
  const Element = (as ?? 'div') as ElementType

  const inlineStyles: CSSProperties = {
    ...(isInline !== undefined && { display: isInline ? 'inline-flex' : 'flex' }),
    ...(direction && { flexDirection: direction }),
    ...(wrap && { flexWrap: wrap }),
    ...(alignItems && { alignItems }),
    ...(alignContent && { alignContent }),
    ...(justifyContent && { justifyContent }),
    ...(gap && { columnGap: `var(${gap})`, rowGap: `var(${gap})` }),
    ...(columnGap && { columnGap: `var(${columnGap})` }),
    ...(rowGap && { rowGap: `var(${rowGap})` }),
  }

  return <Element {...rest} className={cx(elFlex, className)} style={{ ...inlineStyles, ...style }} />
}

Flex.Item = FlexItem
