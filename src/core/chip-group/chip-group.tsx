import { ElChipGroup, ElChipGroupList } from './styles'
import { ChipGroupItem } from './chip-group-item'

import type { HTMLAttributes, ReactNode } from 'react'

interface ChipGroupProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  overflow?: 'scroll' | 'wrap'
}

/**
 * Groups multiple chips together. Should only be used to group chips of the same variant. By default,
 * chips will wrap within the group, though horizontal scrolling can be permitted when required.
 */
export function ChipGroup({ children, overflow = 'wrap', ...rest }: ChipGroupProps) {
  return (
    <ElChipGroup {...rest}>
      <ElChipGroupList data-overflow={overflow}>{children}</ElChipGroupList>
    </ElChipGroup>
  )
}

ChipGroup.Item = ChipGroupItem
