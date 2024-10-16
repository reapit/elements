import { FC, HTMLAttributes, ReactNode } from 'react'
import { ElButtonGroup } from './styles'

interface ButtonGroupProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

export const ButtonGroup: FC<ButtonGroupProps> = ({ children, ...rest }) => {
  return <ElButtonGroup {...rest}>{children}</ElButtonGroup>
}
