import { ContentFieldSizingTextArea, FixedFieldSizingTextArea, ManualFieldSizingTextArea } from './textarea.atoms'
import { forwardRef } from 'react'

export namespace TextArea {
  export type Props =
    | ContentFieldSizingTextArea.Props
    | FixedFieldSizingTextArea.Props
    | ManualFieldSizingTextArea.Props
}

/** @deprecated Use TextArea.Props instead */
export type TextAreaProps = TextArea.Props

/**
 * An (almost) standard HTML/JSX `<textarea>` for use in forms.
 *
 * Can automatically resize itself between a minimum and/or maximum number of lines of text (rows). This
 * resizing behaviour is available for CSS-only consumers on Chrome and Edge. For browsers that do not yet
 * support the [field-sizing](https://developer.mozilla.org/en-US/docs/Web/CSS/field-sizing) property, we
 * fallback to a JS-based resizing solution that is only available to React-based consumers.
 */
export const TextArea = forwardRef<HTMLTextAreaElement, TextArea.Props>(({ fieldSizing, ...rest }, ref) => {
  if (fieldSizing === 'manual') {
    return <ManualFieldSizingTextArea fieldSizing={fieldSizing} {...rest} ref={ref} />
  } else if (fieldSizing === 'fixed') {
    return <FixedFieldSizingTextArea fieldSizing={fieldSizing} {...rest} ref={ref} />
  } else {
    return <ContentFieldSizingTextArea fieldSizing={fieldSizing} {...rest} ref={ref} />
  }
})
