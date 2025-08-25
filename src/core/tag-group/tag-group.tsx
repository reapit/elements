import { ElTagGroupList } from './styles'
import { TagGroupItem } from './tag-group-item'

import type { HTMLAttributes, ReactNode } from 'react'

interface TagGroupProps extends HTMLAttributes<HTMLUListElement> {
  /** The tag group items. */
  children: ReactNode
  /** Whether the tag group should wrap or not. */
  flow?: 'wrap' | 'nowrap'
  /** What overflow behaviour the tag group should exhibit. */
  overflow?: 'auto' | 'visible'
}

/**
 * Groups multiple tags together. A tag group should have at least one tag.
 */
export function TagGroup({ children, flow = 'wrap', overflow = 'visible', ...rest }: TagGroupProps) {
  return (
    <ElTagGroupList {...rest} data-flow={flow} data-overflow={overflow}>
      {children}
    </ElTagGroupList>
  )
}

TagGroup.Item = TagGroupItem
