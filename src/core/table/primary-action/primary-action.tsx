import { cx } from '@linaria/core'
import { elTableRowPrimaryAction } from './styles'

import type { AnchorHTMLAttributes, ReactNode } from 'react'

export interface TableRowPrimaryActionProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  /** The content of the primary action */
  children: ReactNode
  /** The URL to which this primary action navigates */
  href: string
}

/**
 * A simple primary action component for table rows that allows an anchor or button, typically placed
 * within a row's header cell, to act as the row's primary action. The key feature of the primary
 * action is that its "hit area" will expand to fill the bounding box of the closest, relative-positioned
 * ancestor. By default, this will be the table row.
 *
 * Comes in two varieties: `Table.PrimaryAction`, which renders as an anchor, and
 * `Table.PrimaryActionButton`, which renders as a button.
 */
export function TableRowPrimaryAction({ className, ...rest }: TableRowPrimaryActionProps) {
  return <a {...rest} className={cx(elTableRowPrimaryAction, className)} />
}
