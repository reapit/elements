import { HTMLAttributes, ReactNode } from 'react'
import {
  ElExperimentalTableToolbar,
  ElExperimentalTableToolbarActions,
  ElExperimentalTableToolbarDescription,
} from './styles'

interface TableToolbarProps extends HTMLAttributes<HTMLDivElement> {
  description?: ReactNode
  actions?: ReactNode
}

export const TableToolbar: React.FC<TableToolbarProps> = ({ description, actions }) => {
  return (
    <ElExperimentalTableToolbar>
      <ElExperimentalTableToolbarDescription>{description}</ElExperimentalTableToolbarDescription>
      <ElExperimentalTableToolbarActions>{actions}</ElExperimentalTableToolbarActions>
    </ElExperimentalTableToolbar>
  )
}
