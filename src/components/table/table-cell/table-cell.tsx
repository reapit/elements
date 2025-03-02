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

/**
 * `TableCell` is a standard HTML/JSX `<td>` component used in tables.
 * It also includes a child container (`<div>`) for additional flexibility.
 *
 * Typically `TableCell` is used inside `TableBody` and `TableRow` to display data.
 *
 * This component supports customization of alignment, width, and layout properties,
 * including flex direction and wrapping behavior, making it adaptable to various table structures.
 *
 * ### Props (`TableCellProps`):
 * - `alignment`: Defines text alignment for the content.
 * - `width`: Sets the width of the table cell.
 * - `minWidth`: Sets the minimum width of the table cell.
 * - `maxWidth`: Sets the maximum width of the table cell.
 * - `flexDirection`: Controls the flex direction (`row` or `column`) without adding an extra wrapper around the child.
 * - `isFlexWrap`: Determines whether child elements should wrap (`true`) or remain in a single line (`false`).
 */

export const TableCell: FC<TableCellProps> = ({
  children,
  alignment = 'left',
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
      <ElTableCellContent>{children}</ElTableCellContent>
    </ElTableCell>
  )
}
