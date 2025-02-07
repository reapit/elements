import React, { FC, ReactNode, TdHTMLAttributes } from 'react'
import { ElTableCell, ElTableCellContent } from './styles'

export interface ITableCellProps extends TdHTMLAttributes<HTMLTableCellElement> {
  children?: ReactNode
  alignment?: 'left' | 'center' | 'right'
  width?: string
  minWidth?: string
  maxWidth?: string
}

export const TableCell: FC<ITableCellProps> = ({ children, alignment = 'left', ...rest }) => {
  return (
    <ElTableCell role="cell" {...rest} data-alignment={alignment}>
      <ElTableCellContent>{children}</ElTableCellContent>
    </ElTableCell>
  )
}
