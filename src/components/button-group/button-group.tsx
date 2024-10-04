import { FC } from 'react'
import { ButtonGroupProps } from './types'
import { ElButtonGroup } from './styles'

export const ButtonGroup: FC<ButtonGroupProps> = ({ children, ...rest }) => {
  return <ElButtonGroup {...rest}>{children}</ElButtonGroup>
}
