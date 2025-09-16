import { ElTableToolbar, ElTableToolbarLeftContent, ElTableToolbarRightContent } from './styles'

import type { HTMLAttributes, ReactNode } from 'react'

// NOTE: we omit...
// - children, because we internally control the child content
type AttributesToOmit = 'children'

export namespace TableToolbar {
  export interface Props extends Omit<HTMLAttributes<HTMLDivElement>, AttributesToOmit> {
    /** Typically used to show the total number of items or the number of selected rows. */
    leftContent?: ReactNode
    /**
     * Typically used to display table controls, like page size, or actions available for
     * the selected rows.
     */
    rightContent?: ReactNode
  }
}

/**
 * A simple toolbar for tables that displays information about the number of items present, or selected,
 * in the table and/or some controls related to the items. At least one of `leftContent` or `rightContent`
 * must be provided.
 */
export function TableToolbar({ leftContent, rightContent, ...rest }: TableToolbar.Props) {
  return (
    <ElTableToolbar {...rest}>
      {leftContent && <ElTableToolbarLeftContent>{leftContent}</ElTableToolbarLeftContent>}
      {rightContent && <ElTableToolbarRightContent>{rightContent}</ElTableToolbarRightContent>}
    </ElTableToolbar>
  )
}

TableToolbar.displayName = 'Table.Toolbar'

// Backward compatibility
export type TableToolbarProps = TableToolbar.Props
