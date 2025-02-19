import React, { FC, ReactNode, TableHTMLAttributes } from 'react'
import { ElTableBody } from './styles'

export interface TableBodyProps extends TableHTMLAttributes<HTMLTableSectionElement> {
  children: ReactNode
}

/**
 * The `TableBody` component is an essential part of a table structure,
 * serving as a container for table rows (`TableRow`).
 * Each row inside a `TableBody` typically consists of one or more `TableCell` components.
 *
 * ## When to Use
 *
 * - To display structured data inside a table.
 * - When working with dynamic data sets that require programmatically rendered rows.
 * - As part of a table’s body section, following the `TableHead` component.
 *
 * ## Basic Structure
 *
 * A typical table implementation consists of:
 * - `TableHead`: Defines column headers.
 * - `TableBody`: Contains the main data rows.
 */

export const TableBody: FC<TableBodyProps> = ({ children, ...rest }) => {
  return <ElTableBody {...rest}>{children}</ElTableBody>
}
