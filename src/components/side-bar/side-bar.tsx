import { ElSideBar, ElSideBarContents, ElSideBarFooter } from './styles'
import { SideBarCollapseButton } from './collapse-button'
import { SideBarMenuList } from './menu-list'
import { SideBarMenuGroupSummary } from './menu-group'
import { SideBarSubmenu } from './submenu'
import { SideBarContextPublisher } from './side-bar-context'
import { useId } from 'react'
import { useSideBar } from './use-side-bar'
import { useSideBarKeyboardNavigation } from './use-keyboard-navigation'

import type { ComponentProps, ReactNode } from 'react'

interface SideBarProps extends Omit<ComponentProps<typeof ElSideBar>, 'data-state'> {
  children: ReactNode
  footer: ReactNode
}

export function SideBar({ children, footer, id, ...props }: SideBarProps) {
  const sideBarId = id ?? useId()
  const sideBar = useSideBar()

  const handleKeyboardNavigation = useSideBarKeyboardNavigation()

  return (
    <ElSideBar {...props} aria-label="Sidebar Navigation" data-state={sideBar.state} id={sideBarId}>
      <SideBarContextPublisher id={sideBarId} {...sideBar}>
        <ElSideBarContents onClick={sideBar.expand} onKeyDown={handleKeyboardNavigation}>
          {children}
        </ElSideBarContents>
        <ElSideBarFooter>{footer}</ElSideBarFooter>
      </SideBarContextPublisher>
    </ElSideBar>
  )
}

SideBar.CollapseButton = SideBarCollapseButton
SideBar.MenuList = SideBarMenuList
SideBar.MenuItem = SideBarMenuList.Item
SideBar.MenuGroup = SideBarMenuList.Group
SideBar.MenuGroupSummary = SideBarMenuGroupSummary
SideBar.Submenu = SideBarSubmenu
SideBar.SubmenuItem = SideBarSubmenu.Item
