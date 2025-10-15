import { DateTimeInput } from '#src/core/date-time-input'
import { FormControl } from '#src/core/form-control'
import { useId } from 'react'

import type { ReactNode } from 'react'

export namespace DateTimeControl {
  export interface Props extends DateTimeInput.Props {
    /** Optional error text that communicates why the text input's value is invalid. */
    errorText?: ReactNode
    /** Optional help text that provides more context about the text input. */
    helpText?: ReactNode
    /** The maximum width of the form control. */
    maxWidth?: string
    /**
     * The visual label for the text input. If no visual label is provided, an accessible
     * label should be provided via `aria-label`.
     */
    label?: ReactNode
    /** Type of input. */
    type?: 'date' | 'datetime-local' | 'time'
  }
}

/**
 * A pre-baked `DateTimeInput` + `FormControl`. Used when you need a label, help text, and/or error
 * message for a date/time input.
 */
export function DateTimeControl({
  errorText,
  helpText,
  id,
  label,
  maxWidth,
  required,
  size = 'medium',
  ...rest
}: DateTimeControl.Props) {
  const fallbackInputId = useId()
  const inputId = id ?? fallbackInputId
  const descriptionId = useId()

  return (
    <FormControl as="div" size={size} maxWidth={maxWidth}>
      {label && (
        <FormControl.Label htmlFor={inputId} isRequired={required} size={size}>
          {label}
        </FormControl.Label>
      )}
      <DateTimeInput {...rest} aria-describedby={descriptionId} id={inputId} required={required} size={size} />
      {errorText ? (
        <FormControl.ErrorText id={descriptionId}>{errorText}</FormControl.ErrorText>
      ) : (
        helpText && <FormControl.HelpText id={descriptionId}>{helpText}</FormControl.HelpText>
      )}
    </FormControl>
  )
}
