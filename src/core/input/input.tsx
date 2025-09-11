import { InputCheckbox } from './checkbox'
import { forwardRef } from 'react'

import type { InputHTMLAttributes } from 'react'

export namespace Input {
  export interface Props extends InputHTMLAttributes<HTMLInputElement> {
    /** Used to name the form control when there is no other visual or accessible name. */
    'aria-label'?: string
    /** Indicates whether the checkbox or radio is checked. */
    checked?: boolean
    /** Whether the form control is disabled. */
    disabled?: boolean
    /** Name of the form control. Submitted with the form as part of a name/value pair. */
    name?: string
    /**
     * Whether the input's value is editable. Does not apply to `hidden`, `range`, `color`,
     * `checkbox`, or `radio` inputs.
     */
    readOnly?: boolean
    /**
     * Whether a value is required or must be checked for the form to be submittable.
     */
    required?: boolean
    /** Type of form control. */
    type: 'checkbox'
    /** The value of the form control. */
    value?: InputHTMLAttributes<HTMLInputElement>['value']
  }
}

/** @deprecated use Input.Props instead */
export type InputProps = Input.Props

/**
 * A thin, low-level wrapper around the native HTML `<input>` element. Like its native counterpart,
 * labels and custom validation messages are BYO.
 */
export const Input = forwardRef<HTMLInputElement, Input.Props>((props, ref) => {
  return <InputCheckbox {...props} ref={ref} />
})
