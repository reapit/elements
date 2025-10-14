import { RadioGroupControlOption } from './radio-group-control-option'
import { RadioGroupControlContext, useRadioGroupContext } from './context'
import { ElRadioGroup } from './styles'
import { FormControl } from '#src/core/form-control'
import { useId } from 'react'

import type { FieldsetHTMLAttributes, ReactNode } from 'react'

export namespace RadioGroupControl {
  export interface Props extends FieldsetHTMLAttributes<HTMLFieldSetElement> {
    /**
     * An accessible label for the radio button group. Should be considered mandatory when there is
     * no visual label.
     */
    'aria-label'?: string
    /** The options in the radio button group. */
    children: ReactNode
    /**
     * Whether all radio buttons in the group are disabled by default. Individual options can override
     * this value.
     */
    disabled?: boolean
    /** Optional error text that communicates why the radio button group's value is invalid. */
    errorText?: ReactNode
    /**
     * The ID of the form the radio button group's options should be associated with. An explicit value is
     * only necessary if the radio button group is not a descendant of a form element; if it is, it will be
     * automatically associated with that ancestral form.
     */
    form?: string
    /** Optional help text that provides more context about the radio button group and its options. */
    helpText?: ReactNode
    /**
     * The visual label for the radio button group. If no visual label is provided, an accessible
     * label should be via `aria-label`.
     */
    label?: ReactNode
    /** The name each option in the radio button group should use. */
    name?: string
    /** Whether the radio buttons are laid out horizontally or vertically. */
    orientation?: 'vertical' | 'horizontal'
    /**
     * Whether all radio buttons in the group are required by default. Individual options can override
     * this value.
     */
    required?: boolean
    /**
     * Whether to show validity state on all radio buttons in the group by default. Individual options
     * can override this value.
     */
    showValidity?: boolean
  }
}

/**
 * A group of radio buttons. Should only be used to group related options where a single selection is required.
 */
export function RadioGroupControl({
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
}: RadioGroupControl.Props) {
  const descriptionId = useId()

  return (
    // NOTE: we do not use the fieldset's native disabled, form or name attributes, because we want
    // individual radio buttons to be able to override them.
    <FormControl {...rest} aria-describedby={descriptionId} as="fieldset" size="medium">
      {label && (
        <FormControl.Label as="legend" isRequired={required}>
          {label}
        </FormControl.Label>
      )}
      <ElRadioGroup data-orientation={orientation}>
        <RadioGroupControlContext.Provider value={{ disabled, form, name, required, showValidity }}>
          {children}
        </RadioGroupControlContext.Provider>
      </ElRadioGroup>
      {errorText ? (
        <FormControl.ErrorText id={descriptionId}>{errorText}</FormControl.ErrorText>
      ) : (
        helpText && <FormControl.HelpText id={descriptionId}>{helpText}</FormControl.HelpText>
      )}
    </FormControl>
  )
}

RadioGroupControl.Option = RadioGroupControlOption
RadioGroupControl.Context = RadioGroupControlContext
RadioGroupControl.useContext = useRadioGroupContext
