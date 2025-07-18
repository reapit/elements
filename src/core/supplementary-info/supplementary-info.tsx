import { ElSupplementaryInfoList } from './styles'
import { SupplementaryInfoItem } from './supplementary-info-item'

import type { HTMLAttributes, ReactNode } from 'react'

interface SupplementaryInfoProps extends HTMLAttributes<HTMLUListElement> {
  /** The supplementary info items. Typically one or more `SupplementaryInfo.Item`'s. */
  children: ReactNode
  /** The text size for all supplementary info items. */
  size?: 'base' | 'sm' | 'xs'
}

/**
 * A list of supplementary information items, typically used to display metadata or status information.
 * See also [SupplementaryInfo.Item](/docs/core-supplementaryinfo-item--docs).
 */
export function SupplementaryInfo({ children, size = 'base', ...rest }: SupplementaryInfoProps) {
  return (
    <ElSupplementaryInfoList {...rest} data-size={size}>
      {children}
    </ElSupplementaryInfoList>
  )
}

SupplementaryInfo.Item = SupplementaryInfoItem
