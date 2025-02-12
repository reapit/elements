import React, { FC, ReactNode, ThHTMLAttributes } from 'react'
import { ElTableHeaderCell, ElTableHeaderCellContent } from './styles'

export interface TableHeaderProps extends ThHTMLAttributes<HTMLTableCellElement> {
  children: ReactNode
  alignment?: 'left' | 'center' | 'right'
  width?: string
  minWidth?: string
  maxWidth?: string
  flexDirection?: 'column' | 'row'
  isFlexWrap?: boolean
}

export const TableHeaderCell: FC<TableHeaderProps> = ({
  children,
  alignment = 'left',
  flexDirection = 'column',
  isFlexWrap,
  ...rest
}) => {
  return (
    <ElTableHeaderCell role="cell" {...rest} data-alignment={alignment}>
      <ElTableHeaderCellContent data-flex-direction={flexDirection} isFlexWrap={isFlexWrap}>
        {children}
      </ElTableHeaderCellContent>
    </ElTableHeaderCell>
  )
}
