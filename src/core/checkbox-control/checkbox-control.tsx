import { Checkbox } from '#src/core/checkbox'
import { FormControl } from '#src/core/form-control'
import { LabelText } from '#src/core/label-text'
import { forwardRef, useId } from 'react'

import type { ReactNode } from 'react'

export namespace CheckboxControl {
  export interface Props extends Checkbox.Props {
    /** Optional error text that communicates why the checkbox's value is invalid. */
    errorText?: ReactNode
  }
}

/**
 * A pre-baked `Checkbox` + `FormControl`. Used when you need to display validation errors
 * for a solitary checkbox.
 */
export const CheckboxControl = forwardRef<HTMLInputElement, CheckboxControl.Props>(function CheckboxControl(
  { errorText, label, required, showValidity, ...rest },
  ref,
) {
  const errorTextId = useId()

  return (
    <FormControl as="div" size="medium">
      <Checkbox
        {...rest}
        aria-errormessage={errorText ? errorTextId : undefined}
        aria-invalid={errorText ? true : undefined}
        label={<LabelText isRequired={required}>{label}</LabelText>}
        ref={ref}
        showValidity={showValidity ?? !!errorText}
      />
      {errorText && <FormControl.ErrorText id={errorTextId}>{errorText}</FormControl.ErrorText>}
    </FormControl>
  )
})
