import React, { FC, TableHTMLAttributes } from 'react'
import { ElTableRow } from './styles'

export interface ITableRowProps extends TableHTMLAttributes<HTMLTableRowElement> {
  isSelected?: boolean
}

export const TableRow: FC<ITableRowProps> = ({ children, isSelected, ...rest }) => {
  return (
    <ElTableRow role="row" {...rest} data-selected={isSelected}>
      {children}
    </ElTableRow>
  )
}
