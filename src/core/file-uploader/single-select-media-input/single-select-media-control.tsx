import { FileUploaderSingleSelectMediaInput } from './single-select-media-input'
import { FormControl } from '#src/core/form-control'
import { useId } from 'react'

import type { ReactNode } from 'react'

export namespace FileUploaderSingleSelectMediaControl {
  export interface Props extends Omit<FileUploaderSingleSelectMediaInput.Props, 'size'> {
    /** Error text that communicates why the uploader's value is invalid. */
    errorText?: ReactNode
    /** Optional help text that provides more context about the uploader. */
    helpText?: ReactNode
    /** The visual label for the uploader. If no visual label is provided, an accessible label should be provided via `aria-label`. */
    label?: ReactNode
    /** The size of `FormControl`'s label/help/error text. */
    size?: 'small' | 'medium' | 'large'
  }
}

/**
 * Renders `FormControl` chrome (label/help text/error text) around `FileUploaderSingleSelectMediaInput`.
 */
export function FileUploaderSingleSelectMediaControl({
  errorText,
  helpText,
  id,
  label,
  required,
  showValidity,
  size = 'medium',
  ...rest
}: FileUploaderSingleSelectMediaControl.Props) {
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
      <FileUploaderSingleSelectMediaInput
        {...rest}
        aria-describedby={helpText && !errorText ? helpTextId : undefined}
        aria-errormessage={errorText ? errorTextId : undefined}
        aria-invalid={!!errorText}
        id={inputId}
        required={required}
        showValidity={showValidity ?? !!errorText}
      />
      {errorText ? (
        <FormControl.ErrorText id={errorTextId}>{errorText}</FormControl.ErrorText>
      ) : (
        helpText && <FormControl.HelpText id={helpTextId}>{helpText}</FormControl.HelpText>
      )}
    </FormControl>
  )
}

FileUploaderSingleSelectMediaControl.displayName = 'FileUploader.SingleSelectMediaControl'
