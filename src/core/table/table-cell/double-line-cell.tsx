import { FC, ReactNode, HTMLAttributes } from 'react'
import {
  ElAvatarContent,
  ElCellContent,
  ElMediaItemContent,
  ElDoubleLineContent,
  ElFirstLine,
  ElSecondLine,
  ElTableCell,
  ElTableCellContent,
} from './styles'

export interface ElDoubleLineCellProps extends HTMLAttributes<HTMLTableCellElement> {
  mediaItem?: ReactNode
  firstLine?: ReactNode
  secondLine?: ReactNode
  alignment?: 'left' | 'center' | 'right'
  width?: string
  minWidth?: string
  maxWidth?: string
}

/**
 * `DoubleLineCell` is a reusable table cell component that displays:
 * - An optional media/avatar item,
 * - A two-line layout with first and second lines of content.
 *
 * It supports alignment and width customization via CSS variables, and is useful for structured
 * row displays like contact info, user lists, etc.
 *
 * @param mediaItem - Optional avatar or media node to show beside the text.
 * @param firstLine - Main line of text (e.g. title or name).
 * @param secondLine - Subtext or secondary info.
 * @param alignment - Content alignment within the cell ('left', 'center', 'right').
 * @param width - Width of the cell.
 * @param minWidth - Minimum width of the cell.
 * @param maxWidth - Maximum width of the cell.
 * @param style - Inline styles applied to the cell (merged with width vars).
 * @param rest - Additional props passed to the table cell element.
 */
export const DoubleLineCell: FC<ElDoubleLineCellProps> = ({
  mediaItem,
  firstLine,
  secondLine,
  alignment = 'left',
  width = 'auto',
  maxWidth = '100%',
  minWidth = 'auto',
  style,
  ...rest
}) => {
  const DoubleLineContents = (
    <>
      <ElFirstLine>{firstLine}</ElFirstLine>
      <ElSecondLine>{secondLine}</ElSecondLine>
    </>
  )

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
      <ElTableCellContent data-alignment={alignment}>
        {mediaItem ? (
          <ElAvatarContent>
            <ElMediaItemContent>{mediaItem}</ElMediaItemContent>
            <ElDoubleLineContent>{DoubleLineContents}</ElDoubleLineContent>
          </ElAvatarContent>
        ) : (
          <ElCellContent>{DoubleLineContents}</ElCellContent>
        )}
      </ElTableCellContent>
    </ElTableCell>
  )
}
