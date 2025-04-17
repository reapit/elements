import React, { forwardRef, LegacyRef, ReactNode } from 'react'
import { ElInputField, ElInputSizesEnum, ElInputVariantEnum, ElTextInput } from './styles'

export interface TextInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'prefix' | 'suffix'> {
  isError?: boolean
  variant?: ElInputVariantEnum
  size?: ElInputSizesEnum
  isRequired?: boolean
  isBusy?: boolean
  loadingIcon?: ReactNode
  prefix?: ReactNode
  suffix?: ReactNode
  type:
    | 'text'
    | 'password'
    | 'email'
    | 'number'
    | 'tel'
    | 'url'
    | 'hidden'
    | 'time'
    | 'date'
    | 'datetime-local'
    | 'week'
    | 'month'
}

/**
 * `TextInput` is a customizable input component built on top of the native HTML `<input>`.
 *
 * ### Features
 * - Supports multiple input types: `'text'`, `'email'`, `'date'`, etc.
 * - Visual variants (`variant`):
 *   - `'default'`: Plain input
 *   - `'with-prefix'`: Input with content before the field
 *   - `'with-suffix'`: Input with content after the field
 * - Sizes (`size`):
 *   - `'small'`: Compact input field
 *   - `'medium'`: Default size
 *   - `'large'`: Spacious input for emphasis
 * - Optional `prefix` and `suffix` props for icons or elements
 * - Error state styling with `isError`
 * - Loading indicator support with `isBusy` and `loadingIcon`
 * - Accessibility enhancements:
 *   - Adds `aria-label` for screen readers
 *   - `aria-required` when `isRequired` is true
 *
 * ### Example
 * ```tsx
 * <TextInput
 *   type="text"
 *   placeholder="Enter your email"
 *   prefix={<MailIcon />}
 *   size="small"
 *   isRequired
 *   variant="with-prefix"
 * />
 * ```
 */
export const TextInput: React.ForwardRefExoticComponent<TextInputProps> = forwardRef(
  (
    { isError, isRequired, size = 'medium', loadingIcon, variant = 'default', prefix, suffix, isBusy, ...rest },
    ref: React.ForwardedRef<React.InputHTMLAttributes<HTMLInputElement>>,
  ) => {
    return (
      <ElTextInput data-is-error={isError}>
        {prefix && prefix}
        <ElInputField
          {...rest}
          data-variant={variant}
          data-size={size}
          data-required={isRequired}
          placeholder={rest.placeholder}
          aria-label={`Input type ${rest.type}`}
          ref={ref as unknown as LegacyRef<HTMLInputElement>}
        />
        {suffix && suffix}
        {isBusy && loadingIcon && loadingIcon}
      </ElTextInput>
    )
  },
)
