import { ChipSelect } from '#src/core/chip-select'
import { FormControl } from '#src/core/form-control'
import { LabelText } from '#src/core/label-text'
import { useId } from 'react'

import type { ReactNode } from 'react'

export namespace ChipSelectControl {
  export interface Props extends ChipSelect.Props {
    /** Optional error text that communicates why the chip select's value is invalid. */
    errorText?: ReactNode
    /** Optional help text that provides additional context about the chip select. */
    helpText?: ReactNode
    /** The label for the chip select. */
    label?: ReactNode
    /**
     * Whether all options in the chip select group are required by default. Individual options can override
     * this value.
     */
    required?: boolean
    /** The size of the chip select. */
    size?: 'small' | 'medium' | 'large'
  }
}

/**
 * A pre-baked `ChipSelect` + `FormControl`. Used when you need to display a label, help text,
 * and/or validation errors for a chip select.
 */
export function ChipSelectControl({
  children,
  errorText,
  helpText,
  label,
  required,
  size = 'medium',
  ...rest
}: ChipSelectControl.Props) {
  const descriptionId = useId()

  return (
    <FormControl aria-describedby={descriptionId} as="fieldset" size={size}>
      <FormControl.Label as="legend">
        <LabelText isRequired={required}>{label}</LabelText>
      </FormControl.Label>
      <ChipSelect {...rest} required={required} size={size}>
        {children}
      </ChipSelect>
      {errorText ? (
        <FormControl.ErrorText id={descriptionId}>{errorText}</FormControl.ErrorText>
      ) : (
        helpText && <FormControl.HelpText id={descriptionId}>{helpText}</FormControl.HelpText>
      )}
    </FormControl>
  )
}

ChipSelectControl.Option = ChipSelect.Option
ChipSelectControl.determineNextControlledState = ChipSelect.determineNextControlledState

ChipSelectControl.Context = ChipSelect.Context
ChipSelectControl.useContext = ChipSelect.useContext
