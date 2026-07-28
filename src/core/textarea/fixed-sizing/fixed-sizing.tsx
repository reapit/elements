import { forwardRef } from "react";

import { ElTextarea } from "../styles";
import type { BaseTextareaProps, FixedFieldSizing } from "../types";

export namespace TextareaWithFixedSizing {
  export interface Props extends BaseTextareaProps {
    /** Ensures the text area has a fixed size based on the specified number of rows. */
    fieldSizing: FixedFieldSizing;
    /**
     * The exact number of rows to which the text area should be sized.
     */
    rows?: number;
  }
}

/** @deprecated Use TextareaWithFixedSizing.Props instead */
export type FixedFieldSizingTextAreaProps = TextareaWithFixedSizing.Props;

/**
 * A fixed-sized text area.
 */
export const TextareaWithFixedSizing = forwardRef<
  HTMLTextAreaElement,
  TextareaWithFixedSizing.Props
>(({ fieldSizing, rows = 2, showValidity, size = "medium", ...rest }, ref) => {
  return (
    <ElTextarea
      {...rest}
      data-field-sizing={fieldSizing}
      data-show-validity={!!showValidity}
      data-size={size}
      ref={ref}
      rows={rows}
    />
  );
});
