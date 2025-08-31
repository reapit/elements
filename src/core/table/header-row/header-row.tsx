import { cx } from '@linaria/core'
import { elTableHeaderRow } from './styles'

import type { HTMLAttributes, ReactNode } from 'react'

interface TableHeaderRowAsTrProps extends HTMLAttributes<HTMLTableRowElement> {
  as?: 'tr'
  /** The row content. */
  children: ReactNode
}

interface TableHeaderRowAsDivProps extends HTMLAttributes<HTMLDivElement> {
  as: 'div'
  /** The row content. */
  children: ReactNode
}

type TableHeaderRowProps = TableHeaderRowAsTrProps | TableHeaderRowAsDivProps

/**
 * A basic row for a table's head. Does little more than render it's children in a `<tr>` or `<div>`.
 * Cells within a row may contain static text or buttons that sort the table column. Cells are
 * aligned to the table's CSS grid layout via
 * [subgrid](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout/Subgrid). Typically
 * used via `Table.HeadingRow`.
 */
export function TableHeaderRow({ as: Element = 'tr', children, className, ...rest }: TableHeaderRowProps) {
  return (
    <Element {...rest} className={cx(elTableHeaderRow, className)}>
      {children}
    </Element>
  )
}
