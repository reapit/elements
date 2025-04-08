import { FC, HTMLAttributes, KeyboardEventHandler, ReactNode, useRef } from 'react'
import { MobileNavItem } from '../mobile-nav-item'
import { MobileNavMenuHeader } from './mobile-nav-menu.atoms'
import { ElMobileNavMenu, ElMobileNavMenuContent, ElMobileNavMenuItemGroup } from './styles'
import { useToggleDialogVisibilityEffect } from '../dialog'

export interface MobileNavMenuProps extends HTMLAttributes<HTMLDialogElement> {
  isOpen: boolean
  children: ReactNode
  onClose?: VoidFunction
}

export type MobileNavMenuFC = FC<MobileNavMenuProps> & {
  ItemGroup: typeof ElMobileNavMenuItemGroup
  Item: typeof MobileNavItem
  Content: typeof ElMobileNavMenuContent
  Header: typeof MobileNavMenuHeader
}

const MobileNavMenu: MobileNavMenuFC = ({ children, isOpen, onClose, ...rest }) => {
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
    const clickableItems = container?.querySelectorAll(
      'ul:not([aria-hidden="true"]):not([aria-hidden="false"]) > li > a, ul[aria-hidden="false"] > li > a, button',
    ) as NodeListOf<HTMLElement>

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
    <ElMobileNavMenu ref={ref} {...rest} onKeyDown={handleOnKeyDown}>
      {children}
    </ElMobileNavMenu>
  )
}

MobileNavMenu.ItemGroup = ElMobileNavMenuItemGroup
MobileNavMenu.Item = MobileNavItem
MobileNavMenu.Header = MobileNavMenuHeader
MobileNavMenu.Content = ElMobileNavMenuContent

export { MobileNavMenu }
