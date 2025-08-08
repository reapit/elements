import { ElFilterBarLeftContent } from './styles'
import type { HTMLAttributes, ReactNode } from 'react'

export interface FilterBarLeftContentProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

/**
 * The left content of a filter bar. Will typically contain a search input and/or some actions.
 */
export function FilterBarLeftContent(props: FilterBarLeftContentProps) {
  return <ElFilterBarLeftContent {...props} />
}
