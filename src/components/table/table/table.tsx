import React, { FC, TableHTMLAttributes } from 'react'
import { ElTable } from './styles'

export interface ITableProps extends TableHTMLAttributes<HTMLTableElement> {}

export const Table: FC<ITableProps> = ({ children, ...rest }) => {
  return <ElTable {...rest}>{children}</ElTable>
}
