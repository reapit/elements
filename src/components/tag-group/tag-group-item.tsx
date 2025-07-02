import { ElTagGroupListItem } from './styles'
import { Tag } from '../tag/tag'

import type { ComponentProps } from 'react'

type TagGroupItemProps = ComponentProps<typeof Tag>

/**
 * A thin wrapper around a tag to ensure it is rendered as a list item inside the tag group.
 */
export function TagGroupItem(props: TagGroupItemProps) {
  return (
    <ElTagGroupListItem>
      <Tag {...props} />
    </ElTagGroupListItem>
  )
}
