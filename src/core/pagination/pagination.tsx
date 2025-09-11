import { ElPagination, ElPaginationItem, ElPaginationList } from './styles'
import { getLinkProps } from './get-link-props'
import { PaginationInfo } from './info'
import { PaginationLink, PaginationLinkButton } from './link'
import { useCallback } from 'react'

import type { ReactNode } from 'react'

export namespace Pagination {
  export interface Props {
    /**
     * The action to go to the next page. Typically a `Pagination.Link`
     * or `Pagination.LinkButton`.
     */
    leftAction?: ReactNode
    /**
     * Optional callback useful when relying on the deprecated, built-in button controls
     * @deprecated use `leftAction` and `rightAction`
     */
    onPageChange?: (page: number) => void
    /**
     * The total number of pages.
     */
    pageCount: number
    /**
     * The current page number. Expects a 1-based value.
     */
    pageNumber: number
    /**
     * The action to go to the previous page. Typically a `Pagination.Link`
     * or `Pagination.LinkButton`.
     */
    rightAction?: ReactNode
  }
}

/**
 * The pagination component is used to navigate between pages. It displays the current page and the total
 * number of pages available.
 */
export function Pagination({ leftAction, onPageChange, pageCount, pageNumber, rightAction }: Pagination.Props) {
  const deprecatedHandleOnNextPageClick = useCallback(() => {
    onPageChange?.(pageNumber + 1)
  }, [pageNumber])

  const deprecatedHandleOnBackPageClick = useCallback(() => {
    onPageChange?.(pageNumber - 1)
  }, [pageNumber])

  return (
    <ElPagination aria-label="Pagination">
      <ElPaginationList>
        <ElPaginationItem>
          {leftAction ?? (
            // NOTE: will be removed in future
            <PaginationLinkButton
              aria-label="Go to previous page"
              disabled={pageNumber === 1}
              onClick={deprecatedHandleOnBackPageClick}
              variant="previous-page"
            />
          )}
        </ElPaginationItem>

        <ElPaginationItem>
          <PaginationInfo pageNumber={pageNumber} pageCount={pageCount} />
        </ElPaginationItem>

        <ElPaginationItem>
          {rightAction ?? (
            // NOTE: will be removed in future
            <PaginationLinkButton
              aria-label="Go to next page"
              disabled={pageNumber === pageCount}
              onClick={deprecatedHandleOnNextPageClick}
              variant="next-page"
            />
          )}
        </ElPaginationItem>
      </ElPaginationList>
    </ElPagination>
  )
}

Pagination.Info = PaginationInfo
Pagination.Link = PaginationLink
Pagination.LinkButton = PaginationLinkButton

Pagination.getLinkProps = getLinkProps

/** @deprecated Use Pagination.Props instead */
export type PaginationProps = Pagination.Props
