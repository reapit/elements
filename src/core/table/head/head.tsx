import { cx } from '@linaria/core'
import { elTableHead } from './styles'

import type { HTMLAttributes, ReactNode } from 'react'

interface TableHeadAsTheadProps extends HTMLAttributes<HTMLTableSectionElement> {
  as?: 'thead'
  /** The table's rows. */
  children: ReactNode
}

interface TableHeadAsDivProps extends HTMLAttributes<HTMLDivElement> {
  as: 'div'
  /** The table's rows. */
  children: ReactNode
}

type TableHeadProps = TableHeadAsTheadProps | TableHeadAsDivProps

/**
 * A table's head. Does little more than render its children in a `<thead>` or `<div>` element.
 * Descendants will flow to new rows while columns will align to the table's grid using
 * [subgrid](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout/Subgrid).
 * Typically used via `Table.Head`.
 */
export function TableHead({ as: Element = 'thead', children, className, ...rest }: TableHeadProps) {
  return (
    <Element {...rest} className={cx(elTableHead, className)}>
      {children}
    </Element>
  )
}
