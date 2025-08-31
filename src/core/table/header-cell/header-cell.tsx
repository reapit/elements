import { cx } from '@linaria/core'
import { elTableHeaderCell } from './styles'

import type { HTMLAttributes, ReactNode, ThHTMLAttributes } from 'react'

interface TableHeaderCellCommonProps {
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
  /** The cell content. */
  children: ReactNode
}

interface TableHeaderCellAsDivProps extends TableHeaderCellCommonProps, HTMLAttributes<HTMLDivElement> {
  /** The sort direction currently applied to the column. */
  'aria-sort'?: 'ascending' | 'descending'
  as: 'div'
  /** The cell content. */
  children: ReactNode
}

type TableHeaderCellProps = TableHeaderCellAsThProps | TableHeaderCellAsDivProps

/**
 * A basic header cell for a table's head. Does little more than render its children in a `<th>`, or
 * `<div>` element. Typically used via `Table.HeaderCell`.
 */
export function TableHeaderCell({
  as: Element = 'th',
  children,
  className,
  justifySelf,
  ...rest
}: TableHeaderCellProps) {
  const thElementScope = Element === 'th' ? { scope: 'col' } : undefined
  return (
    <Element {...rest} {...thElementScope} className={cx(elTableHeaderCell, className)} data-justify-self={justifySelf}>
      {children}
    </Element>
  )
}
