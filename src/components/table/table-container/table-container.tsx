import { HTMLAttributes, ReactNode } from 'react'
import { ElTableContainer } from './styles'

interface TableContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

export const TableContainer: React.FC<TableContainerProps> = ({ children, ...rest }) => {
  return <ElTableContainer {...rest}>{children}</ElTableContainer>
}
