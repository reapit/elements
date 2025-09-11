import { ChipGroupItem } from './chip-group-item'
import { ElChipGroupList } from './styles'

import type { HTMLAttributes, ReactNode } from 'react'

export namespace ChipGroup {
  export interface Props extends HTMLAttributes<HTMLUListElement> {
    /** The chip group items. */
    children: ReactNode
    /** Whether the chip group should wrap or not. */
    flow?: 'wrap' | 'nowrap'
    /** What overflow behaviour the chip group should exhibit. */
    overflow?: 'auto' | 'visible'
  }
}

/**
 * Groups multiple chips together. Should only be used to group chips of the same variant. By default,
 * chips will wrap within the group, though horizontal scrolling can be permitted when required.
 */
export function ChipGroup({ children, flow = 'wrap', overflow = 'visible', ...rest }: ChipGroup.Props) {
  return (
    <ElChipGroupList {...rest} data-flow={flow} data-overflow={overflow}>
      {children}
    </ElChipGroupList>
  )
}

ChipGroup.Item = ChipGroupItem
