import React, { FC, ReactNode, ThHTMLAttributes } from 'react'
import { ElTableHeaderCell, ElTableHeaderCellContent } from './styles'

export interface ITableHeaderProps extends ThHTMLAttributes<HTMLTableCellElement> {
  children: ReactNode
  alignment?: 'left' | 'center' | 'right'
  width?: string
  minWidth?: string
  maxWidth?: string
}

export const TableHeaderCell: FC<ITableHeaderProps> = ({ children, alignment = 'left', ...rest }) => {
  return (
    <ElTableHeaderCell {...rest} data-alignment={alignment}>
      <ElTableHeaderCellContent>{children}</ElTableHeaderCellContent>
    </ElTableHeaderCell>
  )
}
