import { useEffect } from 'react'
import { validateRange } from './validate-range'
import { getInputElement } from './get-input-element'

/**
 * Keeps the input element's native validity in sync with the `min`/`max`
 * constraints, delegating the range decision to `validateRange`.
 *
 * Partial values (`''` and `'-'`) are treated as not-yet-complete and do not
 * trigger a validity error.
 *
 * In controlled mode the validity is set once when the effect runs (and
 * whenever `value`, `parsedMin`, or `parsedMax` changes). In uncontrolled mode
 * an `input` listener re-validates on every change.
 */
export function useRangeValidation({
  inputId,
  isControlled,
  value,
  parsedMin,
  parsedMax,
}: {
  inputId: string
  isControlled: boolean
  value: string | number | readonly string[] | undefined
  parsedMin: number
  parsedMax: number
}): void {
  useEffect(() => {
    const input = getInputElement(inputId)
    if (!input) return

    const validate = (raw: string) => {
      input.setCustomValidity(validateRange(raw, parsedMin, parsedMax))
    }

    if (isControlled) {
      validate(String(value ?? ''))
      return
    }

    const handleInput = () => validate(input.value)
    validate(input.value)
    input.addEventListener('input', handleInput)
    return () => input.removeEventListener('input', handleInput)
  }, [inputId, isControlled, parsedMax, parsedMin, value])
}
