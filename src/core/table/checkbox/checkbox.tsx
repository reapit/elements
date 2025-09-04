import { cx } from '@linaria/core'
import { elTableCellCheckbox } from './styles'
import { Input } from '#src/core/input'

import { forwardRef, type InputHTMLAttributes } from 'react'

// NOTE: we omit...
// - type, because this component will always be a checkbox input
type AttributesToOmit = 'type'

export interface TableCellCheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, AttributesToOmit> {
  /** The accessible name for the checkbox. */
  'aria-label': string
  /** Indicates whether the checkbox or radio is checked. */
  checked?: boolean
  /** Whether the checkbox is disabled. Typically, row selection checkboxes should avoid being disabled. */
  disabled?: boolean
  /** The form this checkbox is associated with. */
  form?: string
  /**
   * Name of the checkbox. Submitted as part of a name/value pair. Will typically be the same name as
   * all other checkboxes in the same column of the table.
   */
  name?: string
  /**
   * The value that should be submitted with a form when the checkbox is checked. For row checkboxes, this
   * will typically be the ID of the entity represented by the row this checkbox is a descendant of.
   */
  value?: InputHTMLAttributes<HTMLInputElement>['value']
}

/**
 * A thin wrapper around [Input's checkbox implementation](./?path=/docs/core-input--docs) that is geared
 * for use in tables built with [Table](./?path=/docs/core-table--docs).
 */
export const TableCellCheckbox = forwardRef<HTMLInputElement, TableCellCheckboxProps>(({ className, ...rest }, ref) => {
  return <Input {...rest} className={cx(elTableCellCheckbox, className)} ref={ref} type="checkbox" />
})

TableCellCheckbox.displayName = 'TableCellCheckbox'
