import { forwardRef, useRef } from "react";

import mergeRefs from "#src/helpers/mergeRefs";

import { ElShadowTextarea, ElTextarea } from "../styles";
import type { BaseTextareaProps, ContentFieldSizing } from "../types";
import isCSSContentFieldSizingSupported from "./is-css-content-fieldsizing-supported";
import useResizeTextareaEffect from "./use-resize-textarea-effect";
import useResizeTextareaOnChange from "./use-resize-textarea-onchange";

export namespace TextareaWithContentSizing {
  export interface Props extends BaseTextareaProps {
    /**
     * Allows the text area to automatically size itself based on its content, within the specified
     * minimum and maximum number of rows.
     */
    fieldSizing: ContentFieldSizing;
    /**
     * The maximum number of rows to which the text area should be sized. Provides the upper bound
     * for the text area to grow to, except where an explicit value for `rows` is defined. The default
     * is Infinity.
     */
    maxRows?: number;
    /**
     * The minimum number of rows to which the text area should be sized. Provides the lower bound
     * for the text area to shrink to, except where an explicit value for `rows` is defined. The
     * [MDN docs](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea#rows)
     * highlight that the default number of rows is 2.
     */
    minRows?: number;
  }
}

/** @deprecated Use TextareaWithContentSizing.Props instead */
export type ContentFieldSizingTextAreaProps = TextareaWithContentSizing.Props;

/**
 * An text area that automatically resizes based on its content between a minimum and maximum number of rows.
 */
export const TextareaWithContentSizing = forwardRef<
  HTMLTextAreaElement,
  TextareaWithContentSizing.Props
>(
  (
    {
      defaultValue,
      fieldSizing = "content",
      maxRows = Infinity,
      minRows = 2,
      onChange,
      showValidity,
      size = "medium",
      value,
      ...rest
    },
    ref,
  ) => {
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    const shadowTextAreaRef = useRef<HTMLTextAreaElement>(null);

    // NOTE: We should only use the JS resizing logic if the CSS field-sizing property is not supported
    const shouldResizeViaJS = !isCSSContentFieldSizingSupported();

    useResizeTextareaEffect({
      isEnabled: shouldResizeViaJS,
      shadowTextAreaRef,
      textAreaRef,
      value,
    });

    const decorateOnChange = useResizeTextareaOnChange({
      // NOTE: We only want the resizing behaviour to occur on change if the text area should resize AND its
      // value is uncontrolled.
      isEnabled: shouldResizeViaJS && value === undefined,
      shadowTextAreaRef,
      textAreaRef,
    });

    return (
      <>
        <ElTextarea
          {...rest}
          data-field-sizing={fieldSizing}
          data-show-validity={!!showValidity}
          data-size={size}
          defaultValue={defaultValue}
          style={{
            "--textarea-max-rows": maxRows,
            "--textarea-min-rows": minRows,
          }}
          onChange={decorateOnChange(onChange)}
          ref={mergeRefs(textAreaRef, ref)}
          value={value}
        />
        {shouldResizeViaJS && (
          // NOTE: This "shadow" text area is used to help size the visible text area above. Once the
          // CSS [field-sizing](https://developer.mozilla.org/en-US/docs/Web/CSS/field-sizing)
          // property becomes more widely available, we won't need this at all.
          <ElShadowTextarea
            aria-hidden
            data-field-sizing={fieldSizing}
            data-show-validity={!!showValidity}
            data-size={size}
            defaultValue={defaultValue}
            ref={shadowTextAreaRef}
            style={{
              "--textarea-max-rows": maxRows,
              "--textarea-min-rows": minRows,
            }}
            value={value}
          />
        )}
      </>
    );
  },
);
