import { cx } from '@linaria/core'
import { elTable } from './styles'
import { TableBody } from './body'
import { TableBodyCell } from './body-cell'
import { TableBodyRow } from './body-row'
import { TableCellDoubleLineLayout } from './double-line-layout'
import { TableCellPrimaryData } from './primary-data'
import { TableCellSortButton } from './sort-button'
import { TableHead } from './head'
import { TableHeaderCell } from './header-cell'
import { TableHeaderRow } from './header-row'
import { TableRowPrimaryAction } from './primary-action'
import { TableRowPrimaryActionButton } from './primary-action/primary-action-button'

import type { CSSProperties, HTMLAttributes, ReactNode } from 'react'
import { TableRowMoreActions } from './more-actions'

interface CommonTablePros {
  /** The `grid-template-columns` definition for the table. */
  columns: string
  justifyItems?: 'start' | 'center' | 'end'
}

// NOTE: We do not use TableHTMLAttributes because the table-specific attributes it provides are
// deprecated (see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/table#attributes).
interface TableAsTableProps extends CommonTablePros, HTMLAttributes<HTMLTableElement> {
  as?: 'table'
  /** The table's content. */
  children: ReactNode
}

interface TableAsDivProps extends CommonTablePros, HTMLAttributes<HTMLDivElement> {
  as: 'div'
  /** The table's content. */
  children: ReactNode
}

type TableProps = TableAsTableProps | TableAsDivProps

/**
 * A classic table. Renders its children in a `<table>` or `<div>` element based on the specified columns.
 *
 * Tables are built by composing the following atoms:
 * - **Table head:** [Table.Head](./?path=/docs/core-table-head--docs),
 * [Table.HeaderRow](./?path=/docs/core-table-headerrow--docs),
 * [Table.HeaderCell](./?path=/docs/core-table-headercell--docs), and
 * [Table.SortButton](./?path=/docs/core-table-sortbutton--docs)
 * - **Table body:** [Table.Body](./?path=/docs/core-table-body--docs),
 * [Table.BodyRow](./?path=/docs/core-table-bodyrow--docs),
 * [Table.BodyCell](./?path=/docs/core-table-bodycell--docs),
 * [Table.PrimaryAction](./?path=/docs/core-table-primaryaction--docs),
 * [Table.MoreActions](./?path=/docs/core-table-moreactions--docs),
 * [Table.DoubleLineLayout](./?path=/docs/core-table-doublelinelayout--docs), and
 * [Table.PrimaryData](./?path=/docs/core-table-primarydata--docs)
 */
export function Table({
  as: Element = 'table',
  children,
  className,
  columns,
  justifyItems = 'start',
  style,
  ...rest
}: TableProps) {
  return (
    <Element
      {...rest}
      className={cx(elTable, className)}
      data-justify-items={justifyItems}
      style={{ ...style, gridTemplateColumns: columns } as CSSProperties}
    >
      {children}
    </Element>
  )
}

Table.Body = TableBody
Table.BodyCell = TableBodyCell
Table.BodyRow = TableBodyRow
Table.PrimaryAction = TableRowPrimaryAction
Table.PrimaryActionButton = TableRowPrimaryActionButton
Table.MoreActions = TableRowMoreActions
Table.DoubleLineLayout = TableCellDoubleLineLayout
Table.PrimaryData = TableCellPrimaryData

Table.Head = TableHead
Table.HeaderCell = TableHeaderCell
Table.HeaderRow = TableHeaderRow
Table.SortButton = TableCellSortButton
