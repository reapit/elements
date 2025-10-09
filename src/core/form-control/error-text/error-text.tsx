import { ElFormControlErrorText } from './styles'

import type { HTMLAttributes } from 'react'

export namespace FormControlErrorText {
  export interface Props extends HTMLAttributes<HTMLParagraphElement> {
    /**
     * The ID of the error text. Should be used to associate the form control with the error text
     * via `aria-describedby`.
     */
    id: string
    /**
     * The size of the error text. Should match the size of the actual input or other form control
     * element being labelled. By default, the text size will inherit from the parent `FormControl`.
     */
    size?: 'small' | 'medium' | 'large'
  }
}

/**
 * The error text for an invalid form control. It should be associated with the invalid form control
 * via the form control's `aria-describedby` attribute.
 */
export function FormControlErrorText({ children, size, ...rest }: FormControlErrorText.Props) {
  return (
    <ElFormControlErrorText {...rest} data-size={size}>
      {children}
    </ElFormControlErrorText>
  )
}

FormControlErrorText.displayName = 'FormControl.ErrorText'
