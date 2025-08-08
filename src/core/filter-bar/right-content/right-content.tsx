import { ElFilterBarRightContent } from './styles'

import type { HTMLAttributes, ReactNode } from 'react'

export interface FilterBarRightContentProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

/**
 * The rigth content of a filter bar. Will typically contain controls like chip selects, buttons, or switches.
 */
export function FilterBarRightContent(props: FilterBarRightContentProps) {
  return <ElFilterBarRightContent {...props} />
}
