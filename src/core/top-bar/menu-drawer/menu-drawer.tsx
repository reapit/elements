import { cx } from '@linaria/core'
import { elTopBarMenuDrawer } from './styles'
import { getClosestDialogElement, HTMLDialog, useDialogOpenController } from '#src/utils/dialog'
import { TopBarMenuDrawerHeader } from './header'
import { TopBarMenuDrawerMenuList } from './menu-list'
import { TopBarMenuDrawerSubmenu } from './submenu'

import type { DialogHTMLAttributes, ReactNode } from 'react'

// NOTE: we omit 'open' because we do not want React consumers to use it directly as it results in a
// non-modal experience. Instead, our React `TopBarMenuDrawer` component provides an `isOpen` prop that ensures
// a modal experience is achieved.
type AttributesToOmit = 'open'

export namespace TopBarMenuDrawer {
  export interface HeaderProps extends TopBarMenuDrawerHeader.Props {}
  export interface MenuListProps extends TopBarMenuDrawerMenuList.Props {}
  export interface MenuItemProps extends TopBarMenuDrawerMenuList.ItemProps {}
  export interface MenuItemButtonProps extends TopBarMenuDrawerMenuList.ItemButtonProps {}
  export interface MenuGroupProps extends TopBarMenuDrawerMenuList.GroupProps {}
  export interface MenuGroupSummaryProps extends TopBarMenuDrawerMenuList.GroupSummaryProps {}
  export interface SubmenuProps extends TopBarMenuDrawerSubmenu.Props {}
  export interface SubmenuItemProps extends TopBarMenuDrawerSubmenu.ItemProps {}
  export interface SubmenuItemButtonProps extends TopBarMenuDrawerSubmenu.ItemButtonProps {}

  export interface Props extends Omit<DialogHTMLAttributes<HTMLDialogElement>, AttributesToOmit> {
    /** The menu content */
    children: ReactNode
    /**
     * Specifies the types of user actions that can be used to close the drawer. This property distinguishes
     * three methods by which a drawer can be closed:
     *
     * - A _light dismiss user action_, in which the drawer is closed when the user clicks or taps
     * outside it. This is equivalent to the "light dismiss" behaviour of "auto" state popovers.
     * - A _platform-specific user action_, such as pressing the `Esc` key on desktop platforms, or a "back"
     * or "dismiss" gesture on mobile platforms.
     * - A developer-specified mechanism such as a `<button>` with a `click` handler that invokes
     * `HTMLDialogElement.close()` or a `<form>` submission.
     *
     * Possible values are:
     *
     *  - `any`: The drawer can be closed by clicking on the backdrop, pressing the `Esc` key, or a
     *    developer-specified mechanism. This is useful for lightweight dismissible drawers.
     *  - `closerequest`: The drawer can be dismissed with a platform-specific user action or a
     *    developer-specified mechanism. This is what most drawers should use.
     *  - `none`: The drawer cannot be closed by the user (e.g. via the close button). This is what form drawers
     *    should use.
     *
     * **Note:** Safari does not currently support `closedBy`. `TopBarMenuDrawer` attempts to polyfill its behaviour,
     * but it's not perfect. Namely, "back" or "dismiss" gestures on mobile platforms are not supported.
     */
    closedBy?: 'any' | 'closerequest' | 'none'
    /** Indicates whether the drawer is open or not */
    isOpen?: boolean
  }
}

/**
 * A mobile navigation drawer that slides over the screen from the right side. It is built with the
 * [\<dialog\> element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog) and is always shown using
 * the dialog's [showModal](https://developer.mozilla.org/en-US/docs/Web/API/HTMLDialogElement/showModal) method.
 * This ensures focus is set on the first nested focusable element of the drawer. Further, all content beneath a
 * drawer is made [inert](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/inert) and focus is
 * trapped within the drawer. See the [accessibility](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog#accessibility)
 * section of MDN's `<dialog>` documentation.
 *
 * The drawer is full width on mobile (XS breakpoint) and fixed width on larger screens.
 */
export function TopBarMenuDrawer({
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
  children,
  className,
  closedBy = 'closerequest',
  isOpen: isOpenProp,
  onCancel,
  onClick,
  onClose,
  ...rest
}: TopBarMenuDrawer.Props) {
  // We need to imperatively show or close the dialog element when the `isOpen` prop changes.
  const ref = useDialogOpenController(isOpenProp)

  return (
    <HTMLDialog
      {...rest}
      // NOTE: we do not wire-up aria-labelledby when aria-label is provided. By default, aria-labelledby takes
      // precedence. See https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label#:~:text=aria%2Dlabelledby%20will%20take%20precedence%20over%20aria%2Dlabel%20if%20both%20are%20applied
      aria-label={ariaLabel}
      aria-labelledby={ariaLabel ? undefined : ariaLabelledBy}
      className={cx(elTopBarMenuDrawer, className)}
      closedBy={closedBy}
      ref={ref}
      onCancel={onCancel}
      onClick={onClick}
      onClose={onClose}
    >
      {children}
    </HTMLDialog>
  )
}

TopBarMenuDrawer.getClosestDialogElement = getClosestDialogElement

TopBarMenuDrawer.Header = TopBarMenuDrawerHeader
TopBarMenuDrawer.MenuList = TopBarMenuDrawerMenuList
TopBarMenuDrawer.MenuItem = TopBarMenuDrawerMenuList.Item
TopBarMenuDrawer.MenuItemButton = TopBarMenuDrawerMenuList.ItemButton
TopBarMenuDrawer.MenuGroup = TopBarMenuDrawerMenuList.Group
TopBarMenuDrawer.MenuGroupSummary = TopBarMenuDrawerMenuList.GroupSummary
TopBarMenuDrawer.Submenu = TopBarMenuDrawerSubmenu
TopBarMenuDrawer.SubmenuItem = TopBarMenuDrawerSubmenu.Item
TopBarMenuDrawer.SubmenuItemButton = TopBarMenuDrawerSubmenu.ItemButton

TopBarMenuDrawer.displayName = 'TopBar.MenuDrawer'

export { getClosestDialogElement } from '#src/utils/dialog'
