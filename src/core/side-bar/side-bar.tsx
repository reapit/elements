import { determineSideBarStateFromViewport, useSideBarMatchMediaEffect } from './use-side-bar-match-media-effect'
import { ElSideBar, ElSideBarBody, ElSideBarFooter } from './styles'
import { SideBarCollapseButton } from './collapse-button'
import { SideBarMenuList } from './menu-list'
import { SideBarContextPublisher } from './side-bar-context'
import { useId } from 'react'
import { useSideBar } from './use-side-bar'
import { useSideBarController } from './use-side-bar-controller'
import { useSideBarKeyboardNavigation } from './use-keyboard-navigation'

import type { ComponentProps, ReactNode } from 'react'

interface SideBarProps extends Omit<ComponentProps<typeof ElSideBar>, 'data-state'> {
  /**
   * The side bar's menu items. Typically a `SideBar.MenuList` with `SideBar.MenuItem` and
   * `SideBar.MenuGroup` components.
   */
  children: ReactNode
  /**
   * The side bar's footer. Should typically be a `SideBar.CollapseButton` component.
   */
  footer: ReactNode
  /**
   * The width of the side bar.
   */
  width?: `--size-${string}`
}

/**
 * Collapsible navigation component for products with too many navigation items to fit in the TopBar's main nav.
 */
export function SideBar({
  'aria-label': ariaLabel,
  children,
  footer,
  id,
  width = '--size-64',
  ...props
}: SideBarProps) {
  const sideBarId = id ?? useId()
  const sideBar = useSideBar(() => determineSideBarStateFromViewport())
  const handleKeyboardNavigation = useSideBarKeyboardNavigation()
  const ref = useSideBarController(sideBar.state)

  useSideBarMatchMediaEffect(sideBar)

  return (
    <ElSideBar
      {...props}
      aria-label={ariaLabel ?? 'Sidebar navigation'}
      data-state={sideBar.state}
      id={sideBarId}
      style={{ '--side-bar-width': `var(${width})` }}
    >
      <SideBarContextPublisher id={sideBarId} {...sideBar}>
        <ElSideBarBody ref={ref} onClick={sideBar.expand} onKeyDown={handleKeyboardNavigation}>
          {children}
        </ElSideBarBody>
        <ElSideBarFooter>{footer}</ElSideBarFooter>
      </SideBarContextPublisher>
    </ElSideBar>
  )
}

SideBar.CollapseButton = SideBarCollapseButton
SideBar.MenuList = SideBarMenuList
SideBar.MenuItem = SideBarMenuList.Item
SideBar.MenuGroup = SideBarMenuList.Group
SideBar.MenuGroupSummary = SideBarMenuList.GroupSummary
SideBar.Submenu = SideBarMenuList.Submenu
SideBar.SubmenuItem = SideBarMenuList.SubmenuItem
