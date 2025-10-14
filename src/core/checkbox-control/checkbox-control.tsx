import { Checkbox } from '#src/core/checkbox'
import { FormControl } from '#src/core/form-control'
import { LabelText } from '#src/core/label-text'
import { useId } from 'react'

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
export function CheckboxControl({ errorText, label, required, ...rest }: CheckboxControl.Props) {
  const descriptionId = useId()

  return (
    <FormControl as="div" size="medium">
      {/* NOTE: we only want to override the checkbox's description element when error text is present */}
      <Checkbox
        {...rest}
        aria-describedby={errorText ? descriptionId : undefined}
        label={<LabelText isRequired={required}>{label}</LabelText>}
      />
      {errorText && <FormControl.ErrorText id={descriptionId}>{errorText}</FormControl.ErrorText>}
    </FormControl>
  )
}
