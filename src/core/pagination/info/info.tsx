import { ElPaginationInfo } from './styles'

import type { HTMLAttributes } from 'react'

// NOTE: we omit...
// - children, because we control the pagination info content, not the consumer
type AttributesToOmit = 'children'

interface PaginationInfoProps extends Omit<HTMLAttributes<HTMLSpanElement>, AttributesToOmit> {
  /** The current page number */
  pageCount: number
  /** The total number of pages */
  pageNumber: number
}

/**
 * A simple component for displaying the current page out of the total number of pages present.
 */
export function PaginationInfo({ pageNumber, pageCount, ...rest }: PaginationInfoProps) {
  return <ElPaginationInfo {...rest}>{`${pageNumber} of ${pageCount}`}</ElPaginationInfo>
}
