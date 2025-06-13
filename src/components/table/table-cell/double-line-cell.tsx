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
