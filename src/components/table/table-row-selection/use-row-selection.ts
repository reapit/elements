import { useState } from 'react'
import { UseRowSelectionProps } from './types'

export const useRowSelection = ({ rows, idKey }: UseRowSelectionProps) => {
  const [selectedRows, setSelectedRows] = useState(new Set<string>())

  const handleRowSelect = (id: string) => {
    setSelectedRows((prevSelected) => {
      const newSelected = new Set(prevSelected)
      if (newSelected.has(id)) {
        newSelected.delete(id)
      } else {
        newSelected.add(id)
      }
      return newSelected
    })
  }

  const handleSelectAll = (isSelected: boolean) => {
    setSelectedRows(isSelected ? new Set(rows.map((row) => row[idKey])) : new Set())
  }

  const isRowSelected = (id: string) => selectedRows.has(id)

  return {
    selectedRows,
    handleRowSelect,
    handleSelectAll,
    isRowSelected,
  }
}
