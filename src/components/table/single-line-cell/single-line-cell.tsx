import { FC, ReactNode, HTMLAttributes } from 'react'
import { ElSingleLineCell } from './styles'

export interface SingleLineCellProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode
}

export const SingleLineCell: FC<SingleLineCellProps> = ({ children, ...rest }) => {
  return <ElSingleLineCell {...rest}>{children}</ElSingleLineCell>
}
