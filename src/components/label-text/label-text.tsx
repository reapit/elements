import React, { FC, LabelHTMLAttributes } from 'react'
import { ElLabelRequiredMark, ElLabelText } from './styles'

interface LabelTextProps extends LabelHTMLAttributes<HTMLSpanElement> {
  variant?: 'soft' | 'strong'
  size?: 'small' | 'medium'
  isRequired?: boolean
}

export const LabelText: FC<LabelTextProps> = ({ children, isRequired, size = 'medium', variant = 'soft', ...rest }) => {
  return (
    <ElLabelText {...rest} data-size={size} data-variant={variant}>
      {children}
      {isRequired && <ElLabelRequiredMark>*</ElLabelRequiredMark>}
    </ElLabelText>
  )
}
