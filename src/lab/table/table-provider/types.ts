/**
 * Represents a single row of data in the table.
 *
 * @property {string} id - A unique identifier for the row.
 * This is *required* for row selection and efficient rendering.
 * @property {[key: string]: any} [key: string]: any -  Allows any other properties on the row object.
 * These will be the data displayed in the table cells.
 */
export interface Row {
  id?: string
  [key: string]: any
}

/**
 * Type for the Table context value.  This is what `useTableContext` returns.
 * @property {Row[]} rows - The array of row data objects.
 * @property {string} idKey - The key used to access the unique ID of each row (e.g., "id").
 */
export interface TableContextProps {
  rows: Row[]
  idKey: string
}

/**
 * Props for the TableContext.Provider component.
 * @property {Row[]} rows - The array of row data objects.
 * @property {string} idKey - The key used to access the unique ID of each row (e.g., "id").
 * @property {React.ReactNode} children - The components that should have access to the table context.
 */
export interface TableProviderProps {
  rows: Row[]
  idKey: string
  children: React.ReactNode
}
