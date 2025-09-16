import {
  ElTableCellDoubleLineLayout,
  ElTableCellDoubleLineLayoutMediaItem,
  ElTableCellDoubleLineLayoutPrimaryData,
  ElTableCellDoubleLineLayoutSupplementaryData,
} from './styles'

import type { HTMLAttributes, ReactNode } from 'react'

export namespace TableCellDoubleLineLayout {
  export interface Props extends HTMLAttributes<HTMLDivElement> {
    /**
     * The primary data being displayed in the table cell. Typically used with alphanumeric
     * information like addresses, dates, times, and names.
     */
    children: ReactNode
    /** The media item to display. Typically an image or avatar. */
    mediaItem?: ReactNode
    /** The trailing icon displayed after the content. */
    supplementaryData?: ReactNode
  }
}

/**
 * A simple layout component for displaying two lines of content within a cell, plus an optional
 * media item (e.g., an avatar or image). Typically used via `Table.DoubleLineLayout`.
 */
export function TableCellDoubleLineLayout({
  children,
  mediaItem,
  supplementaryData,
  ...rest
}: TableCellDoubleLineLayout.Props) {
  return (
    <ElTableCellDoubleLineLayout {...rest}>
      {mediaItem && <ElTableCellDoubleLineLayoutMediaItem>{mediaItem}</ElTableCellDoubleLineLayoutMediaItem>}
      <ElTableCellDoubleLineLayoutPrimaryData>{children}</ElTableCellDoubleLineLayoutPrimaryData>
      {supplementaryData && (
        <ElTableCellDoubleLineLayoutSupplementaryData>{supplementaryData}</ElTableCellDoubleLineLayoutSupplementaryData>
      )}
    </ElTableCellDoubleLineLayout>
  )
}

TableCellDoubleLineLayout.displayName = 'Table.DoubleLineLayout'

// Backward compatibility
export type TableCellDoubleLineLayoutProps = TableCellDoubleLineLayout.Props
