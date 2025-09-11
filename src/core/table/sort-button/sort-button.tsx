import { cx } from '@linaria/core'
import { elTableCellSortButton, elTableCellSortButtonIcon } from './styles'
import { SortDescendIcon } from '#src/icons/sort-descend'

import type { ButtonHTMLAttributes, ReactNode } from 'react'
import type { SortDirection } from './sort-direction'

// NOTE: we omit...
// - disabled, because the sort button should never be disabled
type AttributesToOmit = 'disabled'

export namespace TableCellSortButton {
  export interface Props extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, AttributesToOmit> {
    /** The sort button's label. */
    children: ReactNode
    /** The name of the "field" in the table's data sorted by this button. */
    name: string
    /** The current sort direction for this column, if any. */
    value: SortDirection
  }
}

/**
 * A simple button for table column headers that allows users to sort the column in ascending
 * or descending order. Typically used via `Table.SortButton`.
 */
export function TableCellSortButton({ children, className, name, value, ...rest }: TableCellSortButton.Props) {
  return (
    <button {...rest} className={cx(elTableCellSortButton, className)} name={name} value={value}>
      {children}
      <SortDescendIcon aria-hidden className={elTableCellSortButtonIcon} />
    </button>
  )
}

// Backward compatibility
export type TableCellSortButtonProps = TableCellSortButton.Props
