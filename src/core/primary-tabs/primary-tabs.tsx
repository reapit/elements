import { ElPrimaryTabs, ElPrimaryTabsList } from './styles'
import { PrimaryTabsItem } from './primary-tabs-item'

import type { HTMLAttributes, ReactNode } from 'react'

export namespace PrimaryTabs {
  export interface Props extends HTMLAttributes<HTMLElement> {
    /**
     * The tab items for primary navigation. Typically a collection of `PrimaryTabs.Item` components.
     */
    children: ReactNode
    /**
     * Ideally, overflow is avoided as much as possible. When it can't be avoided (e.g. small screens),
     * use horizontal scrolling by providing `overflow="scroll"`. By default, overflow will be visible
     * without scrolling.
     */
    overflow?: 'scroll' | 'visible'
  }
}

/**
 * A navigation container for primary tabs. Typically used with `PrimaryTabs.Item`.
 */
export function PrimaryTabs({ children, overflow = 'visible', ...rest }: PrimaryTabs.Props) {
  return (
    <ElPrimaryTabs data-overflow={overflow} {...rest}>
      <ElPrimaryTabsList>{children}</ElPrimaryTabsList>
    </ElPrimaryTabs>
  )
}

PrimaryTabs.Item = PrimaryTabsItem
