import { ChevronDownIcon } from '#src/icons/chevron-down'
import { ElCompactSelectNative, ElCompactSelectNativeContainer, ElCompactSelectNativeIconContainer } from './styles'
import { forwardRef } from 'react'

import type { ReactNode, SelectHTMLAttributes } from 'react'

// NOTE: We omit:
// - `size` because we want our own string-based size prop to be available.
// - `multiple` because it is incompatible with our compact select design.
type AttributesToOmit = 'size' | 'multiple'

export namespace CompactSelectNative {
  export interface Props extends Omit<SelectHTMLAttributes<HTMLSelectElement>, AttributesToOmit> {
    /** The accessible name of the select */
    'aria-label': string
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
    /** The maximum width of the select */
    maxWidth?: string
    /** The size of the select */
    size: 'small' | 'medium' | 'large'
  }
}

/**
 * A space-saving version of a select input with smaller padding and font size, used in dense layouts or
 * limited screen space. Compact select (native) is preferred for mobile responsiveness. On browsers that
 * support [field-sizing](https://developer.mozilla.org/en-US/docs/Web/CSS/field-sizing), the select will
 * size itself to the size of its content, up to the maximum inline size of its container, rather than
 * the width of the longest option. Importantly, it only supports single selection.
 */
export const CompactSelectNative = forwardRef<HTMLSelectElement, CompactSelectNative.Props>(
  ({ autoComplete = 'off', children, maxWidth, size, ...rest }, ref) => {
    return (
      // NOTE: We have to wrap the select in a container so our chevron icon can be positioned absolutely
      // at the select's right edge. This is the simplest way for us to achieve the visual requirements of
      // the component while still using a native select element. The main downside is we have more DOM elements
      // involved than we would prefer.
      <ElCompactSelectNativeContainer>
        <ElCompactSelectNative
          {...rest}
          autoComplete={autoComplete}
          data-size={size}
          ref={ref}
          style={{ '--select-max-width': maxWidth }}
        >
          {children}
        </ElCompactSelectNative>
        <ElCompactSelectNativeIconContainer aria-hidden>
          <ChevronDownIcon />
        </ElCompactSelectNativeIconContainer>
      </ElCompactSelectNativeContainer>
    )
  },
)

/** @deprecated Use CompactSelectNative.Props instead */
export type CompactSelectNativeProps = CompactSelectNative.Props
