import { FileUploaderDropzoneInput } from './dropzone-input'
import { FormControl } from '#src/core/form-control'
import { useId } from 'react'

import type { ReactNode } from 'react'

export namespace FileUploaderDropzoneControl {
  export interface Props extends Omit<FileUploaderDropzoneInput.Props, 'size'> {
    /** Error text that communicates why the uploader's value is invalid. */
    errorText?: ReactNode
    /** Optional help text that provides more context about the uploader. */
    helpText?: ReactNode
    /** The visual label for the uploader. If no visual label is provided, an accessible label should be provided via `aria-label`. */
    label?: ReactNode
    /**
     * The size of `FormControl`'s label/help/error text. Independent of `variant` — `variant`
     * is a layout decision about how much space the dropzone itself occupies on a form, unrelated
     * to the text size of a form control it's paired alongside, which may use any size.
     */
    size?: 'small' | 'medium' | 'large'
  }
}

/**
 * Renders `FormControl` chrome (label/help text/error text) around `FileUploaderDropzoneInput`.
 */
export function FileUploaderDropzoneControl({
  errorText,
  helpText,
  id,
  label,
  required,
  showValidity,
  size = 'medium',
  ...rest
}: FileUploaderDropzoneControl.Props) {
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
      <FileUploaderDropzoneInput
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

FileUploaderDropzoneControl.displayName = 'FileUploader.DropzoneControl'
