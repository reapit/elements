import { cx } from '@linaria/core'
import { elTableRowPrimaryAction } from './styles'

import type { ButtonHTMLAttributes, ReactNode } from 'react'

// NOTE: We omit...
// - disabled, because the row's primary action should never be disabled.
type AttributesToOmit = 'disabled'

export interface TableRowPrimaryActionButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, AttributesToOmit> {
  /** The content of the primary action */
  children: ReactNode
}

/**
 * A simple primary action component for table rows. Comes in two varieties: `Table.PrimaryActionButton`,
 * which renders as a button, and `Table.PrimaryAction`, which renders as an anchor.
 */
export function TableRowPrimaryActionButton({ className, ...rest }: TableRowPrimaryActionButtonProps) {
  return <button {...rest} className={cx(elTableRowPrimaryAction, className)} />
}
