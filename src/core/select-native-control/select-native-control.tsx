import { FormControl } from '#src/core/form-control'
import { SelectNative } from '#src/core/select-native'
import { useId } from 'react'

import type { ReactNode } from 'react'

export namespace SelectNativeControl {
  export interface Props extends SelectNative.Props {
    /** Optional error text that communicates why the select's value is invalid. */
    errorText?: ReactNode
    /** Optional help text that provides more context about the select. */
    helpText?: ReactNode
    /**
     * The visual label for the select. If no visual label is provided, an accessible
     * label should be provided via `aria-label`.
     */
    label?: ReactNode
  }
}

/**
 * A pre-baked `SelectNative` + `FormControl`. Used when you need a label, help text, and/or error message
 * for a native select.
 */
export function SelectNativeControl({
  errorText,
  helpText,
  id,
  label,
  maxWidth,
  required,
  size,
  ...rest
}: SelectNativeControl.Props) {
  const fallbackInputId = useId()
  const inputId = id ?? fallbackInputId
  const helpTextId = useId()
  const errorTextId = useId()

  return (
    <FormControl as="div" size={size} maxWidth={maxWidth}>
      {label && (
        <FormControl.Label htmlFor={inputId} isRequired={required}>
          {label}
        </FormControl.Label>
      )}
      <SelectNative
        {...rest}
        aria-describedby={helpText && !errorText ? helpTextId : undefined}
        aria-errormessage={errorText ? errorTextId : undefined}
        aria-invalid={errorText ? true : undefined}
        id={inputId}
        required={required}
        size={size}
      />
      {errorText ? (
        <FormControl.ErrorText id={errorTextId}>{errorText}</FormControl.ErrorText>
      ) : (
        helpText && <FormControl.HelpText id={helpTextId}>{helpText}</FormControl.HelpText>
      )}
    </FormControl>
  )
}
