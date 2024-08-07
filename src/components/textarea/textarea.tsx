import { cx } from '@linaria/core'
import { ElTextArea, elTextAreaHasError, type TextAreaCSSProperties } from './styles'
import { forwardRef } from 'react'

import type { CSSProperties, TextareaHTMLAttributes } from 'react'

// NOTE: We omit the `cols` prop because our text area should always grow to the width of its container.
interface RestrictedTextareaHTMLAttributes extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'cols'> {}

export interface TextAreaProps extends RestrictedTextareaHTMLAttributes {
  /**
   * Indicates whether the text area has a form validation error or not. Provided as an escape-hatch
   * for when you cannot rely on the [`:invalid` pseudo-class](https://developer.mozilla.org/en-US/docs/Web/CSS/:invalid)
   * and need to control the error state manually.
   */
  hasError?: boolean
  /**
   * The maximum number of rows to which the text area should be sized. Provides the upper bound
   * for the text area to grow to, except where an explicit value for `rows` is defined.
   *
   * @default Infinity
   */
  maxRows?: number
  /**
   * The minimum number of rows to which the text area should be sized. Provides the lower bound
   * for the text area to shrink to, except where an explicit value for `rows` is defined. The
   * [MDN docs](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea#rows)
   * highlight that the default number of rows is 2.
   *
   * @default 2
   */
  minRows?: number
  /**
   * The exact number of rows to which the text area should be sized. When provided, it overrides any
   * other `minRows` or `maxRows` values. This also disables any auto-sizing behaviour for the text area.
   */
  rows?: number
}

/**
 * An (almost) standard HTML/JSX `<textarea>` for use in forms.
 *
 * Can automatically resize itself between a minimum and/or maximum number of lines of text (rows). This
 * resizing behaviour is available for CSS-only consumers on Chrome and Edge. For browsers that do not yet
 * support the [field-sizing](https://developer.mozilla.org/en-US/docs/Web/CSS/field-sizing) property, we
 * fallback to a JS-based resizing solution that is only available to React-based consumers.
 */
export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className, defaultValue, hasError, maxRows = Infinity, minRows = 2, onChange, rows, value, ...rest }, ref) => {
    return (
      <ElTextArea
        {...rest}
        className={cx(hasError && elTextAreaHasError, className)}
        defaultValue={defaultValue}
        style={
          {
            // NOTE: `rows` takes precedence. If it's defined, the text area is effectively fixed-height.
            // If it's not defined, we allow resizing to occur between the min and max rows.
            '--textarea-max-rows': rows ?? maxRows,
            '--textarea-min-rows': rows ?? minRows,
          } satisfies TextAreaCSSProperties as CSSProperties
        }
        onChange={onChange}
        ref={ref}
        rows={rows}
        value={value}
      />
    )
  },
)
