import React, { FC, ReactNode, TableHTMLAttributes } from 'react'
import { ElTableRow } from './styles'

export interface TableRowProps extends TableHTMLAttributes<HTMLTableRowElement> {
  isSelected?: boolean
  children: ReactNode
}

/**
 * A standard HTML/JSX `<tr>` component for use in tables.
 *
 * This component will continue developt by @Dhanish.
 */

export const TableRow: FC<TableRowProps> = ({ children, isSelected, ...rest }) => {
  return (
    <ElTableRow role="row" {...rest} data-selected={isSelected}>
      {children}
    </ElTableRow>
  )
}
