import React, { FC, ReactNode, TableHTMLAttributes } from 'react'
import { ElTableHead } from './styles'

export interface TableHeadProps extends TableHTMLAttributes<HTMLTableSectionElement> {
  children?: ReactNode
  isSticky?: boolean
}

export const TableHead: FC<TableHeadProps> = ({ children, isSticky, ...rest }) => {
  return (
    <ElTableHead role="columnheader" {...rest} data-position={isSticky ? 'sticky' : 'relative'}>
      {children}
    </ElTableHead>
  )
}
