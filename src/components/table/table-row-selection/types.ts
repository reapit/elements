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
 * Props for the useRowSelection custom hook.
 * @property {Row[]} rows - The array of row data objects.
 * @property {string} idKey - The key used to access the unique ID of each row.
 */
export interface UseRowSelectionProps {
  rows: Row[]
  idKey: string
}

/**
 * Props for the TableRowSelection component.
 *
 * @property {string} id - The ID of the row this checkbox is associated with.
 * @property {boolean} [isSelectAll] - If true, this is the "select all" checkbox. Defaults to false.
 * @property {(checked: boolean) => void} onChange - Function to call when the checkbox's checked state changes.
 * @property {boolean} checked - Whether the checkbox is currently checked.
 */
export interface TableRowSelectionProps {
  id?: string
  isSelectAll?: boolean
  onChange: (checked: boolean) => void
  checked: boolean
}
