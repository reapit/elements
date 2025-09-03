import { cx } from '@linaria/core'
import { elTable } from './styles'
import { TableBody } from './body'
import { TableBodyCell } from './body-cell'
import { TableBodyRow } from './body-row'
import { TableCellCheckbox } from './checkbox'
import { TableCellDoubleLineLayout } from './double-line-layout'
import { TableCellPrimaryData } from './primary-data'
import { TableCellSortButton } from './sort-button'
import { TableHead } from './head'
import { TableHeaderCell } from './header-cell'
import { TableHeaderRow } from './header-row'
import { TableRowMoreActions } from './more-actions'
import { TableRowPrimaryAction } from './primary-action'
import { TableRowPrimaryActionButton } from './primary-action/primary-action-button'
import { TableToolbar } from './toolbar'

import type { CSSProperties, HTMLAttributes, ReactNode } from 'react'

interface CommonTablePros {
  /**
   * Defines the number of columns and their explicit sizing. Columns are defined using the
   * [grid-template-columns)(https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-columns)
   * syntax.
   */
  columns: string
  /**
   * Defines how column content is positioned along the inline axis. By default, content is packed
   * against the starting edge of the column.
   */
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
 * Tables are built by composing the following components:
 * - **Table toolbar:** [Table.Toolbar](./?path=/docs/core-table-toolbar--docs)
 *
 * - **Table head:** [Table.Head](./?path=/docs/core-table-head--docs),
 * [Table.HeaderRow](./?path=/docs/core-table-headerrow--docs),
 * [Table.HeaderCell](./?path=/docs/core-table-headercell--docs),
 * [Table.SortButton](./?path=/docs/core-table-sortbutton--docs), and
 * [Table.Checkbox](./?path=/docs/core-table-checkbox--docs)
 *
 * - **Table body:** [Table.Body](./?path=/docs/core-table-body--docs),
 * [Table.BodyRow](./?path=/docs/core-table-bodyrow--docs),
 * [Table.BodyCell](./?path=/docs/core-table-bodycell--docs),
 * [Table.PrimaryAction](./?path=/docs/core-table-primaryaction--docs),
 * [Table.MoreActions](./?path=/docs/core-table-moreactions--docs),
 * [Table.DoubleLineLayout](./?path=/docs/core-table-doublelinelayout--docs),
 * [Table.PrimaryData](./?path=/docs/core-table-primarydata--docs), and
 * [Table.Checkbox](./?path=/docs/core-table-checkbox--docs)
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

Table.Checkbox = TableCellCheckbox

Table.Toolbar = TableToolbar
