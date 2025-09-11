import {
  ContentFieldSizing,
  ElShadowTextArea,
  ElTextArea,
  elTextAreaHasError,
  FixedFieldSizing,
  ManualFieldSizing,
  type ElTextAreaProps,
} from './styles'
import { cx } from '@linaria/core'
import { forwardRef, useRef } from 'react'
import isCSSContentFieldSizingSupported from './is-css-content-fieldsizing-supported'
import mergeRefs from '../../helpers/mergeRefs'
import useResizeTextAreaOnChange from './use-resize-textarea-onchange'
import useResizeTextAreaEffect from './use-resize-textarea-effect'

interface BaseTextAreaProps extends Omit<ElTextAreaProps, 'data-field-sizing'> {}

export namespace ContentFieldSizingTextArea {
  export interface Props extends BaseTextAreaProps {
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
}

/** @deprecated Use ContentFieldSizingTextArea.Props instead */
export type ContentFieldSizingTextAreaProps = ContentFieldSizingTextArea.Props

/**
 * An text area that automatically resizes based on its content between a minimum and maximum number of rows.
 */
export const ContentFieldSizingTextArea = forwardRef<HTMLTextAreaElement, ContentFieldSizingTextArea.Props>(
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
    const textAreaRef = useRef<HTMLTextAreaElement>(null)
    const shadowTextAreaRef = useRef<HTMLTextAreaElement>(null)

    // NOTE: We should only use the JS resizing logic if the CSS field-sizing property is not supported
    const shouldResizeViaJS = !isCSSContentFieldSizingSupported()

    useResizeTextAreaEffect({
      isEnabled: shouldResizeViaJS,
      shadowTextAreaRef,
      textAreaRef,
      value,
    })

    const decorateOnChange = useResizeTextAreaOnChange({
      // NOTE: We only want the resizing behaviour to occur on change if the text area should resize AND its
      // value is uncontrolled.
      isEnabled: shouldResizeViaJS && value === undefined,
      shadowTextAreaRef,
      textAreaRef,
    })

    return (
      <>
        <ElTextArea
          {...rest}
          className={cx(hasError && elTextAreaHasError, className)}
          data-field-sizing={fieldSizing}
          defaultValue={defaultValue}
          style={{
            '--textarea-max-rows': maxRows,
            '--textarea-min-rows': minRows,
          }}
          onChange={decorateOnChange(onChange)}
          ref={mergeRefs(textAreaRef, ref)}
          value={value}
        />
        {shouldResizeViaJS && (
          // NOTE: This "shadow" text area is used to help size the visible text area above. Once the
          // CSS [field-sizing](https://developer.mozilla.org/en-US/docs/Web/CSS/field-sizing)
          // property becomes more widely available, we won't need this at all.
          <ElShadowTextArea
            aria-hidden
            data-field-sizing={fieldSizing}
            defaultValue={defaultValue}
            ref={shadowTextAreaRef}
            style={{
              '--textarea-max-rows': maxRows,
              '--textarea-min-rows': minRows,
            }}
            value={value}
          />
        )}
      </>
    )
  },
)

export namespace FixedFieldSizingTextArea {
  export interface Props extends BaseTextAreaProps {
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
}

/** @deprecated Use FixedFieldSizingTextArea.Props instead */
export type FixedFieldSizingTextAreaProps = FixedFieldSizingTextArea.Props

/**
 * A fixed-sized text area.
 */
export const FixedFieldSizingTextArea = forwardRef<HTMLTextAreaElement, FixedFieldSizingTextArea.Props>(
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

export namespace ManualFieldSizingTextArea {
  export interface Props extends BaseTextAreaProps {
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
}

/** @deprecated Use ManualFieldSizingTextArea.Props instead */
export type ManualFieldSizingTextAreaProps = ManualFieldSizingTextArea.Props

/**
 * A manually-resizable text area. Should not be used.
 * @deprecated Will be removed in future major version. Use `content` or `fixed` field sizing instead.
 */
export const ManualFieldSizingTextArea = forwardRef<HTMLTextAreaElement, ManualFieldSizingTextArea.Props>(
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
