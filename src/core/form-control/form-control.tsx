import { cx } from '@linaria/core'
import { elFormControl } from './styles'
import { FormControlErrorText } from './error-text'
import { FormControlHelpText } from './help-text'
import { FormControlLabel } from './label'

import type { FieldsetHTMLAttributes, HTMLAttributes } from 'react'

export namespace FormControl {
  interface CommonProps {
    /** The size of the form control. Should match the size of the control being labelled. */
    size?: 'small' | 'medium' | 'large'
  }
  export interface AsDivProps extends CommonProps, HTMLAttributes<HTMLDivElement> {
    as?: 'div'
  }
  export interface AsFieldsetProps extends CommonProps, FieldsetHTMLAttributes<HTMLFieldSetElement> {
    as: 'fieldset'
  }
  export type Props = AsDivProps | AsFieldsetProps
}

/**
 * Handles the layout of a form control's label, helper text and error message. Can be used with any form
 * control, such as standard inputs, checkbox or radio groups, chip selects, and more.
 */
export function FormControl({ as: Element = 'div', children, className, size, ...rest }: FormControl.Props) {
  return (
    <Element {...(rest as any)} className={cx(elFormControl, className)} data-size={size}>
      {children}
    </Element>
  )
}

FormControl.Label = FormControlLabel
FormControl.HelpText = FormControlHelpText
FormControl.ErrorText = FormControlErrorText
