import { DialogHTMLAttributes, FC, KeyboardEventHandler, ReactNode, useRef } from 'react'

import { useToggleDialogVisibilityEffect } from '../dialog'
import { TopBarMenuItem } from '../top-bar-menu-item'
import { TopBarMenuItemGroup } from '../top-bar-menu-item-group'

import { TopBarMenuHeader } from './top-bar-menu.atoms'
import { ElTopBarMenu, ElTopBarMenuBody, ElTopBarMenuList } from './styles'
import { TopBarMenuProvider } from './top-bar-menu-context'

export interface TopBarMenuProps extends DialogHTMLAttributes<HTMLDialogElement> {
  isOpen: boolean
  /** Content to render inside the menu */
  children: ReactNode
  /** Callback function when the menu is closed */
  onClose?: VoidFunction
}

/**
 * Gets all clickable and focusable items in the menu container
 *
 * This function returns all buttons and links in the menu that are:
 * - Links inside list items within visible lists (aria-hidden="false")
 * - Links inside list items within lists that don't have aria-hidden attribute
 * - All buttons in the container
 *
 * @param container The HTML container element to search within
 * @returns A NodeList of clickable HTMLElements
 */
export const getTopBarMenuClickableItems = (container: HTMLElement): NodeListOf<HTMLElement> => {
  return container?.querySelectorAll(
    'ul:not([aria-hidden="true"]):not([aria-hidden="false"]) > li > a, ul[aria-hidden="false"] > li > a, button',
  ) as NodeListOf<HTMLElement>
}

/**
 * TopBarMenu is a side panel navigation component.
 *
 * It's designed to be used in mobile and desktop layouts and provides
 * a structured way to display navigation items.
 */
type TopBarMenuFC = FC<TopBarMenuProps> & {
  /** The header section of the menu with close button */
  Header: typeof TopBarMenuHeader
  /** The body container for menu content */
  Body: typeof ElTopBarMenuBody
  /** A grouping of menu items */
  List: typeof ElTopBarMenuList
  /** A collapsible group of menu items */
  Group: typeof TopBarMenuItemGroup
  /** An individual menu item (link or button) */
  Item: typeof TopBarMenuItem
}

const TopBarMenu: TopBarMenuFC = ({ children, isOpen, onClose, ...rest }) => {
  const ref = useRef<HTMLDialogElement>(null)

  useToggleDialogVisibilityEffect({ isOpen, ref, onClose })

  const handleOnKeyDown: KeyboardEventHandler<HTMLDialogElement> = (e) => {
    const container = e.currentTarget

    /**
     * NOTE:  handle the keyboard navigation for the mobile nav menu
     *
     * This will collect all the clickable items in the mobile nav menu, and
     * will handle the keyboard navigation for the mobile nav menu
     */
    const clickableItems = getTopBarMenuClickableItems(container)

    let currentIndex = -1
    clickableItems.forEach((item, index) => {
      if (item === document.activeElement) {
        currentIndex = index
      }
    })

    switch (e.key) {
      case 'ArrowDown': {
        e.preventDefault()
        const nextItem = clickableItems[(currentIndex + 1) % clickableItems.length]
        nextItem.focus()
        break
      }
      case 'ArrowUp': {
        e.preventDefault()
        const prevItem = clickableItems[(currentIndex - 1 + clickableItems.length) % clickableItems.length]
        prevItem.focus()
        break
      }
      case 'ArrowRight':
      case 'ArrowLeft': {
        e.preventDefault()
        const currentItem = clickableItems[currentIndex]
        if (!currentItem.hasAttribute('aria-expanded')) break

        if (e.key === 'ArrowRight' && currentItem.getAttribute('aria-expanded') === 'true') break
        else if (e.key === 'ArrowLeft' && currentItem.getAttribute('aria-expanded') === 'false') break

        currentItem.click()
        break
      }
      case 'Enter':
      case ' ': {
        e.preventDefault()
        const currentItem = clickableItems[currentIndex]
        currentItem.click()
        break
      }
    }

    rest?.onKeyDown?.(e)
  }

  return (
    <TopBarMenuProvider onClose={onClose}>
      <ElTopBarMenu ref={ref} {...rest} onKeyDown={handleOnKeyDown}>
        {children}
      </ElTopBarMenu>
    </TopBarMenuProvider>
  )
}

TopBarMenu.Header = TopBarMenuHeader
TopBarMenu.Body = ElTopBarMenuBody
TopBarMenu.List = ElTopBarMenuList
TopBarMenu.Group = TopBarMenuItemGroup
TopBarMenu.Item = TopBarMenuItem

export { TopBarMenu }
