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
  const handleOnNextClick = useCallback(() => {
    const futurePage = Number(currentPage) + 1
    if (futurePage > pageCount) return

    onPageChange(futurePage)
  }, [currentPage, pageCount])

  const handleOnBackClick = useCallback(() => {
    const futurePage = Number(currentPage) - 1
    if (futurePage < 1) return

    onPageChange(futurePage)
  }, [currentPage])

  return (
    <ElPagination role="doc-pagelist" aria-label="Pagination">
      <ElPaginationList>
        <ElPaginationItem>
          <Button
            aria-label="Go to previous page"
            disabled={currentPage <= 1}
            onClick={handleOnBackClick}
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
            disabled={currentPage >= pageCount}
            onClick={handleOnNextClick}
            iconLeft={<Icon icon="chevronRight" />}
            variant="tertiary"
          />
        </ElPaginationItem>
      </ElPaginationList>
    </ElPagination>
  )
}
