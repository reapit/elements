import { ElFilterBarLeftContent } from './styles'
import type { HTMLAttributes, ReactNode } from 'react'

export namespace FilterBarLeftContent {
  export interface Props extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode
  }
}

/** @deprecated Use FilterBarLeftContent.Props instead */
export type FilterBarLeftContentProps = FilterBarLeftContent.Props

/**
 * The left content of a filter bar. Will typically contain a search input and/or some actions.
 */
export function FilterBarLeftContent(props: FilterBarLeftContent.Props) {
  return <ElFilterBarLeftContent {...props} />
}
