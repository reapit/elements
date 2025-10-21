import { ElTextArea } from '../styles'
import { forwardRef } from 'react'

import type { BaseTextareaProps, ManualFieldSizing } from '../types'

export namespace TextareaWithManualSizing {
  export interface Props extends BaseTextareaProps {
    /**
     * Allows the text area to be manually sized by users.
     * @deprecated `manual` is deprecated. Please use `content` or `fixed` field sizing instead.
     */
    fieldSizing: ManualFieldSizing
    /**
     * The exact number of rows to which the text area should be _initially_ sized.
     */
    initialRows?: number
  }
}

/** @deprecated Use ManualFieldSizingTextArea.Props instead */
export type ManualFieldSizingTextAreaProps = TextareaWithManualSizing.Props

/**
 * A manually-resizable text area. Should not be used.
 * @deprecated Will be removed in future major version. Use `content` or `fixed` field sizing instead.
 */
export const TextareaWithManualSizing = forwardRef<HTMLTextAreaElement, TextareaWithManualSizing.Props>(
  ({ fieldSizing, initialRows = 3, showValidity, size = 'medium', ...rest }, ref) => {
    return (
      <ElTextArea
        {...rest}
        data-field-sizing={fieldSizing}
        data-show-validity={!!showValidity}
        data-size={size}
        ref={ref}
        rows={initialRows}
      />
    )
  },
)
