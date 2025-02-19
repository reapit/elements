import React, { FC, ReactNode, ThHTMLAttributes } from 'react'
import { ElTableHeaderCell, ElTableHeaderCellContent, TableCellCSSProperties } from './styles'

export interface TableHeaderCellProps extends ThHTMLAttributes<HTMLTableCellElement> {
  children: ReactNode
  alignment?: 'left' | 'center' | 'right'
  width?: string
  minWidth?: string
  maxWidth?: string
  flexDirection?: 'column' | 'row'
  isFlexWrap?: boolean
  style?: TableCellCSSProperties
}

/**
 * A standard HTML/JSX `<th>` component for use in tables.
 *
 * `TableHeaderCell` is typically used as a child of `TableHead`, providing column headers.
 * It supports customization of alignment, width, and layout properties like flex direction and wrapping behavior.
 *
 * This component is flexible, allowing various styling options to fit different table structures.
 *
 * ### Props (`TableHeaderCellProps`):
 * - `alignment`: Defines text alignment for the content.
 * - `width`: Sets the width of the table header cell.
 * - `minWidth`: Sets the minimum width of the table header cell.
 * - `maxWidth`: Sets the maximum width of the table header cell.
 * - `flexDirection`: Controls the flex direction (`row` or `column`) without adding an extra wrapper around child.
 * - `isFlexWrap`: Determines whether child elements should wrap (`true`) or remain in a single line (`false`).
 */

export const TableHeaderCell: FC<TableHeaderCellProps> = ({
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
    <ElTableHeaderCell
      {...rest}
      data-alignment={alignment}
      style={{
        '--tablecell-header-max-width': maxWidth,
        '--tablecell-header-min-width': minWidth,
        '--tablecell-header-width': width,
        ...style,
      }}
    >
      <ElTableHeaderCellContent
        data-flex-direction={flexDirection}
        style={{
          '--tablecell-header-flex-wrap': isFlexWrap ? 'wrap' : 'wrap',
        }}
      >
        {children}
      </ElTableHeaderCellContent>
    </ElTableHeaderCell>
  )
}
