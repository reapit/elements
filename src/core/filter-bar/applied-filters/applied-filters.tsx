import { ElFilterBarAppliedFilters, ElFilterBarAppliedFiltersActionContainer } from './styles'

import type { HTMLAttributes, ReactNode } from 'react'

export interface FilterBarAppliedFiltersProps extends HTMLAttributes<HTMLDivElement> {
  /** Optional action element. Typically a "Save filters" button. */
  action?: ReactNode
  /** A chip group displaying the active filters. */
  children: ReactNode
}

/**
 * Simple container for applied filters chips and an optional action. Typically used via
 * `FilterBar.AppliedFilters`.
 */
export function FilterBarAppliedFilters({ action, children, ...rest }: FilterBarAppliedFiltersProps) {
  return (
    <ElFilterBarAppliedFilters {...rest}>
      {children}
      {action && <ElFilterBarAppliedFiltersActionContainer>{action}</ElFilterBarAppliedFiltersActionContainer>}
    </ElFilterBarAppliedFilters>
  )
}
