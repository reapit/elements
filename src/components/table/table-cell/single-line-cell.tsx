import { FC, ReactNode, HTMLAttributes } from 'react'
import { ElTableCell, ElTableCellContent } from './styles'

export interface SingleLineCellProps extends HTMLAttributes<HTMLTableCellElement> {
  children?: ReactNode
  alignment?: 'left' | 'center' | 'right'
  width?: string
  minWidth?: string
  maxWidth?: string
}

/**
 * `SingleLineCell` is a flexible component used to render content
 * in a single-line layout, typically inside a custom table or list.
 *
 * It wraps content in a styled container with alignment and layout constraints.
 *
 * Useful in scenarios where consistent horizontal spacing and alignment are needed,
 * such as custom cells with icons, badges, or other UI elements.
 *
 * ### Props (`SingleLineCellProps`):
 * - `children`: Content to display inside the cell.
 * - `alignment`: Aligns the content to the left, center, or right.
 * - `width`: Sets the cell’s width.
 * - `minWidth`: Sets the minimum allowed width.
 * - `maxWidth`: Sets the maximum allowed width.
 */
export const SingleLineCell: FC<SingleLineCellProps> = ({
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
      style={{
        '--tablecell-max-width': maxWidth,
        '--tablecell-min-width': minWidth,
        '--tablecell-width': width,
        ...style,
      }}
    >
      <ElTableCellContent data-alignment={alignment}>{children}</ElTableCellContent>
    </ElTableCell>
  )
}
