import { ChevronDownIcon } from '#src/icons/chevron-down'
import { ElSelectNative, ElSelectNativeContainer, ElSelectNativeIconContainer } from './styles'
import { forwardRef } from 'react'

import type { ReactNode, SelectHTMLAttributes } from 'react'

// NOTE: We omit:
// - `size` because we want our own string-based size prop to be available.
// - `multiple` because it is incompatible with our compact select design.
type AttributesToOmit = 'size' | 'multiple'

export namespace SelectNative {
  export interface Props extends Omit<SelectHTMLAttributes<HTMLSelectElement>, AttributesToOmit> {
    /**
     * Specifies what, if any, permission the user agent has to provide automated assistance in filling
     * out form field values, as well as guidance to the browser as to the type of information expected
     * in the field. See [autocomplete](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/autocomplete)
     * docs on MDN.
     *
     * Default's to `off` to avoid PII being used in forms.
     */
    autoComplete?: 'off' | 'on' | (string & {})
    /** The options for the select. Must be `<option>` or `<optgroup>` elements. */
    children: ReactNode
    /** Specifies the initially selected value. By default, the first option will be selected. */
    defaultValue?: string
    /** The ID of the `<form>` element to associate this select with. */
    form?: string
    /**
     * Whether the select has been touched, meaning it has received focus, then been blurred. The select
     * must be touched for it's validity to be visually communicated.
     */
    isTouched?: boolean
    /** The maximum width of the select */
    maxWidth?: string
    /** The name of the control */
    name?: string
    /** Used to indicate whether an option with a non-empty string value must be selected. */
    required?: boolean
    /** The size of the select */
    size: 'small' | 'medium' | 'large'
    /** Controls which option is selected. Must match the value of some `<option>`. */
    value?: string
  }
}

/**
 * A simple, native select. By default, the select will size itself to fill the inline size of its
 * container. Importantly, it only supports single selection.
 */
export const SelectNative = forwardRef<HTMLSelectElement, SelectNative.Props>(
  ({ autoComplete = 'off', children, className, isTouched, maxWidth, size, style, ...rest }, ref) => {
    return (
      // NOTE: We have to wrap the select in a container so our chevron icon can be positioned absolutely
      // at the select's right edge. This is the simplest way for us to achieve the visual requirements of
      // the component while still using a native select element. The main downside is we have more DOM
      // elements involved than we would prefer.
      <ElSelectNativeContainer className={className} style={{ ...style, '--select-max-width': maxWidth }}>
        <ElSelectNative {...rest} autoComplete={autoComplete} data-is-touched={!!isTouched} data-size={size} ref={ref}>
          {children}
        </ElSelectNative>
        <ElSelectNativeIconContainer aria-hidden>
          <ChevronDownIcon />
        </ElSelectNativeIconContainer>
      </ElSelectNativeContainer>
    )
  },
)

/** @deprecated Use SelectNative.Props instead */
export type SelectNativeProps = SelectNative.Props
