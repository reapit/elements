import { cx } from '@linaria/core'
import { elTableBody } from './styles'

import type { HTMLAttributes, ReactNode } from 'react'

export namespace TableBody {
  interface AsTbodyProps extends HTMLAttributes<HTMLTableSectionElement> {
    as?: 'tbody'
    /** The table's rows. */
    children: ReactNode
  }

  interface AsDivProps extends HTMLAttributes<HTMLDivElement> {
    as: 'div'
    /** The table's rows. */
    children: ReactNode
  }

  export type Props = AsTbodyProps | AsDivProps
}

/**
 * A table's body. Does little more than render its children in a `<tbody>` or `<div>` element.
 * Descendants will flow to new rows while columns will align to the table's grid using
 * [subgrid](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout/Subgrid).
 * Typically used via `Table.Body`.
 */
export function TableBody({ as: Element = 'tbody', children, className, ...rest }: TableBody.Props) {
  return (
    <Element {...rest} className={cx(elTableBody, className)}>
      {children}
    </Element>
  )
}

// Backward compatibility
export type TableBodyProps = TableBody.Props
