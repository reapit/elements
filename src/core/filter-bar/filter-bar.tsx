import {
  ElFilterBar,
  ElFilterBarAppliedFiltersContainer,
  ElFilterBarLeftContentContainer,
  ElFilterBarRightContentContainer,
} from './styles'
import { FilterBarAppliedFilters } from './applied-filters'
import { FilterBarLeftContent } from './left-content'
import { FilterBarRightContent } from './right-content'

import type { HTMLAttributes, ReactNode } from 'react'

export namespace FilterBar {
  export interface Props extends HTMLAttributes<HTMLDivElement> {
    /** The applied filters. Typically used with `FilterBar.AppliedFilters`. */
    appliedFilters?: ReactNode
    /** Content for the left side of the filter bar. Typically used with `FilterBar.LeftContent`. */
    leftContent?: ReactNode
    /** Content for the right side of the filter bar. Typically used with `FilterBar.RightContent`. */
    rightContent?: ReactNode
  }
}

/** @deprecated Use FilterBar.Props instead */
export type FilterBarProps = FilterBar.Props

/**
 * A filter bar is used with tables or lists to lets users narrow the result set by selecting from given options.
 */
export function FilterBar({ appliedFilters, leftContent, rightContent, ...rest }: FilterBar.Props) {
  return (
    // NOTE: We apply role="search" explicitly because React Testing Library does not (yet)
    // support it implicitly for the <search> element.
    <ElFilterBar {...rest} role="search">
      <ElFilterBarLeftContentContainer>{leftContent}</ElFilterBarLeftContentContainer>
      {rightContent && <ElFilterBarRightContentContainer>{rightContent}</ElFilterBarRightContentContainer>}
      {appliedFilters && <ElFilterBarAppliedFiltersContainer>{appliedFilters}</ElFilterBarAppliedFiltersContainer>}
    </ElFilterBar>
  )
}

FilterBar.AppliedFilters = FilterBarAppliedFilters
FilterBar.LeftContent = FilterBarLeftContent
FilterBar.RightContent = FilterBarRightContent
