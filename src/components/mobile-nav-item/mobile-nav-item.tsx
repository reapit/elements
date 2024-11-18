import { useState } from 'react'
import type { FC } from 'react'

import { useId } from '../../storybook/random-id'

import { Icon } from '../icon'

import { MobileNavItemExpandableProps, MobileNavItemSimpleProps, MobileNavSubItemProps } from './types'
import {
  ElMobileNavItemAnchor,
  ElMobileNavItemBadge,
  ElMobileNavItemContent,
  ElMobileNavItemExpanderButton,
  ElMobileNavItemListItem,
  ElMobileNavItemUnorderedList,
  ElMobileNavSubItemUnorderedList,
} from './styles'
import { MobileNavSubItem } from './mobile-nav-sub-item'

export type MobileNavItemProps = MobileNavItemSimpleProps | MobileNavItemExpandableProps

const isExpandableVariant = (props: MobileNavItemProps): props is MobileNavItemExpandableProps => {
  return 'children' in props
}

type MobileNavItemFC = FC<MobileNavItemProps> & {
  SubItem: FC<MobileNavSubItemProps>
}

const MobileNavItem: MobileNavItemFC = (props) => {
  const [isExpanded, setIsExpanded] = useState(Boolean(props?.isDefaultExpanded))
  const panelId = useId()

  if (isExpandableVariant(props)) {
    const { isActive, label, hasBadge, children } = props ?? {}

    return (
      <ElMobileNavItemUnorderedList data-is-expanded={isExpanded} role="menubar" aria-label={label}>
        <ElMobileNavItemListItem role="none">
          <ElMobileNavItemExpanderButton
            type="button"
            role="menuitem"
            aria-expanded={isExpanded ?? isActive}
            aria-current={isActive ? 'true' : undefined}
            aria-controls={panelId}
            onClick={() => setIsExpanded((prev) => !prev)}
          >
            <ElMobileNavItemContent>
              {label}
              {hasBadge && <ElMobileNavItemBadge />}
            </ElMobileNavItemContent>

            <Icon icon={isExpanded ? 'chevronUp' : 'chevronDown'} fontSize="16px" />
          </ElMobileNavItemExpanderButton>

          <ElMobileNavSubItemUnorderedList id={panelId} aria-hidden={!isExpanded} role="menu">
            {children}
          </ElMobileNavSubItemUnorderedList>
        </ElMobileNavItemListItem>
      </ElMobileNavItemUnorderedList>
    )
  } else {
    const { href, isActive, label, hasBadge } = props ?? {}

    return (
      <ElMobileNavItemUnorderedList role="menubar" aria-label={label}>
        <ElMobileNavItemListItem role="none">
          <ElMobileNavItemAnchor href={href} aria-current={isActive ? 'page' : undefined} role="menuitem">
            <ElMobileNavItemContent>
              {label}
              {hasBadge && <ElMobileNavItemBadge />}
            </ElMobileNavItemContent>
          </ElMobileNavItemAnchor>
        </ElMobileNavItemListItem>
      </ElMobileNavItemUnorderedList>
    )
  }
}

MobileNavItem.SubItem = MobileNavSubItem

export { MobileNavItem }
