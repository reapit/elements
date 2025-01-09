import React, { FC, LabelHTMLAttributes } from 'react'
import { ElLabel } from './styles'

export interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  variant?: 'soft' | 'strong'
  size?: 'small' | 'medium'
  required?: boolean
}

export const Label: FC<LabelProps> = ({ children, required, size = 'medium', variant = 'soft', ...rest }) => {
  return (
    <ElLabel {...rest} data-size={size} data-variant={variant}>
      {children}
      {required && ' *'}
    </ElLabel>
  )
}
