import { getListboxValue } from './dom-helpers'
import { useState } from 'react'
import type { ChangeEventHandler } from 'react'

export namespace useListboxSelectState {
  export interface Input {
    /** Initially selected option values for uncontrolled mode */
    defaultValue?: string | readonly string[]
    /** Allows multiple option selection */
    multiple: boolean
    /** Change event handler for the underlying select element */
    onChange?: ChangeEventHandler<HTMLSelectElement>
    /** Selected option values for controlled mode */
    value?: string | readonly string[]
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
 */
export function useListboxSelectState({
  defaultValue,
  multiple,
  onChange,
  value,
}: useListboxSelectState.Input): useListboxSelectState.Output {
  const [internalValue, setInternalValue] = useState(() => asArray(value ?? defaultValue ?? []))
  // Uses the explicit `value` as the controlled value when provided; otherwise uses internal state.
  const controlledValue = asArray(value ?? internalValue)
  const selectValue = multiple ? controlledValue : controlledValue.slice(0, 1)

  const handleChange: ChangeEventHandler<HTMLSelectElement> = (event) => {
    onChange?.(event)
    setInternalValue(asArray(getListboxValue(event.currentTarget)))
  }

  return [selectValue, handleChange]
}

function asArray(value: string | readonly string[]): readonly string[] {
  return typeof value === 'string' ? [value] : value
}
