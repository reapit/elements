import { cx } from '@linaria/core'
import { elTableHeaderCell } from './styles'

import type { HTMLAttributes, ReactNode, ThHTMLAttributes } from 'react'

interface TableHeaderCellCommonProps {
  /** The cell content. */
  children?: ReactNode
  /** The alignment of the cell's content. */
  justifySelf?: 'start' | 'center' | 'end'
}

interface TableHeaderCellAsThProps
  extends TableHeaderCellCommonProps,
    // NOTE: we omit scope because it should always be "col"
    Omit<ThHTMLAttributes<HTMLTableCellElement>, 'scope'> {
  /** The sort direction currently applied to the column. */
  'aria-sort'?: 'ascending' | 'descending'
  as?: 'th'
}

interface TableHeaderCellAsDivProps extends TableHeaderCellCommonProps, HTMLAttributes<HTMLDivElement> {
  /** The sort direction currently applied to the column. */
  'aria-sort'?: 'ascending' | 'descending'
  as: 'div'
}

type TableHeaderCellProps = TableHeaderCellAsThProps | TableHeaderCellAsDivProps

/**
 * A basic header cell for a table's head. Does little more than render its children in a `<th>`, or
 * `<div>` element. Typically used via `Table.HeaderCell`.
 */
export function TableHeaderCell({
  as: ElementProp = 'th',
  children,
  className,
  justifySelf,
  ...rest
}: TableHeaderCellProps) {
  // If there's no children (i.e. it's an empty cell), we need to render as a <td>, not a <th>, but this
  // only relevant if we're rendering as a <th> element in the first-place.
  const Element = !children && ElementProp === 'th' ? 'td' : ElementProp
  const thElementScope = Element === 'th' ? { scope: 'col' } : undefined
  return (
    <Element {...rest} {...thElementScope} className={cx(elTableHeaderCell, className)} data-justify-self={justifySelf}>
      {children}
    </Element>
  )
}
