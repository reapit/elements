import { ElChipGroupListItem } from './styles'
import { Chip } from '../chip/chip'

import type { ComponentProps } from 'react'

export namespace ChipGroupItem {
  export interface Props extends ComponentProps<typeof Chip> {}
}

/**
 * A thin wrapper around a chip to ensure it is rendered as a list item inside the chip group.
 */
export function ChipGroupItem(props: ChipGroupItem.Props) {
  return (
    <ElChipGroupListItem>
      <Chip {...props} />
    </ElChipGroupListItem>
  )
}

ChipGroupItem.displayName = 'ChipGroup.Item'
