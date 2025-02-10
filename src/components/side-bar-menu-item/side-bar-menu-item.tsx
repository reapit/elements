import type { AnchorHTMLAttributes, ReactNode } from 'react'
import { ElSideBarMenuItemAnchor, ElSideBarMenuItemIcon, ElSideBarMenuItemText } from './styles'

export interface SideBarMenuItemProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children?: ReactNode
  /**
   * Whether the page represented by this link is currently active.
   *
   * @example
   * <SideBarMenuItem isActive>This is active page link</SideBarMenuItem>
   *
   * @default false
   */
  isActive?: boolean
  icon: ReactNode
}

const SideBarMenuItem: React.FC<SideBarMenuItemProps> = ({ icon, isActive, children, ...props }) => {
  return (
    <li>
      <ElSideBarMenuItemAnchor aria-current={isActive ? 'page' : undefined} {...props}>
        <ElSideBarMenuItemIcon>{icon}</ElSideBarMenuItemIcon>
        <ElSideBarMenuItemText>{children}</ElSideBarMenuItemText>
      </ElSideBarMenuItemAnchor>
    </li>
  )
}

export { SideBarMenuItem }
