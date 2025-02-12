import React, { FC, ReactNode, TableHTMLAttributes } from 'react'
import { ElTable } from './styles'

export interface TableProps extends TableHTMLAttributes<HTMLTableElement> {
  children: ReactNode
}

export const Table: FC<TableProps> = ({ children, ...rest }) => {
  return <ElTable {...rest}>{children}</ElTable>
}
