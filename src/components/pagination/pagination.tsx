import { FC, useCallback } from 'react'

import { Button } from '../button'
import { Icon } from '../icon'

import { ElPagination, ElPaginationItem, ElPaginationList, ElPaginationText } from './styles'

export interface PaginationProps {
  /**
   * state of the current page
   */
  currentPage: number
  /**
   * total number of pages
   */
  pageCount: number
  /**
   * triggered when the  clicks on a button to change the current page
   */
  onPageChange: (page: number) => void
}

export const Pagination: FC<PaginationProps> = ({ currentPage, pageCount, onPageChange }) => {
  const handleOnNextPageClick = useCallback(() => {
    onPageChange(currentPage + 1)
  }, [currentPage])

  const handleOnBackPageClick = useCallback(() => {
    onPageChange(currentPage - 1)
  }, [currentPage])

  return (
    <ElPagination role="doc-pagelist" aria-label="Pagination">
      <ElPaginationList>
        <ElPaginationItem>
          <Button
            aria-label="Go to previous page"
            isDisabled={currentPage <= 1}
            onClick={handleOnBackPageClick}
            iconLeft={<Icon icon="chevronLeft" />}
            variant="tertiary"
          />
        </ElPaginationItem>
        <ElPaginationItem>
          <ElPaginationText>{`${currentPage} of ${pageCount}`}</ElPaginationText>
        </ElPaginationItem>
        <ElPaginationItem>
          <Button
            aria-label="Go to next page"
            isDisabled={currentPage >= pageCount}
            onClick={handleOnNextPageClick}
            iconLeft={<Icon icon="chevronRight" />}
            variant="tertiary"
          />
        </ElPaginationItem>
      </ElPaginationList>
    </ElPagination>
  )
}
