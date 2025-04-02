import { useId, type FC, type HTMLAttributes, type ReactNode } from 'react'
import {
  SideBarMenuGroupContainer,
  SideBarMenuGroupItemTrigger,
  SideBarMenuGroupList,
} from './side-bar-menu-group.molecules'
import { ElSideBarMenuGroupItem, elSideBarMenuGroupItemAnchor, ElSideBarMenuGroupListItem } from './styles'

export interface SideBarMenuGroupItemProps extends HTMLAttributes<HTMLLIElement> {
  children?: ReactNode
  href?: string
  /**
   * Whether the page represented by this link is currently active.
   *
   * @default false
   */
  isActive?: boolean
}

export const SideBarMenuGroupItem: FC<SideBarMenuGroupItemProps> = ({ children, isActive, href, ...props }) => {
  return (
    <ElSideBarMenuGroupListItem {...props}>
      <ElSideBarMenuGroupItem
        className={elSideBarMenuGroupItemAnchor}
        aria-current={isActive ? 'page' : undefined}
        href={href}
      >
        {children}
      </ElSideBarMenuGroupItem>
    </ElSideBarMenuGroupListItem>
  )
}

export interface SideBarMenuGroupProps extends HTMLAttributes<HTMLLIElement> {
  children?: ReactNode
  /**
   * Whether the page represented by this group contain active link.
   *
   * @default false
   */
  isActive?: boolean
  icon: ReactNode
  label: string
}

export const SideBarMenuGroup: FC<SideBarMenuGroupProps> = ({ label, icon, isActive, children, ...props }) => {
  const groupId = useId()
  return (
    <SideBarMenuGroupContainer isActive={isActive} {...props}>
      <SideBarMenuGroupItemTrigger aria-controls={groupId} isActive={isActive} icon={icon}>
        {label}
      </SideBarMenuGroupItemTrigger>
      <SideBarMenuGroupList id={groupId}>{children}</SideBarMenuGroupList>
    </SideBarMenuGroupContainer>
  )
}
