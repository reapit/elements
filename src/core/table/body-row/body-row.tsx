import { cx } from '@linaria/core'
import { elTableBodyRow } from './styles'

import type { HTMLAttributes, ReactNode } from 'react'

export namespace TableBodyRow {
  interface AsTrProps extends HTMLAttributes<HTMLTableRowElement> {
    as?: 'tr'
    /** The row's cells. */
    children: ReactNode
  }

  interface AsDivProps extends HTMLAttributes<HTMLDivElement> {
    as: 'div'
    /** The row's cells. */
    children: ReactNode
  }

  export type Props = AsTrProps | AsDivProps
}

/**
 * A table's body row. Does little more than render its children in a `<tr>` or `<div>` element.
 * Descendants will flow to new columns while rows will align to the table's grid using
 * [subgrid](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout/Subgrid).
 * Typically used via `Table.BodyRow`.
 */
export function TableBodyRow({ as: Element = 'tr', children, className, ...rest }: TableBodyRow.Props) {
  return (
    <Element {...rest} className={cx(elTableBodyRow, className)}>
      {children}
    </Element>
  )
}

TableBodyRow.displayName = 'Table.BodyRow'

// Backward compatibility
export type TableBodyRowProps = TableBodyRow.Props
