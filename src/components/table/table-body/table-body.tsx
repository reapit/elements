import React, { FC, ReactNode, TableHTMLAttributes } from 'react'
import { ElTableBody } from './styles'

export interface ITableBodyProps extends TableHTMLAttributes<HTMLTableSectionElement> {
  children?: ReactNode
}

export const TableBody: FC<ITableBodyProps> = ({ children, ...rest }) => {
  return (
    <ElTableBody role="rowgroup" {...rest}>
      {children}
    </ElTableBody>
  )
}
