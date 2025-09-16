import { ElPageHeaderSupplementaryInfo } from './styles'

import type { HTMLAttributes, ReactNode } from 'react'

export namespace PageHeaderSupplementaryInfo {
  export interface Props extends HTMLAttributes<HTMLDivElement> {
    /**
     * The supplementary info to display. Will typically be some combination of `SupplementaryInfo`, `Features` and
     * `CompactSelectNative`.
     */
    children: ReactNode
  }
}

/**
 * Allows for supplementary info to be displayed in the page header. Used to display supplementary info, features and,
 * sometimes, compact selects. Typically used via `PageHeader.SupplementaryInfo`.
 */
export function PageHeaderSupplementaryInfo({ children, ...rest }: PageHeaderSupplementaryInfo.Props) {
  return <ElPageHeaderSupplementaryInfo {...rest}>{children}</ElPageHeaderSupplementaryInfo>
}

PageHeaderSupplementaryInfo.displayName = 'PageHeader.SupplementaryInfo'
