import { useContext } from 'react'
import { TableDriver } from './table-driver'

export const useTable = () => {
  return useContext(TableDriver)
}
