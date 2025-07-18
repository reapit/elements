import { ElTagGroupList } from './styles'
import { TagGroupItem } from './tag-group-item'

import type { HTMLAttributes, ReactNode } from 'react'

interface TagGroupProps extends HTMLAttributes<HTMLUListElement> {
  children: ReactNode
}

/**
 * Groups multiple tags together. A tag group should have at least one tag.
 */
export function TagGroup({ children, ...rest }: TagGroupProps) {
  return <ElTagGroupList {...rest}>{children}</ElTagGroupList>
}

TagGroup.Item = TagGroupItem
