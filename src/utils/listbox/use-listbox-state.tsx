import { getListboxValue } from './dom-helpers'
import { useState } from 'react'
import type { ChangeEventHandler } from 'react'

export namespace useListboxState {
  export interface Input {
    /** Initially selected option values for uncontrolled mode */
    defaultValue?: readonly string[]
    /** Allows multiple option selection */
    multiple: boolean
    /** Change event handler for the underlying select element */
    onChange?: ChangeEventHandler<HTMLSelectElement>
    /** Selected option values for controlled mode */
    value?: readonly string[]
  }

  export type Output = [
    /** Currently selected option values */
    value: readonly string[],
    /** Change handler for the select element */
    onChange: ChangeEventHandler<HTMLSelectElement>,
  ]
}

/**
 * Manages selection state for a listbox in both controlled and uncontrolled modes.
 * Supports single- and multi-select behavior.
 *
 * In controlled mode, uses the provided `value` prop to determine selection.
 * In uncontrolled mode, manages internal state initialized from `defaultValue`.
 *
 * For single-select listboxes, uses only the first selected value.
 */
export function useListboxState({
  defaultValue,
  multiple,
  onChange,
  value,
}: useListboxState.Input): useListboxState.Output {
  const [internalValue, setInternalValue] = useState(value ?? defaultValue ?? [])
  // Uses the explicit `value` as the controlled value when provided; otherwise uses internal state.
  const controlledValue = value ?? internalValue
  const selectValue = multiple ? controlledValue : controlledValue.slice(0, 1)

  const handleChange: ChangeEventHandler<HTMLSelectElement> = (event) => {
    onChange?.(event)
    setInternalValue(getListboxValue(event.currentTarget))
  }

  return [selectValue, handleChange]
}
