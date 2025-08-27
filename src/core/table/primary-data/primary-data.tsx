import {
  ElTableCellPrimaryData,
  ElTableCellPrimaryDataContentContainer,
  ElTableCellPrimaryDataIconContainer,
} from './styles'

import type { HTMLAttributes, ReactNode } from 'react'

interface TableCellPrimaryDataProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * The primary data being displayed in the table cell. Typically used with alphanumeric
   * information like addresses, dates, times, and names.
   */
  children: ReactNode
  /** The leading icon displayed before the content. */
  iconLeft?: ReactNode
  /** The trailing icon displayed after the content. */
  iconRight?: ReactNode
}

/**
 * A simple layout component for pairing a left or right icon with some other cell content.
 * Typically used with alphanumeric information like addresses, dates, times, and names as a
 * cell's primary data. It ensures the icons remain visible even when there is insufficient
 * space for the content. Typically used via `Table.PrimaryData`.
 */
export function TableCellPrimaryData({ children, iconLeft, iconRight, ...rest }: TableCellPrimaryDataProps) {
  return (
    <ElTableCellPrimaryData {...rest}>
      {iconLeft && (
        // NOTE: the icon containers are not aria-hidden like other components do with their
        // icon containers. This is because the icons displayed here may be semantically meaningful
        // and therefore may need to be accessible to assistive technologies.
        <ElTableCellPrimaryDataIconContainer data-placement="left" role="presentation">
          {iconLeft}
        </ElTableCellPrimaryDataIconContainer>
      )}
      <ElTableCellPrimaryDataContentContainer>{children}</ElTableCellPrimaryDataContentContainer>
      {iconRight && (
        <ElTableCellPrimaryDataIconContainer data-placement="right" role="presentation">
          {iconRight}
        </ElTableCellPrimaryDataIconContainer>
      )}
    </ElTableCellPrimaryData>
  )
}
