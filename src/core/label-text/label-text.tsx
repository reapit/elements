import React, { FC, LabelHTMLAttributes } from 'react'
import { ElLabelRequiredMark, ElLabelText } from './styles'

export namespace LabelText {
  export interface Props extends LabelHTMLAttributes<HTMLSpanElement> {
    variant?: 'soft' | 'strong'
    size?: 'small' | 'medium'
    isRequired?: boolean
  }
}

/** @deprecated Use LabelText.Props instead */
export type LabelTextProps = LabelText.Props

export const LabelText: FC<LabelText.Props> = ({
  children,
  isRequired,
  size = 'medium',
  variant = 'soft',
  ...rest
}) => {
  return (
    <ElLabelText {...rest} data-size={size} data-variant={variant}>
      {children}
      {isRequired && <ElLabelRequiredMark>*</ElLabelRequiredMark>}
    </ElLabelText>
  )
}
