import { cx } from '@linaria/core'
import { forwardRef } from 'react'
import { CheckboxInput } from '#src/core/checkbox-input'
import { elTableCellCheckbox } from './styles'

import type { InputHTMLAttributes } from 'react'

// NOTE: we omit...
// - defaultChecked, because we control state via checked
// - type, because we internally control the input type
type AttributesToOmit = 'defaultChecked' | 'type'

export namespace TableCellCheckbox {
  export interface Props extends Omit<InputHTMLAttributes<HTMLInputElement>, AttributesToOmit> {
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
     * other row selection checkboxes in the table.
     */
    name?: string
    /** Callback fired when the checkbox state changes. */
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
    /** The accessible name for the checkbox when used in a table header for selecting all rows. */
    title?: string
    /** The value of the checkbox. Submitted as part of a name/value pair. */
    value?: string
  }
}

/**
 * A checkbox meant to be used inside of table cells. Displays an HTML checkbox input. Typically used
 * via `Table.Checkbox`.
 */
export const TableCellCheckbox = forwardRef<HTMLInputElement, TableCellCheckbox.Props>(
  ({ className, ...rest }, ref) => {
    return <CheckboxInput {...rest} className={cx(elTableCellCheckbox, className)} ref={ref} type="checkbox" />
  },
)

TableCellCheckbox.displayName = 'Table.Checkbox'

// Backward compatibility
export type TableCellCheckboxProps = TableCellCheckbox.Props
