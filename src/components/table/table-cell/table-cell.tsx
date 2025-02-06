import React, { FC, ReactNode, TdHTMLAttributes } from 'react'
import { ElTableCell, ElTableCellContent, ElTableCellLink } from './styles'

export interface ITableCellProps extends TdHTMLAttributes<HTMLTableCellElement> {
  children?: ReactNode
  alignment?: 'left' | 'center' | 'right'
  link?: string
  width?: string
  minWidth?: string
  maxWidth?: string
  narrowLabel?: string
}

export const TableCell: FC<ITableCellProps> = ({ children, alignment = 'left', link, narrowLabel, ...rest }) => {
  return (
    <ElTableCell {...rest} data-alignment={alignment}>
      <ElTableCellContent data-narrow-label={narrowLabel}>
        {link && <ElTableCellLink>{children}</ElTableCellLink>}
        {!link && children}
      </ElTableCellContent>
    </ElTableCell>
  )
}
