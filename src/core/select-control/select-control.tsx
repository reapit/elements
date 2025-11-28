import { FormControl } from '#src/core/form-control'
import { Select } from '#src/core/select'
import { useId } from 'react'

import type { ReactNode } from 'react'

export namespace SelectControl {
  export interface Props extends Select.Props {
    /** Optional error text that communicates why the select's value is invalid. */
    errorText?: ReactNode
    /** Optional help text that provides more context about the select. */
    helpText?: ReactNode
    /**
     * The visual label for the select. If no visual label is provided, an accessible
     * label should be provided via `aria-label`.
     */
    label?: ReactNode
    /** The maximum width of the form control. */
    maxWidth?: string
  }
}

/**
 * A pre-baked `Select` + `FormControl`. Used when you need a label, help text, and/or error message
 * for a select.
 */
export function SelectControl({
  children,
  disabled,
  errorText,
  helpText,
  id,
  label,
  maxWidth,
  multiple,
  required,
  size = 'medium',
  ...rest
}: SelectControl.Props) {
  const fallbackSelectId = useId()
  const selectId = id ?? fallbackSelectId
  const helpTextId = useId()
  const errorTextId = useId()

  return (
    <FormControl as="div" size={size} maxWidth={maxWidth}>
      {label && (
        <FormControl.Label htmlFor={selectId} isRequired={required}>
          {label}
        </FormControl.Label>
      )}
      <Select
        {...rest}
        aria-describedby={helpText && !errorText ? helpTextId : undefined}
        aria-errormessage={errorText ? errorTextId : undefined}
        aria-invalid={errorText ? true : undefined}
        id={selectId}
        multiple={multiple}
        required={required}
        size={size}
      >
        {children}
      </Select>
      {errorText ? (
        <FormControl.ErrorText id={errorTextId}>{errorText}</FormControl.ErrorText>
      ) : (
        helpText && <FormControl.HelpText id={helpTextId}>{helpText}</FormControl.HelpText>
      )}
      {multiple && <Select.SelectionChips disabled={disabled} listboxId={Select.getListboxId(selectId)} />}
    </FormControl>
  )
}
