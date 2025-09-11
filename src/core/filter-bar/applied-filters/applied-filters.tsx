import { ElFilterBarAppliedFilters, ElFilterBarAppliedFiltersActionContainer } from './styles'

import type { HTMLAttributes, ReactNode } from 'react'

export namespace FilterBarAppliedFilters {
  export interface Props extends HTMLAttributes<HTMLDivElement> {
    /** Optional action element. Typically a "Save filters" button. */
    action?: ReactNode
    /** A chip group displaying the active filters. */
    children: ReactNode
  }
}

/** @deprecated Use FilterBarAppliedFilters.Props instead */
export type FilterBarAppliedFiltersProps = FilterBarAppliedFilters.Props

/**
 * Simple container for applied filters chips and an optional action. Typically used via
 * `FilterBar.AppliedFilters`.
 */
export function FilterBarAppliedFilters({ action, children, ...rest }: FilterBarAppliedFilters.Props) {
  return (
    <ElFilterBarAppliedFilters {...rest}>
      {children}
      {action && <ElFilterBarAppliedFiltersActionContainer>{action}</ElFilterBarAppliedFiltersActionContainer>}
    </ElFilterBarAppliedFilters>
  )
}
