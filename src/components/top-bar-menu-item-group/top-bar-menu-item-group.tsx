import { useId, type FC, type HTMLAttributes, type ReactNode } from 'react'

import { ElTopBarMenuItemBadge } from '../top-bar-menu-item'
import { Icon } from '../icon'

import { useTopBarMenuItemGroupState } from './use-top-bar-menu-item-group-state'
import {
  ElTopBarMenuItemGroupButton,
  ElTopBarMenuItemGroupContent,
  ElTopBarMenuItemGroupList,
  ElTopBarMenuItemGroupListItem,
} from './styles'

export interface TopBarMenuItemGroupProps extends HTMLAttributes<HTMLButtonElement> {
  label: string
  isActive?: boolean
  hasBadge?: boolean
  children: ReactNode
}

export const TopBarMenuItemGroup: FC<TopBarMenuItemGroupProps> = (props) => {
  const { isActive, label, hasBadge, children, 'aria-label': ariaLabel, ...rest } = props ?? {}
  const [isExpanded, setIsExpanded] = useTopBarMenuItemGroupState(Boolean(isActive))
  const panelId = useId()

  const handleToggle = () => setIsExpanded((prev) => !prev)

  return (
    <ElTopBarMenuItemGroupListItem data-is-expanded={isExpanded}>
      <ElTopBarMenuItemGroupButton
        {...rest}
        type="button"
        aria-expanded={isExpanded}
        aria-label={ariaLabel ?? label}
        aria-controls={panelId}
        onClick={handleToggle}
      >
        <ElTopBarMenuItemGroupContent>
          {label}
          {hasBadge && <ElTopBarMenuItemBadge />}
        </ElTopBarMenuItemGroupContent>

        <Icon icon={isExpanded ? 'chevronUp' : 'chevronDown'} fontSize="16px" />
      </ElTopBarMenuItemGroupButton>

      <ElTopBarMenuItemGroupList id={panelId} aria-hidden={!isExpanded}>
        {children}
      </ElTopBarMenuItemGroupList>
    </ElTopBarMenuItemGroupListItem>
  )
}
