import { HTMLAttributes, ReactNode } from 'react'
import { ElExperimentalTableContainer } from './styles'

interface TableContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

export const TableContainer: React.FC<TableContainerProps> = ({ children, ...rest }) => {
  return <ElExperimentalTableContainer {...rest}>{children}</ElExperimentalTableContainer>
}
