import { CheckboxGroupControlOption } from './checkbox-group-control-option'
import { CheckboxGroupControlContext, useCheckboxGroupControlContext } from './context'
import { ElCheckboxGroup } from './styles'
import { FormControl } from '#src/core/form-control'
import { useId } from 'react'

import type { FieldsetHTMLAttributes, ReactNode } from 'react'

export namespace CheckboxGroupControl {
  export interface Props extends FieldsetHTMLAttributes<HTMLFieldSetElement> {
    /**
     * An accessible label for the checkbox group. Should be considered mandatory when there is
     * no visual label.
     */
    'aria-label'?: string
    /** The options in the checkbox group. */
    children: ReactNode
    /**
     * Whether all checkboxes in the group are disabled by default. Individual options can override
     * this value.
     */
    disabled?: boolean
    /** Optional error text that communicates why the checkbox group's value is invalid. */
    errorText?: ReactNode
    /**
     * The ID of the form the checkbox group's options should be associated with. An explicit value is
     * only necessary if the checkbox group is not a descendant of a form element; if it is, it will be
     * automatically associated with that ancestral form.
     */
    form?: string
    /** Optional help text that provides more context about the checkbox group and its options. */
    helpText?: ReactNode
    /**
     * The visual label for the checkbox group. If no visual label is provided, an accessible
     * label should be via `aria-label`.
     */
    label?: ReactNode
    /** The name each option in the checkbox group should use. */
    name?: string
    /** Whether the checkboxes are laid out horizontally or vertically. */
    orientation?: 'vertical' | 'horizontal'
    /**
     * Whether all checkboxes in the group are required by default. Individual options can override
     * this value.
     */
    required?: boolean
    /**
     * Whether to show validity state on all checkboxes in the group by default. Individual options
     * can override this value.
     */
    showValidity?: boolean
  }
}

/**
 * A group of checkboxes. Should only be used to group related options.
 */
export function CheckboxGroupControl({
  children,
  disabled,
  errorText,
  form,
  helpText,
  label,
  name,
  orientation = 'vertical',
  required,
  showValidity,
  ...rest
}: CheckboxGroupControl.Props) {
  const helpTextId = useId()
  const errorTextId = useId()

  return (
    // NOTE: we do not use the fieldset's native disabled, form or name attributes, because we want
    // individual checkboxes to be able to override them.
    <FormControl
      {...rest}
      aria-describedby={helpText && !errorText ? helpTextId : undefined}
      aria-errormessage={errorText ? errorTextId : undefined}
      aria-invalid={errorText ? true : undefined}
      as="fieldset"
      size="medium"
    >
      {label && (
        <FormControl.Label as="legend" isRequired={required}>
          {label}
        </FormControl.Label>
      )}
      <ElCheckboxGroup data-orientation={orientation}>
        <CheckboxGroupControlContext.Provider value={{ disabled, form, name, required, showValidity }}>
          {children}
        </CheckboxGroupControlContext.Provider>
      </ElCheckboxGroup>
      {errorText ? (
        <FormControl.ErrorText id={errorTextId}>{errorText}</FormControl.ErrorText>
      ) : (
        helpText && <FormControl.HelpText id={helpTextId}>{helpText}</FormControl.HelpText>
      )}
    </FormControl>
  )
}

CheckboxGroupControl.Option = CheckboxGroupControlOption
CheckboxGroupControl.Context = CheckboxGroupControlContext
CheckboxGroupControl.useContext = useCheckboxGroupControlContext
