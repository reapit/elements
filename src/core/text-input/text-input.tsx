import {
  ElTextInput,
  ElTextInputAffixContainer,
  ElTextInputContainer,
  ElTextInputIconContainer,
  elTextInputSpinner,
} from './styles'
import { forwardRef } from 'react'
import Spinner from './spinner.svg?react'

import type { InputHTMLAttributes, ReactNode } from 'react'

// NOTE: we omit...
// - prefix, because we want to use it for our own purposes.
// - size, because checkbox inputs don't support sizing.
type AttributesToOmit = 'prefix' | 'size'

export namespace TextInput {
  export interface Props extends Omit<InputHTMLAttributes<HTMLInputElement>, AttributesToOmit> {
    /**
     * Specifies what, if any, permission the user agent has to provide automated assistance in filling
     * out form field values, as well as guidance to the browser as to the type of information expected
     * in the field. See [autocomplete](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/autocomplete)
     * docs on MDN.
     *
     * Default's to `off` to avoid PII being used in forms.
     */
    autoComplete?: 'off' | 'on' | (string & {})
    /**
     * Whether the input's value is being asynchronously validated, and the validation takes long enough
     * to warrant visual feedback, the input can be marked as busy.
     */
    isBusy?: boolean
    /**
     * Whether the input has been touched, meaning it has received focus, then been blurred. The input
     * must be touched for it's validity to be visually communicated.
     */
    isTouched?: boolean
    /** Leading icon. Is mutually exclusive with `prefix`. */
    leadingIcon?: ReactNode
    /** The maximum width of the input. */
    maxWidth?: string
    /** Prefix text. Is mutually exclusive with `leadingIcon`. */
    prefix?: ReactNode
    /** Size of input. */
    size?: 'small' | 'medium' | 'large'
    /** Suffix text. Is mutually exclusive with `trailingIcon`. */
    suffix?: ReactNode
    /** Trailing icon. Is mutually exclusive with `suffix`. */
    trailingIcon?: ReactNode
    /** Type of input. */
    type?: 'email' | 'date' | 'datetime-local' | 'password' | 'search' | 'tel' | 'text' | 'time' | 'url'
  }
}

/**
 * A basic text input component that supports leading and trailing icons, as well as prefixes and suffixes.
 */
export const TextInput = forwardRef<HTMLInputElement, TextInput.Props>(
  (
    {
      autoComplete = 'off',
      className,
      isBusy,
      isTouched,
      leadingIcon,
      maxWidth,
      prefix,
      size,
      style,
      suffix,
      trailingIcon,
      type = 'text',
      ...rest
    },
    ref,
  ) => {
    const showSpinner = !!isBusy

    // Prefix will always display if one is provided, but we ignore the suffix if the spinner
    // needs to be shown.
    const showPrefix = !!prefix
    const showSuffix = !showSpinner && !!suffix

    // We ignore the leading or trailing icons if there's a prefix or suffix respectively.
    // We also ignore the trailing icon if the spinner must be shown.
    const showLeadingIcon = !showPrefix && !!leadingIcon
    const showTrailingIcon = !showSpinner && !showSuffix && !!trailingIcon

    // If there's a suffix, whether it is shown or not, we right-align the text.
    // Otherwise, we left-align it.
    const inputTextAlignment = suffix ? 'right' : 'left'

    return (
      // Consumer-supplied class names and inline styles are applied to the root "container" element,
      // not the input. This is because we don't want consumers to _easily_ override the input's styles
      // as they're specific to the correct functioning of the component.
      <ElTextInputContainer
        aria-busy={!!isBusy}
        className={className}
        data-size={size}
        style={{ '--input-max-width': maxWidth, ...style }}
      >
        {showPrefix && <ElTextInputAffixContainer>{prefix}</ElTextInputAffixContainer>}
        {showLeadingIcon && <ElTextInputIconContainer>{leadingIcon}</ElTextInputIconContainer>}
        <ElTextInput
          {...rest}
          autoComplete={autoComplete}
          data-is-touched={!!isTouched}
          data-text-align={inputTextAlignment}
          ref={ref}
          type={type}
        />
        {showTrailingIcon && <ElTextInputIconContainer>{trailingIcon}</ElTextInputIconContainer>}
        {showSuffix && <ElTextInputAffixContainer>{suffix}</ElTextInputAffixContainer>}
        {showSpinner && (
          <ElTextInputIconContainer aria-hidden>
            <Spinner className={elTextInputSpinner} />
          </ElTextInputIconContainer>
        )}
      </ElTextInputContainer>
    )
  },
)

TextInput.displayName = 'TextInput'
