import React, { ReactNode, TableHTMLAttributes } from 'react'
import { ElTableBody } from './styles'
import { useTable } from '../table/use-table'

interface ITableBodyChildProps<TRowItem, THeadItem> {
  row: TRowItem
  heads: THeadItem[]
  index: number
}

export interface ITableBodyProps<TRowItem, THeadItem>
  extends Omit<TableHTMLAttributes<HTMLTableSectionElement>, 'children'> {
  children?: ReactNode | ((props: ITableBodyChildProps<TRowItem, THeadItem>) => ReactNode)
}

export const TableBody = <TRow, THead>({ children, ...rest }: ITableBodyProps<TRow, THead>) => {
  if (typeof children == 'function') {
    const dataTable = useTable()
    return (
      <ElTableBody {...rest}>
        {dataTable.rows.map((row, index) => children({ row, index, heads: dataTable.heads }))}
      </ElTableBody>
    )
  }
  return <ElTableBody {...rest}>{children}</ElTableBody>
}
