import { FC, ReactNode, HTMLAttributes } from 'react'
import {
  ElDoubleLineCell,
  ElAvatarContent,
  ElCellContent,
  ElMediaItemContent,
  ElDoubleLineContent,
  ElFirstLine,
  ElSecondLine,
} from './styles'

export interface ElDoubleLineCellProps extends HTMLAttributes<HTMLDivElement> {
  mediaItem?: ReactNode
  firstLine?: ReactNode
  secondLine?: ReactNode
}

export const DoubleLineCell: FC<ElDoubleLineCellProps> = ({ mediaItem, firstLine, secondLine, ...rest }) => {
  const DoubleLineContents = (
    <>
      <ElFirstLine>{firstLine}</ElFirstLine>
      <ElSecondLine>{secondLine}</ElSecondLine>
    </>
  )

  return (
    <ElDoubleLineCell {...rest}>
      {mediaItem ? (
        <ElAvatarContent>
          <ElMediaItemContent>{mediaItem}</ElMediaItemContent>
          <ElDoubleLineContent>{DoubleLineContents}</ElDoubleLineContent>
        </ElAvatarContent>
      ) : (
        <ElCellContent>{DoubleLineContents}</ElCellContent>
      )}
    </ElDoubleLineCell>
  )
}
