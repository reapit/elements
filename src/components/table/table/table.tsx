import React, { FC, TableHTMLAttributes } from 'react'
import { ElTable } from './styles'

export interface TableProps extends TableHTMLAttributes<HTMLTableElement> {}

export const Table: FC<TableProps> = ({ children, ...rest }) => {
  return <ElTable {...rest}>{children}</ElTable>
}
