import React, { FC, ReactNode, TableHTMLAttributes } from 'react'
import { ElTableRow } from './styles'

export interface TableRowProps extends TableHTMLAttributes<HTMLTableRowElement> {
  isSelected?: boolean
  children: ReactNode
}

/**
 * A standard HTML/JSX `<tr>` component for use in tables.
 *
 * ## Features:
 * - Supports all default `<tr>` props.
 * - Allows passing a `isSelected` prop to indicate selection.
 * - Accepts child elements such as `<td>` or `<th>`.
 *
 * ## Example Usage:
 * ```tsx
 * <TableRow isSelected>
 *   <td>Row Content</td>
 * </TableRow>
 * ```
 *
 * @component
 * @param {boolean} [isSelected] - Whether the row is selected.
 * @param {ReactNode} [children] - The content inside the row.
 * @returns {JSX.Element} A `<tr>` element with optional selection state.
 *
 */
export const TableRow: FC<TableRowProps> = ({ children, isSelected, ...rest }) => {
  return (
    <ElTableRow {...rest} data-is-selected={isSelected}>
      {children}
    </ElTableRow>
  )
}
