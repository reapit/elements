import { ElTagGroupListItem } from './styles'
import { Tag } from '#src/core/tag'

import type { ComponentProps } from 'react'

export namespace TagGroupItem {
  export interface Props extends ComponentProps<typeof Tag> {}
}

/**
 * A thin wrapper around a tag to ensure it is rendered as a list item inside the tag group.
 */
export function TagGroupItem(props: TagGroupItem.Props) {
  return (
    <ElTagGroupListItem>
      <Tag {...props} />
    </ElTagGroupListItem>
  )
}

TagGroupItem.displayName = 'TagGroup.Item'
