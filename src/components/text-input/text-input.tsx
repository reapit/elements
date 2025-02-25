import React, { forwardRef, LegacyRef } from 'react'
import {
  ElInputErrorText,
  ElInputField,
  ElInputFieldWrapper,
  ElInputSizesEnum,
  ElInputVariantEnum,
  ElTextInput,
  getIconSize,
} from './styles'
import { LabelText } from '../label-text'
import { Icon, IconNames } from '../icon'

export interface TextInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  isError?: boolean
  variant?: ElInputVariantEnum
  size?: ElInputSizesEnum
  prefix?: IconNames
  suffix?: IconNames
  label?: string
  isRequired?: boolean
  errorMessage?: string
  helperText?: string
}

/**
 * A customizable `<input>` component for use in forms.
 *
 * Supports different visual variants, sizes, and optional prefix/suffix icons.
 * It also provides error handling, helper texts, and accessibility enhancements.
 *
 * ## Features:
 * - Supports standard, prefix, and suffix variants.
 * - Configurable sizes (`small`, `medium`, `large`).
 * - Displays error messages and helper texts.
 * - Built-in accessibility attributes.
 *
 * ## Accessibility:
 * - Adds `aria-label` with contextual information for input types.
 * - Supports required fields with `isRequired` prop.
 *
 * ## Example Usage:
 * ```tsx
 * <TextInput
 *   label="Username"
 *   placeholder="Enter your username"
 *   prefix="user"
 *   isRequired
 *   size="large"
 *   isError={false}
 *   helperText="Must be at least 6 characters."
 * />
 * ```
 */
export const TextInput: React.ForwardRefExoticComponent<TextInputProps> = forwardRef(
  (
    { isError, suffix, isRequired, label, prefix, size, errorMessage, helperText, variant, ...rest },
    ref: React.ForwardedRef<React.InputHTMLAttributes<HTMLInputElement>>,
  ) => {
    const textSize: ElInputSizesEnum = size == 'large' ? 'medium' : 'small'
    const placeholder: string | undefined = isRequired && !label ? `${rest.placeholder} *` : rest.placeholder
    return (
      <ElTextInput>
        {label && (
          <LabelText size={textSize} isRequired={isRequired}>
            {label}
          </LabelText>
        )}
        <ElInputFieldWrapper data-is-error={isError}>
          {prefix && <Icon fontSize="1rem" intent={'default'} icon={prefix} {...getIconSize(size)} />}
          <ElInputField
            {...rest}
            data-variant={variant}
            data-size={size}
            required={isRequired}
            placeholder={placeholder}
            aria-label={`Input type ${rest.type}`}
            ref={ref as unknown as LegacyRef<HTMLInputElement>}
          />
          {suffix && <Icon fontSize="1rem" intent={'default'} icon={suffix} {...getIconSize(size)} />}
        </ElInputFieldWrapper>
        {isError && errorMessage && <ElInputErrorText data-size={textSize}>{errorMessage}</ElInputErrorText>}
        {!isError && helperText && <LabelText size={textSize}>{helperText}</LabelText>}
      </ElTextInput>
    )
  },
)
