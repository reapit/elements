import type { AnchorHTMLAttributes, ReactNode } from 'react'
import { ElSideBarMenuItem, ElSideBarMenuItemIcon, ElSideBarMenuItemText, elSideBarMenuItemAnchor } from './styles'
import { useIsSideBarExpandedContext } from '../side-bar'

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
  href: string
}

const SideBarMenuItem: React.FC<SideBarMenuItemProps> = ({ icon, isActive, children, ...props }) => {
  const { isExpanded } = useIsSideBarExpandedContext()
  return (
    <li>
      <ElSideBarMenuItem className={elSideBarMenuItemAnchor} aria-current={isActive ? 'page' : undefined} {...props}>
        <ElSideBarMenuItemIcon>{icon}</ElSideBarMenuItemIcon>
        {isExpanded && <ElSideBarMenuItemText>{children}</ElSideBarMenuItemText>}
      </ElSideBarMenuItem>
    </li>
  )
}

export { SideBarMenuItem }
