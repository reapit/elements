import { ElLabelText } from './styles'

import type { LabelHTMLAttributes } from 'react'

export namespace LabelText {
  export interface Props extends LabelHTMLAttributes<HTMLSpanElement> {
    /** Whether the required indicator should be displayed. Only applicable when labelling form controls. */
    isRequired?: boolean
    /** The size of the label text. */
    size?: 'small' | 'medium'
    /** The variant of the label text. */
    variant?: 'soft' | 'strong'
  }
}

/** @deprecated Use LabelText.Props instead */
export type LabelTextProps = LabelText.Props

/**
 * Labels give a name to a component or group of components. Pair them with form components like checkboxes
 * or inputs to prompt someone to enter certain information, or with plain text to categorise information.
 */
export function LabelText({ children, isRequired, size = 'medium', variant = 'soft', ...rest }: LabelText.Props) {
  return (
    <ElLabelText {...rest} data-size={size} data-variant={variant}>
      {children}
      {isRequired && ' *'}
    </ElLabelText>
  )
}
