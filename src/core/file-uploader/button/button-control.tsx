import { FileUploaderButtonInput } from './button'
import { FormControl } from '#src/core/form-control'
import { useId } from 'react'

import type { ReactNode } from 'react'

export namespace FileUploaderButtonControl {
  export interface Props extends FileUploaderButtonInput.Props {
    /** Error text that communicates why the uploader's value is invalid. */
    errorText?: ReactNode
    /** Optional help text that provides more context about the uploader. */
    helpText?: ReactNode
    /** The visual label for the uploader. If no visual label is provided, an accessible label should be provided via `aria-label`. */
    label?: ReactNode
  }
}

/**
 * Renders `FormControl` chrome (label/help text/error text) around `FileUploader.ButtonInput`.
 * Intended for use alongside `FileUploader.FileList`.
 */
export function FileUploaderButtonControl({
  errorText,
  helpText,
  id,
  label,
  required,
  showValidity,
  size = 'medium',
  ...rest
}: FileUploaderButtonControl.Props) {
  const fallbackId = useId()
  const inputId = id ?? fallbackId
  const helpTextId = useId()
  const errorTextId = useId()

  return (
    <FormControl as="div" size={size}>
      {label && (
        <FormControl.Label htmlFor={inputId} isRequired={required}>
          {label}
        </FormControl.Label>
      )}
      <FileUploaderButtonInput
        {...rest}
        aria-describedby={helpText && !errorText ? helpTextId : undefined}
        aria-errormessage={errorText ? errorTextId : undefined}
        aria-invalid={!!errorText}
        id={inputId}
        required={required}
        showValidity={showValidity ?? !!errorText}
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

FileUploaderButtonControl.displayName = 'FileUploader.ButtonControl'
