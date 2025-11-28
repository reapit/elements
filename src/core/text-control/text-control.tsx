import { FormControl } from '#src/core/form-control'
import { TextInput } from '#src/core/text-input'
import { useId } from 'react'

import type { ReactNode } from 'react'

export namespace TextControl {
  export interface Props extends TextInput.Props {
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
    type?: 'email' | 'password' | 'search' | 'tel' | 'text' | 'url'
  }
}

/**
 * A pre-baked `TextInput` + `FormControl`. Used when you need a label, help text, and/or error message
 * for a plain text input.
 */
export function TextControl({
  errorText,
  helpText,
  id,
  label,
  maxWidth,
  required,
  size = 'medium',
  ...rest
}: TextControl.Props) {
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
      <TextInput
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
