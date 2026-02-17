import { areInvokerCommandsSupported } from './are-invoker-commands-supported'
import { MenuAltIcon } from '#src/icons/menu-alt'
import { TopBarMenuDrawer } from '../menu-drawer'
import { TopBarSecondaryNavListItemButton } from '../secondary-nav'
import { MouseEventHandler, useCallback, useId, useMemo, useState } from 'react'

import type { ButtonHTMLAttributes, ReactEventHandler } from 'react'

export namespace TopBarMenu {
  export interface ContentProps extends TopBarMenuDrawer.ContentProps {}
  export interface MainNavProps extends TopBarMenuDrawer.MainNavProps {}
  export interface SecondaryNavProps extends TopBarMenuDrawer.SecondaryNavProps {}
  export interface ProfileNavProps extends TopBarMenuDrawer.ProfileNavProps {}
  export interface MenuListProps extends TopBarMenuDrawer.MenuListProps {}
  export interface MenuItemProps extends TopBarMenuDrawer.MenuItemProps {}
  export interface MenuItemButtonProps extends TopBarMenuDrawer.MenuItemButtonProps {}
  export interface MenuGroupProps extends TopBarMenuDrawer.MenuGroupProps {}
  export interface MenuGroupSummaryProps extends TopBarMenuDrawer.MenuGroupSummaryProps {}
  export interface SubmenuProps extends TopBarMenuDrawer.SubmenuProps {}
  export interface SubmenuItemProps extends TopBarMenuDrawer.SubmenuItemProps {}
  export interface SubmenuItemButtonProps extends TopBarMenuDrawer.SubmenuItemButtonProps {}

  export interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    onClose?: TopBarMenuDrawer.Props['onClose']
  }
}

/**
 * Convenience component that combines a `TopBar.MenuDrawer` with a `TopBar.NavIconItemButton`.
 *
 * Has a number of subcomponents:
 * - **Main navigation:** [TopBar.MenuMainNav](/docs/core-topbar-menudrawer-menulist--docs)
 * - **Secondary navigation:** [TopBar.MenuSecondaryNav](/docs/core-topbar-menudrawer-menulist--docs)
 * - **Profile navigation:** [TopBar.MenuProfileNav](/docs/core-topbar-menudrawer-menulist--docs)
 * - **Navigation items:** [TopBar.MenuItem](/docs/core-topbar-menudrawer-menuitem--docs),
 *   [TopBar.MenuItemButton](/docs/core-topbar-menudrawer-menuitembutton--docs),
 *   [TopBar.MenuGroup](/docs/core-topbar-menudrawer-menugroup--docs),
 *   [TopBar.MenuSubmenu](/docs/core-topbar-menudrawer-submenu--docs),
 *   [TopBar.MenuSubmenuItem](/docs/core-topbar-menudrawer-submenuitem--docs)
 */
export function TopBarMenu({
  'aria-label': ariaLabel = 'Menu',
  children,
  id,
  onClick,
  onClose,
  ...rest
}: TopBarMenu.Props) {
  const fallbackButtonId = useId()
  const menuId = useId()
  const buttonId = id || fallbackButtonId

  const canUseInvokerCommands = useMemo(() => areInvokerCommandsSupported(), [])

  // NOTE: this local state is only used if invoker commands are not supported.
  const [isOpenFallback, setIsOpenFallback] = useState(false)

  const handleClick = useCallback<MouseEventHandler<HTMLButtonElement>>(
    (event) => {
      if (!canUseInvokerCommands) {
        setIsOpenFallback(true)
      }
      onClick?.(event)
    },
    [onClick],
  )

  const handleClose = useCallback<ReactEventHandler<HTMLDialogElement>>(
    (event) => {
      if (!canUseInvokerCommands) {
        setIsOpenFallback(false)
      }
      onClose?.(event)
    },
    [onClose],
  )

  return (
    <>
      <TopBarSecondaryNavListItemButton
        {...rest}
        aria-label={ariaLabel}
        icon={<MenuAltIcon />}
        id={buttonId}
        onClick={handleClick}
        // @ts-expect-error -- React 18 does not have types for Invoker Command API attributes.
        command="show-modal"
        commandfor={menuId}
      />
      <TopBarMenuDrawer
        aria-labelledby={buttonId}
        id={menuId}
        isOpen={canUseInvokerCommands ? undefined : isOpenFallback}
        onClose={handleClose}
      >
        <TopBarMenuDrawer.Header />
        {children}
      </TopBarMenuDrawer>
    </>
  )
}

TopBarMenu.getClosestDialogElement = TopBarMenuDrawer.getClosestDialogElement
TopBarMenu.Content = TopBarMenuDrawer.Content
TopBarMenu.MainNav = TopBarMenuDrawer.MainNav
TopBarMenu.SecondaryNav = TopBarMenuDrawer.SecondaryNav
TopBarMenu.ProfileNav = TopBarMenuDrawer.ProfileNav
TopBarMenu.MenuList = TopBarMenuDrawer.MenuList
TopBarMenu.MenuItem = TopBarMenuDrawer.MenuList.Item
TopBarMenu.MenuItemButton = TopBarMenuDrawer.MenuList.ItemButton
TopBarMenu.MenuGroup = TopBarMenuDrawer.MenuList.Group
TopBarMenu.MenuGroupSummary = TopBarMenuDrawer.MenuList.GroupSummary
TopBarMenu.Submenu = TopBarMenuDrawer.Submenu
TopBarMenu.SubmenuItem = TopBarMenuDrawer.Submenu.Item
TopBarMenu.SubmenuItemButton = TopBarMenuDrawer.Submenu.ItemButton

TopBarMenu.displayName = 'TopBar.Menu'
