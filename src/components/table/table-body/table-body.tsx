import React, { FC, ReactNode, TableHTMLAttributes } from 'react'
import { ElTableBody } from './styles'

export interface TableBodyProps extends TableHTMLAttributes<HTMLTableSectionElement> {
  children: ReactNode
}

export const TableBody: FC<TableBodyProps> = ({ children, ...rest }) => {
  return (
    <ElTableBody role="rowgroup" {...rest}>
      {children}
    </ElTableBody>
  )
}
