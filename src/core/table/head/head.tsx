import { cx } from '@linaria/core'
import { elTableHead } from './styles'

import type { HTMLAttributes, ReactNode } from 'react'

export namespace TableHead {
  interface AsTheadProps extends HTMLAttributes<HTMLTableSectionElement> {
    as?: 'thead'
    /** The table's header rows. */
    children: ReactNode
  }

  interface AsDivProps extends HTMLAttributes<HTMLDivElement> {
    as: 'div'
    /** The table's header rows. */
    children: ReactNode
  }

  export type Props = AsTheadProps | AsDivProps
}

/**
 * A table's head. Does little more than render its children in a `<thead>` or `<div>` element.
 * Descendants will flow to new rows while columns will align to the table's grid using
 * [subgrid](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout/Subgrid).
 * Typically used via `Table.Head`.
 */
export function TableHead({ as: Element = 'thead', children, className, ...rest }: TableHead.Props) {
  return (
    <Element {...rest} className={cx(elTableHead, className)}>
      {children}
    </Element>
  )
}

TableHead.displayName = 'Table.Head'

// Backward compatibility
export type TableHeadProps = TableHead.Props
