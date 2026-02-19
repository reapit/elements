import { cx } from '@linaria/core'
import { elDescriptionListItem, elDescriptionListItemDescription, elDescriptionListItemLabel } from './styles'
import { useDescriptionListContext } from '../context'

import type { HTMLAttributes } from 'react'

export namespace DescriptionListItem {
  export interface Props extends HTMLAttributes<HTMLDivElement> {
    /**
     * The CSS [grid-area](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/grid-area)
     * specifies the item's size and location within the description list's grid. Typically used to enable
     * an item to span multiple columns and/or rows.
     */
    area?: string
    /** The description content to display. */
    children: React.ReactNode
    /** The label text to display. */
    label: React.ReactNode
    /**
     * The layout variant. "tabular" uses CSS Grid subgrid to align columns, "inline" displays label and description
     * in a row, "stacked" displays them vertically.
     */
    layout?: 'stacked' | 'tabular' | 'inline'
    /** The size of the description list item. */
    size?: 'base' | 'sm'
  }
}

/**
 * A single item in a description list. Relates a term (the label), to its definition/description.
 *
 * Supports the following layouts:
 * - "stacked": Label and description stack vertically
 * - "tabular": Uses CSS Grid subgrid to align with the parent DescriptionList's column layout
 * - "inline": Label and description display in a row
 *
 * The layout and size can be inherited from a parent DescriptionList via context or overridden with their
 * respective props.
 */
export function DescriptionListItem({
  className,
  children,
  area,
  label,
  layout: layoutProp,
  size: sizeProp,
  style,
  ...rest
}: DescriptionListItem.Props) {
  const context = useDescriptionListContext()
  const layout = layoutProp ?? context.layout ?? 'stacked'
  const size = sizeProp ?? context.size ?? 'base'

  return (
    <div
      {...rest}
      className={cx(elDescriptionListItem, className)}
      data-layout={layout}
      data-size={size}
      style={{ ...style, ...(area && { gridArea: area }) }}
    >
      <dt className={elDescriptionListItemLabel}>{label}</dt>
      <dd className={elDescriptionListItemDescription}>{children}</dd>
    </div>
  )
}

DescriptionListItem.displayName = 'DescriptionList.Item'
