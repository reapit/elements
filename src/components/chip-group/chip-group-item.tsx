import { ElChipGroupListItem } from './styles'
import { Chip } from '../chip/chip'

import type { ComponentProps } from 'react'

interface ChipGroupItemProps extends ComponentProps<typeof Chip> {}

/**
 * A thin wrapper around a chip to ensure it is rendered as a list item inside the chip group.
 */
export function ChipGroupItem(props: ChipGroupItemProps) {
  return (
    <ElChipGroupListItem>
      <Chip {...props} />
    </ElChipGroupListItem>
  )
}
