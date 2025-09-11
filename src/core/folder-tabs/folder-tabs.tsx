import { ElFolderTabs, ElFolderTabsGroup } from './styles'
import { FolderTab } from './tab'
import { FolderTabCountLabel } from './count-label'

import type { HTMLAttributes, ReactNode } from 'react'

export namespace FolderTabs {
  export interface Props extends HTMLAttributes<HTMLElement> {
    /** The tab items for primary navigation. Typically a collection of `FolderTabs.Item` components. */
    children: ReactNode
  }
}

/**
 * A navigation container for primary tabs. Typically used with `FolderTabs.Item`
 * and `FolderTabs.CountLabel`.
 */
export function FolderTabs({ children, ...rest }: FolderTabs.Props) {
  return (
    <ElFolderTabs {...rest}>
      <ElFolderTabsGroup role="group">{children}</ElFolderTabsGroup>
    </ElFolderTabs>
  )
}

FolderTabs.Item = FolderTab
FolderTabs.CountLabel = FolderTabCountLabel
