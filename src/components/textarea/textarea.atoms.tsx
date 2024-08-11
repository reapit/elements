import { cx } from '@linaria/core'
import {
  ContentFieldSizing,
  ElTextArea,
  elTextAreaHasError,
  FixedFieldSizing,
  ManualFieldSizing,
  type ElTextAreaProps,
} from './styles'
import { forwardRef } from 'react'

interface BaseTextAreaProps extends Omit<ElTextAreaProps, 'data-field-sizing'> {}

export interface ContentFieldSizingTextAreaProps extends BaseTextAreaProps {
  /**
   * Allows the text area to automatically size itself based on its content, within the specified
   * minimum and maximum number of rows.
   */
  fieldSizing: ContentFieldSizing
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
   * @default 3
   */
  minRows?: number
}

/**
 * An text area that automatically resizes based on its content between a minimum and maximum number of rows.
 */
export const ContentFieldSizingTextArea = forwardRef<HTMLTextAreaElement, ContentFieldSizingTextAreaProps>(
  (
    {
      className,
      defaultValue,
      fieldSizing = 'content',
      hasError,
      maxRows = Infinity,
      minRows = 3,
      onChange,
      value,
      ...rest
    },
    ref,
  ) => {
    return (
      <ElTextArea
        {...rest}
        className={cx(hasError && elTextAreaHasError, className)}
        data-field-sizing={fieldSizing}
        defaultValue={defaultValue}
        style={{
          '--textarea-max-rows': maxRows,
          '--textarea-min-rows': minRows,
        }}
        onChange={onChange}
        ref={ref}
        value={value}
      />
    )
  },
)

export interface FixedFieldSizingTextAreaProps extends BaseTextAreaProps {
  /**
   * Ensures the text area has a fixed size based on the specified number of rows.
   */
  fieldSizing: FixedFieldSizing
  /**
   * The exact number of rows to which the text area should be sized.
   *
   * @default 3
   */
  rows?: number
}

/**
 * A fixed-sized text area.
 */
export const FixedFieldSizingTextArea = forwardRef<HTMLTextAreaElement, FixedFieldSizingTextAreaProps>(
  ({ className, defaultValue, fieldSizing, hasError, rows = 3, onChange, value, ...rest }, ref) => {
    return (
      <ElTextArea
        {...rest}
        className={cx(hasError && elTextAreaHasError, className)}
        data-field-sizing={fieldSizing}
        defaultValue={defaultValue}
        onChange={onChange}
        ref={ref}
        rows={rows}
        value={value}
      />
    )
  },
)

export interface ManualFieldSizingTextAreaProps extends BaseTextAreaProps {
  /**
   * Allows the text area to be manually sized by users.
   * @deprecated `manual` is deprecated. Please use `content` or `fixed` field sizing instead.
   */
  fieldSizing: ManualFieldSizing
  /**
   * The exact number of rows to which the text area should be _initially_ sized.
   *
   * @default 3
   */
  initialRows?: number
}

/**
 * A manually-resizable text area. Should not be used.
 * @deprecated Will be removed in future major version. Use `content` or `fixed` field sizing instead.
 */
export const ManualFieldSizingTextArea = forwardRef<HTMLTextAreaElement, ManualFieldSizingTextAreaProps>(
  ({ className, defaultValue, fieldSizing, hasError, initialRows = 3, onChange, value, ...rest }, ref) => {
    return (
      <ElTextArea
        {...rest}
        className={cx(hasError && elTextAreaHasError, className)}
        data-field-sizing={fieldSizing}
        defaultValue={defaultValue}
        onChange={onChange}
        ref={ref}
        rows={initialRows}
        value={value}
      />
    )
  },
)
