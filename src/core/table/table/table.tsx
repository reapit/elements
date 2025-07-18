import React, { FC, ReactNode, TableHTMLAttributes } from 'react'
import { ElTable } from './styles'

export interface TableProps extends TableHTMLAttributes<HTMLTableElement> {
  children: ReactNode
}

/**
 * The `Table` component provides a flexible and structured way to display tabular data.
 *
 * It consists of multiple subcomponents, such as `TableRow` and `TableCell`, allowing for fine-grained customization.
 *
 * ### Usage:
 * For **non-React users** and **React users with basic needs**, the table can be constructed using
 * the following presentational components:
 *
 * - `TableContainer`
 * - `TableToolbar`
 * - `Table`
 * - `TableHead`
 * - `TableHeaderCell`
 * - `TableBody`
 * - `TableRow`
 * - `TableCell`
 *
 * These components ensure a consistent and accessible table structure.
 * Non-React users can refer to the rendered HTML markup for implementation details.
 *
 * ### Advanced Features:
 * For **React users**, additional features enhance the table’s functionality, such as:
 *
 * - Expandable **Call-to-Action (CTA)** containers
 * - Interactive table behaviors
 *
 * While these advanced features offer more flexibility, the core `Table` component and
 * its children are sufficient for most use cases.
 */
export const Table: FC<TableProps> = ({ children, ...rest }) => {
  return <ElTable {...rest}>{children}</ElTable>
}
