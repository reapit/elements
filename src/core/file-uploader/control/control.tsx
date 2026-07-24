import { FileUploaderInput } from '../input/input'
import { FormControl } from '#src/core/form-control'
import { useId } from 'react'

import type { ReactNode } from 'react'

export namespace FileUploaderControl {
  // Omits the native `size` attribute (a number — the input's display width in characters)
  export interface Props extends Omit<FileUploaderInput.Props, 'size'> {
    /** The visual label for the uploader. If no visual label is provided, an accessible label should be provided via `aria-label`. */
    label?: ReactNode
    /** Optional help text that provides more context about the uploader. */
    helpText?: ReactNode
    /** Error text that communicates why the uploader's value is invalid. */
    errorText?: ReactNode
  }
}

/**
 * Renders `FormControl`'s label/help text/error text around `FileUploader.Input`. Error text takes
 * help text's place when both are supplied.
 */
export function FileUploaderControl({
  errorText,
  helpText,
  id,
  label,
  required,
  showValidity,
  variant = 'button',
  ...rest
}: FileUploaderControl.Props) {
  const fallbackId = useId()
  const inputId = id ?? fallbackId
  const labelId = useId()
  const helpTextId = useId()
  const errorTextId = useId()

  return (
    <FormControl as="div" size={variant === 'large' ? 'large' : 'medium'}>
      {label && (
        <FormControl.Label htmlFor={inputId} id={labelId} isRequired={required}>
          {label}
        </FormControl.Label>
      )}
      <FileUploaderInput
        {...rest}
        aria-describedby={helpText && !errorText ? helpTextId : undefined}
        aria-errormessage={errorText ? errorTextId : undefined}
        aria-invalid={!!errorText}
        id={inputId}
        required={required}
        showValidity={showValidity ?? !!errorText}
        variant={variant}
      />
      {errorText ? (
        <FormControl.ErrorText id={errorTextId}>{errorText}</FormControl.ErrorText>
      ) : (
        helpText && <FormControl.HelpText id={helpTextId}>{helpText}</FormControl.HelpText>
      )}
    </FormControl>
  )
}

FileUploaderControl.displayName = 'FileUploader.Control'
