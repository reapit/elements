import React from 'react'
import { Checkbox } from '../../checkbox'
import { TableRowSelectionProps } from './types'

/**
 * TableRowSelection component: A checkbox for selecting rows in a table.
 * This component can be used for both individual row selection and "select all" functionality.
 *
 * @param {TableRowSelectionProps} props - The properties for the component.
 * @returns {ReactNode} The rendered checkbox element.
 */
export const TableRowSelection: React.FC<TableRowSelectionProps> = ({
  id,
  isSelectAll = false,
  onChange,
  checked,
  isIndeterminate = false,
  ...rest
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.checked)
  }

  return (
    <Checkbox
      {...rest}
      isIndeterminate={isIndeterminate}
      checked={checked}
      onChange={handleChange}
      aria-label={isSelectAll ? 'Select all rows' : `Select row ${id}`}
    />
  )
}
