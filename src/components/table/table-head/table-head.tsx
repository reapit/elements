import React, { FC, ReactNode, TableHTMLAttributes } from 'react'
import { ElTableHead } from './styles'

export interface ITableHeadProps extends Omit<TableHTMLAttributes<HTMLTableSectionElement>, 'children'> {
  children?: ReactNode
  isSticky?: boolean
}

export const TableHead: FC<ITableHeadProps> = ({ children, isSticky, ...rest }) => {
  return (
    <ElTableHead role="columnheader" {...rest} data-position={isSticky ? 'sticky' : 'relative'}>
      {children}
    </ElTableHead>
  )
}
