import {
  ElTextInput,
  ElTextInputAffixContainer,
  ElTextInputContainer,
  ElTextInputIconContainer,
  ElTextInputOverlay,
  elTextInputSpinner,
} from './styles'
import { forwardRef, useEffect, useId, useRef, useState } from 'react'
import Spinner from './spinner.svg?react'

import type { InputHTMLAttributes, ReactNode } from 'react'

// NOTE: we omit...
// - prefix, because we want to use it for our own purposes.
// - size, because we want to use it for our own purposes.
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
     * Returns a formatted display string for the given input value. When provided, the formatted
     * text is shown over the input while it is not focused. The input's actual `.value` remains
     * unchanged. Should be a stable reference (e.g. memoised with `useCallback`).
     *
     * To present no formatting for a given value, return the value unchanged: the overlay then
     * renders the same text as the input and is visually inert. Throwing is also tolerated, but
     * returning the value unchanged is preferred. For controlled inputs, a throw hides the overlay
     * for that render only. For uncontrolled inputs, a throw on the initial render keeps the overlay
     * hidden until the next blur (when the function is retried).
     */
    formatValue?: (value: string) => string
    /**
     * Whether the input's value is being asynchronously validated, and the validation takes long enough
     * to warrant visual feedback, the input can be marked as busy.
     */
    isBusy?: boolean
    /**
     * Whether the control's validity should be visually communicated or not. Typically, validity will only be shown
     * when the control has been touched (i.e. the user has interacted with it).
     */
    showValidity?: boolean
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
    /** The visual style of the input. */
    variant?: 'default' | 'borderless'
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
      formatValue,
      isBusy,
      leadingIcon,
      maxWidth,
      prefix,
      showValidity,
      size = 'medium',
      style,
      suffix,
      trailingIcon,
      type = 'text',
      variant = 'default',
      ...rest
    },
    ref,
  ) => {
    const fallbackId = useId()
    const inputId = rest.id ?? fallbackId

    // For controlled inputs (value prop set), derive overlay text directly from the prop.
    // For uncontrolled inputs (defaultValue or no value), maintain state updated on blur.
    const isControlled = rest.value !== undefined
    let controlledOverlay: string | undefined = undefined
    if (formatValue && isControlled) {
      try {
        controlledOverlay = formatValue(String(rest.value))
      } catch {
        // formatValue threw; overlay hidden for this render.
      }
    }
    const [uncontrolledOverlay, setUncontrolledOverlay] = useState<string | undefined>(() => {
      if (!formatValue || isControlled) return undefined
      try {
        return formatValue(String(rest.defaultValue ?? ''))
      } catch {
        return undefined
      }
    })
    // Stable ref so the event listeners below can always call the latest setter
    // without needing to be re-registered when state changes.
    const setUncontrolledOverlayRef = useRef(setUncontrolledOverlay)
    setUncontrolledOverlayRef.current = setUncontrolledOverlay
    const overlayText = controlledOverlay ?? uncontrolledOverlay

    // When formatValue changes identity (e.g. locale change in NumberInput), re-sync the
    // uncontrolled overlay immediately rather than waiting for the next blur.
    useEffect(() => {
      if (!formatValue || isControlled) return
      const el = document.getElementById(inputId)
      const input = el instanceof HTMLInputElement ? el : null
      if (input) {
        try {
          setUncontrolledOverlay(formatValue(input.value))
        } catch {
          // formatValue threw; leave overlay unchanged.
        }
      }
    }, [formatValue, inputId, isControlled])

    // Re-sync the uncontrolled overlay when the input value changes while unfocused
    // (e.g. browser autofill, programmatic value + dispatched input event) and when
    // the owning form is reset (the value updates after the reset event, so we defer
    // to the next animation frame).
    useEffect(() => {
      if (!formatValue || isControlled) return
      const el = document.getElementById(inputId)
      const input = el instanceof HTMLInputElement ? el : null
      if (!input) return

      const syncOverlay = (value: string) => {
        try {
          setUncontrolledOverlayRef.current(formatValue(value))
        } catch {
          // formatValue threw; leave overlay unchanged.
        }
      }

      const handleInput = () => {
        if (document.activeElement !== input) syncOverlay(input.value)
      }

      let rafId: ReturnType<typeof requestAnimationFrame>
      const handleReset = () => {
        rafId = requestAnimationFrame(() => syncOverlay(input.value))
      }

      input.addEventListener('input', handleInput)
      input.form?.addEventListener('reset', handleReset)

      return () => {
        input.removeEventListener('input', handleInput)
        input.form?.removeEventListener('reset', handleReset)
        cancelAnimationFrame(rafId)
      }
    }, [formatValue, inputId, isControlled])

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
        data-variant={variant}
        style={{ '--input-max-width': maxWidth, ...style }}
      >
        {showPrefix && <ElTextInputAffixContainer data-position="before">{prefix}</ElTextInputAffixContainer>}
        {showLeadingIcon && <ElTextInputIconContainer data-position="before">{leadingIcon}</ElTextInputIconContainer>}
        <ElTextInput
          {...rest}
          autoComplete={autoComplete}
          data-show-validity={!!showValidity}
          data-text-align={inputTextAlignment}
          id={inputId}
          onBlur={(e) => {
            if (formatValue && !isControlled) {
              try {
                setUncontrolledOverlay(formatValue(e.currentTarget.value))
              } catch {
                // formatValue threw; leave overlay unchanged so onBlur still fires.
              }
            }
            rest.onBlur?.(e)
          }}
          ref={ref}
          type={type}
        />
        {formatValue && overlayText !== undefined && (
          <ElTextInputOverlay aria-hidden="true" data-formatted-overlay data-text-align={inputTextAlignment}>
            {overlayText}
          </ElTextInputOverlay>
        )}
        {showTrailingIcon && <ElTextInputIconContainer data-position="after">{trailingIcon}</ElTextInputIconContainer>}
        {showSuffix && <ElTextInputAffixContainer data-position="after">{suffix}</ElTextInputAffixContainer>}
        {showSpinner && (
          <ElTextInputIconContainer aria-hidden data-position="after">
            <Spinner className={elTextInputSpinner} />
          </ElTextInputIconContainer>
        )}
      </ElTextInputContainer>
    )
  },
)

TextInput.displayName = 'TextInput'
