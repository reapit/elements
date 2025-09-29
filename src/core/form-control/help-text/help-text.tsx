import { ElFormControlHelpText } from './styles'

import type { HTMLAttributes } from 'react'

export namespace FormControlHelpText {
  export interface Props extends HTMLAttributes<HTMLParagraphElement> {
    /**
     * The ID of the help text. Should be used to associate the form control with the help text
     * via `aria-describedby`.
     */
    id: string
    /**
     * The size of the help text. Should match the size of the actual input or other form control
     * element being labelled. By default, the text size will inherit from the parent `FormControl`.
     */
    size?: 'small' | 'medium' | 'large'
  }
}

/**
 * The help text for a form control.
 */
export function FormControlHelpText({ children, size, ...rest }: FormControlHelpText.Props) {
  return (
    <ElFormControlHelpText {...rest} data-size={size}>
      {children}
    </ElFormControlHelpText>
  )
}

FormControlHelpText.displayName = 'FormControl.HelpText'
