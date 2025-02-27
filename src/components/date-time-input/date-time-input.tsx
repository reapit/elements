import React, { forwardRef, LegacyRef } from 'react'
import {
  ElInputErrorText,
  ElInputField,
  ElInputSizesEnum,
  ElDateTimeInput,
} from './styles'
import { LabelText } from '../label-text'

export interface DateTimeInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  isError?: boolean
  size?: ElInputSizesEnum
  label?: string
  isRequired?: boolean
  errorMessage?: string
  helperText?: string
  type?: 'time' | 'date' | 'datetime-local' | 'week' | 'month'
}

export const DateTimeInput: React.ForwardRefExoticComponent<DateTimeInputProps> = forwardRef(
  (
    { isError, isRequired, label, prefix, size, errorMessage, helperText, type = 'date', ...rest },
    ref: React.ForwardedRef<React.InputHTMLAttributes<HTMLInputElement>>,
  ) => {
    const textSize: ElInputSizesEnum = size == 'large' ? 'medium' : 'small'
    const placeholder: string | undefined = isRequired && !label ? `${rest.placeholder} *` : rest.placeholder
    return (
      <ElDateTimeInput>
        {label && (
          <LabelText size={textSize} isRequired={isRequired}>
            {label}
          </LabelText>
        )}
        <ElInputField
          {...rest}
          type={type}
          data-is-error={isError}
          data-size={size}
          required={isRequired}
          placeholder={placeholder}
          aria-label={`Input type ${type}`}
          ref={ref as unknown as LegacyRef<HTMLInputElement>}
        />
        {isError && errorMessage && <ElInputErrorText data-size={textSize}>{errorMessage}</ElInputErrorText>}
        {!isError && helperText && <LabelText size={textSize}>{helperText}</LabelText>}
      </ElDateTimeInput>
    )
  },
)
