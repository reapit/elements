import React, { FC, LabelHTMLAttributes } from 'react'
import { ElLabel } from './styles'

export interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  variant?: 'soft' | 'strong'
  size?: 'small' | 'medium'
  isRequired?: boolean
}

export const Label: FC<LabelProps> = ({ children, isRequired, size = 'medium', variant = 'soft', ...rest }) => {
  return (
    <ElLabel {...rest} data-size={size} data-variant={variant}>
      {children}
      {isRequired && ' *'}
    </ElLabel>
  )
}
