import { HTMLAttributes, ReactNode } from 'react'
import { ElSkeleton, ElTableToolbar, ElTableToolbarActions, ElTableToolbarDescription } from './styles'

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

interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  height?: string
  width?: string
}

export const Skeleton: React.FC<SkeletonProps> = ({ height, width }) => {
  return <ElSkeleton style={{ height: height, width: width }} />
}
