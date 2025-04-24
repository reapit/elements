import React, { FC, ReactNode, TableHTMLAttributes } from 'react'
import { ElTableHead, ElTableRowHead } from './styles'

export interface TableHeadProps extends TableHTMLAttributes<HTMLTableSectionElement> {
  children?: ReactNode
  isSticky?: boolean
}

/**
 * A standard HTML/JSX `<thead>` component for use in tables.
 *
 * This example demonstrates how to use the `TableHead` component in a basic table setup.
 * It includes five columns, featuring a checkbox, text, and image headers.
 *
 * The `TableHead` component defines the header section of a table,
 * typically containing `TableHeaderCell` elements that represent column headers.
 *
 * It can be used alongside other components such as `Table`, `TableBody`, and `TableToolbar`
 * to build a fully functional table.
 *
 * ### Props (`TableHeadProps`):
 * - `isSticky`: Enables a sticky header style to keep it visible while scrolling.
 */

export const TableHead: FC<TableHeadProps> = ({ children, isSticky, ...rest }) => {
  return (
    <ElTableHead {...rest} data-position={isSticky ? 'sticky' : 'relative'}>
      <ElTableRowHead>{children}</ElTableRowHead>
    </ElTableHead>
  )
}
