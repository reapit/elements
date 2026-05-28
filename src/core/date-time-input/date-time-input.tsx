import { DateTimeInputPickerButton } from './picker-button'
import { forwardRef, useId } from 'react'
import { TextInput } from '#src/core/text-input'

import type { InputHTMLAttributes } from 'react'

// NOTE: we omit...
// - size, because we want to use size for our own purposes
type AttributesToOmit = 'size'

export namespace DateTimeInput {
  export interface Props extends Omit<InputHTMLAttributes<HTMLInputElement>, AttributesToOmit> {
    /**
     * Whether the input's value is being asynchronously validated, and the validation takes long enough
     * to warrant visual feedback, the input can be marked as busy.
     */
    isBusy?: boolean
    /** The maximum width of the input. */
    maxWidth?: string
    /**
     * Whether the control's validity should be visually communicated or not. Typically, validity will only be shown
     * when the control has been touched (i.e. the user has interacted with it).
     */
    showValidity?: boolean
    /** Size of input. */
    size?: 'small' | 'medium' | 'large'
    /**
     * The step attribute is a number that specifies the granularity that the value must adhere to.
     *
     * For date inputs, the value is given in days, with a default of 1 day. For datetime and time
     * inputs, the value is given in seconds, with a default of 60 seconds (1 minute). When seconds
     * are required, the step value should be 1.
     */
    step?: number
    /** Type of input. */
    type?: 'date' | 'datetime-local' | 'time'
  }
}

/**
 * A native input element geared for dates and times. Supports `date`, `datetime-local`, and `time` input
 * types. Built on top of `TextInput`.
 */
export const DateTimeInput = forwardRef<HTMLInputElement, DateTimeInput.Props>(
  ({ disabled, id, readOnly, type = 'date', ...rest }, ref) => {
    const inputId = id ?? useId()

    // Firefox has no -moz alterative to -webkit-*-picker-indicator. If we detect the
    // webkit selectors are not supported, we need to fallback to using the native picker
    // buttons rather than our custom one.
    const canHideNativePickerButton =
      CSS.supports('selector(input::-webkit-calendar-picker-indicator)') &&
      CSS.supports('selector(::-webkit-time-picker-indicator)')

    return (
      <TextInput
        {...rest}
        disabled={disabled}
        id={inputId}
        readOnly={readOnly}
        ref={ref}
        trailingIcon={
          canHideNativePickerButton &&
          !readOnly && <DateTimeInputPickerButton aria-controls={inputId} disabled={disabled} variant={type} />
        }
        type={type}
      />
    )
  },
)

DateTimeInput.displayName = 'DateTimeInput'
