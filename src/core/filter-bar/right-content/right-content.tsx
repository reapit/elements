import { ElFilterBarRightContent } from './styles'

import type { HTMLAttributes, ReactNode } from 'react'

export namespace FilterBarRightContent {
  export interface Props extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode
  }
}

/** @deprecated Use FilterBarRightContent.Props instead */
export type FilterBarRightContentProps = FilterBarRightContent.Props

/**
 * The rigth content of a filter bar. Will typically contain controls like chip selects, buttons, or switches.
 */
export function FilterBarRightContent(props: FilterBarRightContent.Props) {
  return <ElFilterBarRightContent {...props} />
}

FilterBarRightContent.displayName = 'FilterBar.RightContent'
