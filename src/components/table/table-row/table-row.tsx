import React, { FC, ReactNode, TableHTMLAttributes } from 'react'
import { ElTableRow } from './styles'

export interface TableRowProps extends TableHTMLAttributes<HTMLTableRowElement> {
  isSelected?: boolean
  children: ReactNode
}

export const TableRow: FC<TableRowProps> = ({ children, isSelected, ...rest }) => {
  return (
    <ElTableRow role="row" {...rest} data-selected={isSelected}>
      {children}
    </ElTableRow>
  )
}
