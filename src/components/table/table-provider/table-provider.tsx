import React, { createContext, useContext } from 'react'
import { TableProviderProps, TableContextProps } from './types'

const TableContext = createContext<TableContextProps | null>(null)

/**
 * TableProvider component: Provides context for table rows and their unique ID key.
 * This is used to share table data across components without prop drilling.
 *
 * @param {TableProviderProps} props - The properties for the provider.
 * @returns {ReactNode} The context provider wrapping its children.
 */
export const TableProvider: React.FC<TableProviderProps> = ({ rows, idKey, children }) => {
  const value = { rows, idKey }
  return <TableContext.Provider value={value}>{children}</TableContext.Provider>
}

/**
 * Custom hook to access the table context.
 * Throws an error if used outside of a TableProvider.
 *
 * @returns {TableContextProps} The context value containing rows and idKey.
 */
export const useTableContext = () => {
  const context = useContext(TableContext)
  if (!context) {
    throw new Error('useTableContext must be used within a TableProvider')
  }
  return context
}
