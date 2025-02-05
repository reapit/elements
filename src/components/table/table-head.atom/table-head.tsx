import React, { ReactNode, TableHTMLAttributes } from 'react'
import { ElTableHead } from './styles'
import { useTable } from '../table/use-table'
import { IDoSortFC } from '../table/types'

interface ITableBodyChildProps<TRowItem> {
  row: TRowItem
  doSort: IDoSortFC
}

export interface ITableHeadProps<TRowItem> extends Omit<TableHTMLAttributes<HTMLTableSectionElement>, 'children'> {
  children?: ReactNode | ((props: ITableBodyChildProps<TRowItem>) => ReactNode)
  isSticky?: boolean
}

export const TableHead = <TRow,>({ children, isSticky, ...rest }: ITableHeadProps<TRow>) => {
  if (typeof children == 'function') {
    const dataTable = useTable()
    return (
      <ElTableHead {...rest} data-position={isSticky ? 'sticky' : 'relative'}>
        {dataTable.heads.map((row) => children({ row, doSort: dataTable.doSort }))}
      </ElTableHead>
    )
  }
  return (
    <ElTableHead {...rest} data-position={isSticky ? 'sticky' : 'relative'}>
      {children}
    </ElTableHead>
  )
}
