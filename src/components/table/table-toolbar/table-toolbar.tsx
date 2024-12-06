import { HTMLAttributes, ReactNode } from 'react'
import { ElTableToolbar, ElTableToolbarActions, ElTableToolbarDescription } from './styles'

interface TableToolbarProps extends HTMLAttributes<HTMLDivElement> {
  description?: ReactNode
  actions?: ReactNode
}

export const TableToolbar: React.FC<TableToolbarProps> = ({ description, actions }) => {
  return (
    <ElTableToolbar>
      <ElTableToolbarDescription>{description}</ElTableToolbarDescription>
      <ElTableToolbarActions>{actions}</ElTableToolbarActions>
    </ElTableToolbar>
  )
}
