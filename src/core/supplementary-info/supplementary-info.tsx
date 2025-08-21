import { ElSupplementaryInfoList } from './styles'
import { SupplementaryInfoItem } from './supplementary-info-item'

import type { HTMLAttributes, ReactNode } from 'react'
import type { SupplementaryInfoColour } from './supplementary-info-item'

interface SupplementaryInfoProps extends HTMLAttributes<HTMLUListElement> {
  /** The supplementary info items. Typically one or more `SupplementaryInfo.Item`'s. */
  children: ReactNode
  /**
   * Text colour of the items. By default, all items will inherit this colour. The colour
   * of individual items can still be overridden.
   */
  colour?: SupplementaryInfoColour
  /** The text size for all supplementary info items. */
  size?: 'base' | 'sm' | 'xs'
}

/**
 * A list of supplementary information items, typically used to display metadata or status information.
 * See also [SupplementaryInfo.Item](?path=/docs/core-supplementaryinfo-item--docs).
 */
export function SupplementaryInfo({ children, colour = 'inherit', size = 'base', ...rest }: SupplementaryInfoProps) {
  return (
    <ElSupplementaryInfoList {...rest} data-colour={colour} data-size={size}>
      {children}
    </ElSupplementaryInfoList>
  )
}

SupplementaryInfo.Item = SupplementaryInfoItem
