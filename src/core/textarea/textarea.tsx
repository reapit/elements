import { forwardRef } from "react";

import { TextareaWithContentSizing } from "./content-sizing";
import { TextareaWithFixedSizing } from "./fixed-sizing";
import { TextareaWithManualSizing } from "./manual-sizing";

export namespace Textarea {
  export type Props =
    | TextareaWithContentSizing.Props
    | TextareaWithFixedSizing.Props
    | TextareaWithManualSizing.Props;
}

/** @deprecated Use TextArea.Props instead */
export type TextareaProps = Textarea.Props;

/**
 * An (almost) standard HTML/JSX `<textarea>` for use in forms.
 *
 * Can automatically resize itself between a minimum and/or maximum number of lines of text (rows). This
 * resizing behaviour is available for CSS-only consumers on Chrome and Edge. For browsers that do not yet
 * support the [field-sizing](https://developer.mozilla.org/en-US/docs/Web/CSS/field-sizing) property, we
 * fallback to a JS-based resizing solution that is only available to React-based consumers.
 */
export const Textarea = forwardRef<HTMLTextAreaElement, Textarea.Props>(
  ({ fieldSizing, ...rest }, ref) => {
    if (fieldSizing === "manual") {
      return <TextareaWithManualSizing {...rest} fieldSizing={fieldSizing} ref={ref} />;
    } else if (fieldSizing === "fixed") {
      return <TextareaWithFixedSizing {...rest} fieldSizing={fieldSizing} ref={ref} />;
    } else {
      return <TextareaWithContentSizing {...rest} fieldSizing={fieldSizing} ref={ref} />;
    }
  },
);
