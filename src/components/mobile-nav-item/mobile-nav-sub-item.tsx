import type { FC } from 'react'

import { MobileNavSubItemProps } from './types'
import { ElMobileNavItemAnchor, ElMobileNavItemBadge, ElMobileNavItemContent, ElMobileNavItemListItem } from './styles'

export const MobileNavSubItem: FC<MobileNavSubItemProps> = ({ href, isActive, label, hasBadge }) => {
  return (
    <ElMobileNavItemListItem role="none">
      <ElMobileNavItemAnchor href={href} aria-current={isActive ? 'page' : undefined} role="menuitem">
        <ElMobileNavItemContent>
          {label}
          {hasBadge && <ElMobileNavItemBadge />}
        </ElMobileNavItemContent>
      </ElMobileNavItemAnchor>
    </ElMobileNavItemListItem>
  )
}
