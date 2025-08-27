import { cx } from '@linaria/core'
import { elTableBodyRow } from './styles'

import type { HTMLAttributes, ReactNode } from 'react'

interface TableBodyRowAsTrProps extends HTMLAttributes<HTMLTableRowElement> {
  as?: 'tr'
  /** The cell content. */
  children: ReactNode
}

interface TableBodyRowAsDivProps extends HTMLAttributes<HTMLDivElement> {
  as: 'div'
  /** The row content. */
  children: ReactNode
}

type TableBodyRowProps = TableBodyRowAsTrProps | TableBodyRowAsDivProps

/**
 * A basic row for a table's body. Does little more than render it's children in a `<tr>` or `<div>`.
 * Cells within a row may contain interactive elements such as buttons, links or menus. Cells are
 * aligned to the table's CSS grid layout via
 * [subgrid](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout/Subgrid).
 *
 * The row itself should never be interactive. When a row must *appear* to be clickable to users,
 * [Table.PrimaryAction](./?path=/docs/core-table-primaryaction--docs) should be used in the row's header
 * cell; it's "hit area" will cover the entire row to give users the experience of being interactive
 * without violating accessibility guidelines or producing an invalid DOM hierarchy.
 *
 * Typically used via `Table.BodyRow`.
 */
export function TableBodyRow({ as: Element = 'tr', children, className, ...rest }: TableBodyRowProps) {
  return (
    <Element {...rest} className={cx(elTableBodyRow, className)}>
      {children}
    </Element>
  )
}
