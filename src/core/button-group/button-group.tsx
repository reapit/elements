import { FC, HTMLAttributes, ReactNode } from 'react'
import { ElButtonGroup } from './styles'

export namespace ButtonGroup {
  export interface Props extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode
  }
}

export const ButtonGroup: FC<ButtonGroup.Props> = ({ children, ...rest }) => {
  return <ElButtonGroup {...rest}>{children}</ElButtonGroup>
}
