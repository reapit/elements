import React, { FC, ReactNode, TdHTMLAttributes } from 'react'
import { ElTableCell, ElTableCellContent } from './styles'

export interface TableCellProps extends TdHTMLAttributes<HTMLTableCellElement> {
  children?: ReactNode
  alignment?: 'left' | 'center' | 'right'
  width?: string
  minWidth?: string
  maxWidth?: string
  flexDirection?: 'column' | 'row'
  isFlexWrap?: boolean
}

export const TableCell: FC<TableCellProps> = ({
  children,
  alignment = 'left',
  flexDirection = 'column',
  isFlexWrap,
  ...rest
}) => {
  return (
    <ElTableCell {...rest} data-alignment={alignment}>
      <ElTableCellContent data-flex-direction={flexDirection} isFlexWrap={isFlexWrap}>
        {children}
      </ElTableCellContent>
    </ElTableCell>
  )
}
