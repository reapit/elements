import { forwardRef } from 'react'
import { ElCompactSelectNative, ElCompactSelectNativeContainer, ElCompactSelectNativeIconContainer } from './styles'
import { ChevronDownIcon } from '#src/icons/chevron-down'

import type { ReactNode, SelectHTMLAttributes } from 'react'

// NOTE: We omit:
// - `size` because we want our own string-based size prop to be available.
// - `multiple` because it is incompatible with our compact select design.
type AttributesToOmit = 'size' | 'multiple'

export interface CompactSelectNativeProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, AttributesToOmit> {
  /** The accessible name of the select */
  'aria-label': string
  /** The options for the select. Must be `<option>` or `<optgroup>` elements. */
  children: ReactNode
  /** The maximum width of the select */
  maxWidth?: string
  /** The size of the select */
  size: 'small' | 'medium' | 'large'
}

/**
 * A space-saving version of a select input with smaller padding and font size, used in dense layouts or limited
 * screen space. Compact select (native) is preferred for mobile responsiveness. On browsers that support
 * [field-sizing](https://developer.mozilla.org/en-US/docs/Web/CSS/field-sizing), the select will size itself to
 * the size of its content, rather than the width of the longest option.
 *
 * **Note:** We do not support the `multiple` attribute because it is incompatible with the compact select's design.
 */
export const CompactSelectNative = forwardRef<HTMLSelectElement, CompactSelectNativeProps>(
  ({ children, maxWidth, size, ...rest }, ref) => {
    return (
      // NOTE: We have to wrap the select in a container so our chevron icon can be positioned absolutely
      // at the select's right edge. This is the simplest way for us to achieve the visual requirements of
      // the component while still using a native select element. The main downside is we have more DOM elements
      // involved than we would prefer.
      <ElCompactSelectNativeContainer>
        <ElCompactSelectNative {...rest} data-size={size} ref={ref} style={{ '--select-max-width': maxWidth }}>
          {children}
        </ElCompactSelectNative>
        <ElCompactSelectNativeIconContainer aria-hidden>
          <ChevronDownIcon />
        </ElCompactSelectNativeIconContainer>
      </ElCompactSelectNativeContainer>
    )
  },
)
