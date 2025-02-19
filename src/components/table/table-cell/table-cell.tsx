import React, { FC, ReactNode, TdHTMLAttributes } from 'react'
import { ElTableCell, ElTableCellContent, TableCellCSSProperties } from './styles'

/**
 * alignment: Defines label text alignment children
 * width: Defines TableCell width for the children
 * minWidth: Defines TableCell minWidth for the children
 * maxWidth: Defines TableCell minWidth for the children
 * flexDirection: Defines TableCell flex direction to row or column without adding new wrapper on child content
 * isFlexWrap: Defines TableCell wrap or nowrap for the children of we have custom child without adding new wrapper
 */
export interface TableCellProps extends TdHTMLAttributes<HTMLTableCellElement> {
  children?: ReactNode
  alignment?: 'left' | 'center' | 'right'
  width?: string
  minWidth?: string
  maxWidth?: string
  flexDirection?: 'column' | 'row'
  isFlexWrap?: boolean
  style?: TableCellCSSProperties
}

export const TableCell: FC<TableCellProps> = ({
  children,
  alignment = 'left',
  flexDirection = 'column',
  isFlexWrap,
  width = 'auto',
  maxWidth = '100%',
  minWidth = 'auto',
  style,
  ...rest
}) => {
  return (
    <ElTableCell
      {...rest}
      data-alignment={alignment}
      style={{
        '--tablecell-max-width': maxWidth,
        '--tablecell-min-width': minWidth,
        '--tablecell-width': width,
        ...style,
      }}
    >
      <ElTableCellContent
        data-flex-direction={flexDirection}
        style={{
          '--tablecell-flex-wrap': isFlexWrap ? 'wrap' : 'wrap',
        }}
      >
        {children}
      </ElTableCellContent>
    </ElTableCell>
  )
}
