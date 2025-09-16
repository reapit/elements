import { cx } from '@linaria/core'
import { elTableRowPrimaryAction } from './styles'

import type { ButtonHTMLAttributes, ReactNode } from 'react'

// NOTE: we omit...
// - type, because we internally control the button type
type AttributesToOmit = 'type'

export namespace TableRowPrimaryActionButton {
  export interface Props extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, AttributesToOmit> {
    /** The content of the primary action */
    children: ReactNode
  }
}

/**
 * A primary action button for table rows. Renders as a button (`<button>`) element that spans the entire
 * row, allowing users to interact by clicking anywhere on the row. The visual appearance is
 * designed to integrate seamlessly with table layouts while providing clear interactive feedback.
 * Typically used via `Table.PrimaryActionButton`.
 */
export function TableRowPrimaryActionButton({ className, ...rest }: TableRowPrimaryActionButton.Props) {
  return <button {...rest} className={cx(elTableRowPrimaryAction, className)} />
}

TableRowPrimaryActionButton.displayName = 'Table.PrimaryActionButton'

// Backward compatibility
export type TableRowPrimaryActionButtonProps = TableRowPrimaryActionButton.Props
