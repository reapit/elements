import { cx } from '@linaria/core'
import { elTableRowPrimaryAction } from './styles'

import type { AnchorHTMLAttributes, ReactNode } from 'react'

export namespace TableRowPrimaryAction {
  export interface Props extends AnchorHTMLAttributes<HTMLAnchorElement> {
    /** The content of the primary action */
    children: ReactNode
    /** The URL to which this primary action navigates */
    href: string
  }
}

/**
 * A primary action for table rows. Renders as an anchor (`<a>`) element that spans the entire
 * row, allowing users to navigate by clicking anywhere on the row. The visual appearance is
 * designed to integrate seamlessly with table layouts while providing clear interactive feedback.
 * Typically used via `Table.PrimaryAction`.
 */
export function TableRowPrimaryAction({ className, ...rest }: TableRowPrimaryAction.Props) {
  return <a {...rest} className={cx(elTableRowPrimaryAction, className)} />
}

// Backward compatibility
export type TableRowPrimaryActionProps = TableRowPrimaryAction.Props
