import React, { TableHTMLAttributes } from 'react'
import { ElTable } from './styles'
import { IData } from './types'
import { TableDriver } from './table-driver'

export interface ITableProps<TRow = any, THead = any> extends TableHTMLAttributes<HTMLTableElement> {
  data?: IData<THead, TRow>
}

export const doSort = () => (callback?: () => void) => {
  callback?.()
}

export const Table = <TRow, THead>({ children, data, ...rest }: ITableProps<TRow, THead>) => {
  return (
    <TableDriver.Provider value={{ heads: data?.heads || [], rows: data?.rows || [], doSort: doSort() }}>
      <ElTable {...rest}>{children}</ElTable>
    </TableDriver.Provider>
  )
}
