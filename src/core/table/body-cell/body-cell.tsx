import { cx } from '@linaria/core'
import { elTableBodyCell } from './styles'

import type { HTMLAttributes, ReactNode, TdHTMLAttributes, ThHTMLAttributes } from 'react'

interface TableBodyCellCommonProps {
  /** The alignment of the cell's content. */
  justifySelf?: 'start' | 'center' | 'end'
}

interface TableBodyCellAsTdProps extends TableBodyCellCommonProps, TdHTMLAttributes<HTMLTableCellElement> {
  as?: 'td'
  /** The cell content. */
  children: ReactNode
}

interface TableBodyCellAsThProps
  extends TableBodyCellCommonProps,
    // NOTE: we omit scope because it should always be "row"
    Omit<ThHTMLAttributes<HTMLTableCellElement>, 'scope'> {
  as: 'th'
  /** The cell content. */
  children: ReactNode
}

interface TableBodyCellAsDivProps extends TableBodyCellCommonProps, HTMLAttributes<HTMLDivElement> {
  as: 'div'
  /** The cell content. */
  children: ReactNode
}

type TableBodyCellProps = TableBodyCellAsTdProps | TableBodyCellAsThProps | TableBodyCellAsDivProps

/**
 * A basic cell for a table's body. Does little more than render its children in a `<td>`,
 * `<th>`, or `<div>` element. Typically used via `Table.BodyCell`.
 */
export function TableBodyCell({ as: Element = 'td', children, className, justifySelf, ...rest }: TableBodyCellProps) {
  const thElementScope = Element === 'th' ? { scope: 'row' } : undefined
  return (
    <Element {...rest} {...thElementScope} className={cx(elTableBodyCell, className)} data-justify-self={justifySelf}>
      {children}
    </Element>
  )
}
