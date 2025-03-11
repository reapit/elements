import type { AnchorHTMLAttributes, FC, HTMLAttributes, ReactNode } from 'react'
import {
  SideBarMenuGroupContainer,
  SideBarMenuGroupItemTrigger,
  SideBarMenuGroupList,
} from './side-bar-menu-group.molecules'
import { elSideBarMenuGroupItemAnchor, ElSideBarMenuGroupItem, ElSideBarMenuGroupListItem } from './styles'

export interface SideBarMenuGroupItemProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'onClick'> {
  children?: ReactNode
  /**
   * Whether the page represented by this link is currently active.
   *
   * @default false
   */
  isActive?: boolean
}

export const SideBarMenuGroupItem: FC<SideBarMenuGroupItemProps> = ({ children, isActive, ...props }) => {
  return (
    <ElSideBarMenuGroupListItem>
      <ElSideBarMenuGroupItem
        className={elSideBarMenuGroupItemAnchor}
        aria-current={isActive ? 'page' : undefined}
        {...props}
      >
        {children}
      </ElSideBarMenuGroupItem>
    </ElSideBarMenuGroupListItem>
  )
}

export interface SideBarMenuGroupProps extends Omit<HTMLAttributes<HTMLButtonElement>, 'onClick'> {
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

export const SideBarMenuGroup: FC<SideBarMenuGroupProps> = ({ label, icon, isActive, children }) => {
  return (
    <SideBarMenuGroupContainer isActive={isActive}>
      <SideBarMenuGroupItemTrigger isActive={isActive} icon={icon}>
        {label}
      </SideBarMenuGroupItemTrigger>
      <SideBarMenuGroupList>{children}</SideBarMenuGroupList>
    </SideBarMenuGroupContainer>
  )
}
