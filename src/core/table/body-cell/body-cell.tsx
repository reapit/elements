import { cx } from '@linaria/core'
import { elTableBodyCell } from './styles'

import type { HTMLAttributes, ReactNode, TdHTMLAttributes, ThHTMLAttributes } from 'react'

export namespace TableBodyCell {
  interface CommonProps {
    /**
     * Remove default padding. Useful for cells that contain an interactive element whose hit area
     * should fill the entire cell.
     */
    hasNoPadding?: boolean
    /** The alignment of the cell's content. */
    justifySelf?: 'start' | 'center' | 'end'
  }

  interface AsTdProps extends CommonProps, TdHTMLAttributes<HTMLTableCellElement> {
    as?: 'td'
    /** The cell content. */
    children: ReactNode
  }

  interface AsThProps
    extends CommonProps,
      // NOTE: we omit scope because it should always be "row"
      Omit<ThHTMLAttributes<HTMLTableCellElement>, 'scope'> {
    as: 'th'
    /** The cell content. */
    children: ReactNode
  }

  interface AsDivProps extends CommonProps, HTMLAttributes<HTMLDivElement> {
    as: 'div'
    /** The cell content. */
    children: ReactNode
  }

  export type Props = AsTdProps | AsThProps | AsDivProps
}

/**
 * A basic cell for a table's body. Does little more than render its children in a `<td>`,
 * `<th>`, or `<div>` element. Typically used via `Table.BodyCell`.
 */
export function TableBodyCell({
  as: Element = 'td',
  children,
  className,
  hasNoPadding,
  justifySelf,
  ...rest
}: TableBodyCell.Props) {
  const thElementScope = Element === 'th' ? { scope: 'row' } : undefined
  return (
    <Element
      {...rest}
      {...thElementScope}
      className={cx(elTableBodyCell, className)}
      data-has-no-padding={hasNoPadding}
      data-justify-self={justifySelf}
    >
      {children}
    </Element>
  )
}

TableBodyCell.displayName = 'Table.BodyCell'

// Backward compatibility
export type TableBodyCellProps = TableBodyCell.Props
