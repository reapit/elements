import { elTopBarMenuDrawerMenuItem } from '../menu-item'
import { elTopBarMenuDrawerSubmenuItem } from '../submenu-item'
import { handleArrowNavigation as baseHandleArrowNavigation } from '#src/utils/keyboard-navigation'

import type { KeyboardEvent } from 'react'

// We select:
// - `.el-top-bar-menu-drawer-menu-item` elements. These include top-level menu items, as well as
//   menu group summary elements;
// - `details[open] .el-top-bar-menu-drawer-submenu-item` elements. These include the submenu items
//   open menu groups only. We want to ignore submenu items in closed groups.
const selectors = `.${elTopBarMenuDrawerMenuItem}, details[open] .${elTopBarMenuDrawerSubmenuItem}`

/**
 * Handles arrow key down events in order to move focus between items in a list. Items that are focused are
 * also scrolled into view. Focus will not be moved beyond the first or last items in the list.
 */
export function handleArrowNavigation(event: KeyboardEvent<HTMLElement>) {
  baseHandleArrowNavigation(event, { selectors })
}
