import { cx } from '@linaria/core'
import { elTableBodyCell } from './styles'

import type { HTMLAttributes, ReactNode, TdHTMLAttributes, ThHTMLAttributes } from 'react'

interface TableBodyCellCommonProps {
  justifyContent?: 'start' | 'center' | 'end'
}

interface TableBodyCellAsTdProps extends TableBodyCellCommonProps, TdHTMLAttributes<HTMLTableCellElement> {
  as?: 'td'
  /** The cell content. */
  children: ReactNode
}

interface TableBodyCellAsThProps extends TableBodyCellCommonProps, ThHTMLAttributes<HTMLTableCellElement> {
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
export function TableBodyCell({
  as: Element = 'td',
  children,
  className,
  justifyContent,
  ...rest
}: TableBodyCellProps) {
  return (
    <Element {...rest} className={cx(elTableBodyCell, className)} data-justify-content={justifyContent}>
      {children}
    </Element>
  )
}
