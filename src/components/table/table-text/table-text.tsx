import React, { ReactNode, HTMLAttributes } from 'react'
import { ElTableText, ElTableTextIcon, ElTableTextContainer, ElTableTextContent } from './styles'

type TableTextVariant =
  | 'primary'
  | 'secondary'
  | 'info'
  | 'success'
  | 'pending'
  | 'warning'
  | 'error'
  | 'accent_1'
  | 'accent_2'
  | 'action'
type TableTextSize = 'small' | 'extra-small'

export interface TableTextProps extends HTMLAttributes<HTMLDivElement> {
  variant?: TableTextVariant
  size?: TableTextSize
  iconLeft?: ReactNode
  iconRight?: ReactNode
}

export const TableText: React.FC<TableTextProps> = ({ children, variant, size, iconLeft, iconRight, ...rest }) => {
  return (
    <ElTableText data-variant={variant} data-size={size} {...rest}>
      {iconLeft && <ElTableTextIcon>{iconLeft}</ElTableTextIcon>}
      {children && (
        <ElTableTextContainer>
          <ElTableTextContent>{children}</ElTableTextContent>
        </ElTableTextContainer>
      )}
      {iconRight && <ElTableTextIcon>{iconRight}</ElTableTextIcon>}
    </ElTableText>
  )
}
