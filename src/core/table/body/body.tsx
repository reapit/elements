import { cx } from '@linaria/core'
import { elTableBody } from './styles'

import type { HTMLAttributes, ReactNode } from 'react'

interface TableBodyAsTbodyProps extends HTMLAttributes<HTMLTableSectionElement> {
  as?: 'tbody'
  /** The table's rows. */
  children: ReactNode
}

interface TableBodyAsDivProps extends HTMLAttributes<HTMLDivElement> {
  as: 'div'
  /** The table's rows. */
  children: ReactNode
}

type TableBodyProps = TableBodyAsTbodyProps | TableBodyAsDivProps

/**
 * A table's body. Does little more than render its children in a `<tbody>` or `<div>` element.
 * Descendants will flow to new rows while columns will align to the table's grid using
 * [subgrid](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout/Subgrid).
 * Typically used via `Table.Body`.
 */
export function TableBody({ as: Element = 'tbody', children, className, ...rest }: TableBodyProps) {
  return (
    <Element {...rest} className={cx(elTableBody, className)}>
      {children}
    </Element>
  )
}
