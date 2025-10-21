import { FormControl } from '#src/core/form-control'
import { Textarea } from '#src/core/textarea'
import { TextareaWithContentSizing } from '#src/core/textarea/content-sizing/content-sizing'
import { TextareaWithFixedSizing } from '#src/core/textarea/fixed-sizing/fixed-sizing'
import { TextareaWithManualSizing } from '#src/core/textarea/manual-sizing/manual-sizing'
import { useId } from 'react'

import type { ReactNode } from 'react'

export namespace TextareaControl {
  interface CommonProps {
    /** Optional error text that communicates why the textarea's value is invalid. */
    errorText?: ReactNode
    /** Optional help text that provides more context about the textarea. */
    helpText?: ReactNode
    /** The maximum width of the form control. */
    maxWidth?: string
    /**
     * The visual label for the textarea. If no visual label is provided, an accessible
     * label should be provided via `aria-label`.
     */
    label?: ReactNode
  }

  export interface WithContentSizingProps extends CommonProps, TextareaWithContentSizing.Props {}
  export interface WithFixedSizingProps extends CommonProps, TextareaWithFixedSizing.Props {}
  export interface WithManualSizingProps extends CommonProps, TextareaWithManualSizing.Props {}

  export type Props = WithContentSizingProps | WithFixedSizingProps | WithManualSizingProps
}

/**
 * A pre-baked `Textarea` + `FormControl`. Used when you need a label, help text, and/or error message
 * for a textarea.
 */
export function TextareaControl({
  errorText,
  helpText,
  id,
  label,
  maxWidth,
  required,
  size = 'medium',
  ...rest
}: TextareaControl.Props) {
  const fallbackInputId = useId()
  const inputId = id ?? fallbackInputId
  const descriptionId = useId()

  return (
    <FormControl as="div" size={size} maxWidth={maxWidth}>
      {label && (
        <FormControl.Label htmlFor={inputId} isRequired={required}>
          {label}
        </FormControl.Label>
      )}
      <Textarea {...rest} aria-describedby={descriptionId} id={inputId} required={required} size={size} />
      {errorText ? (
        <FormControl.ErrorText id={descriptionId}>{errorText}</FormControl.ErrorText>
      ) : (
        helpText && <FormControl.HelpText id={descriptionId}>{helpText}</FormControl.HelpText>
      )}
    </FormControl>
  )
}
