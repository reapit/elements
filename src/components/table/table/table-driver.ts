import { createContext } from 'react'
import { ITableContext } from './types'

export const TableDriver = createContext<ITableContext<any, any>>({
  rows: [],
  heads: [],
  doSort: () => () => void 0,
})
