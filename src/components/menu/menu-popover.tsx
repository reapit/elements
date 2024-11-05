import { FC, MutableRefObject, useEffect, useRef } from 'react'
import { useClickOutside } from '../../hooks/use-click-outside'
import { useMenuContext } from './menu-context'
import { ElMenuPopover } from './styles'

// close menu when focus move out of menu
export const menuListFocusOutHandler = (menuList: HTMLDivElement, closeMenu: VoidFunction) => (event) => {
  if (!menuList.contains((event as FocusEvent).relatedTarget as Node)) {
    closeMenu()
  }
}

// focus to the first menuitems when "arrowDown" pressed while `Menu` open
export const menuButtonKeyDownHandler = (menuItems: NodeListOf<HTMLElement>) => (event) => {
  if (event.key === 'ArrowDown') {
    if (menuItems.length) menuItems[0].focus()
  }
}

// handle basic navigation key refer to https://www.w3.org/WAI/ARIA/apg/patterns/menubar
export const menuItemKeyDownHandler =
  (menuButton: HTMLButtonElement, menuItems: NodeListOf<HTMLElement>, index: number, closeMenu: VoidFunction) =>
  (event) => {
    switch (event.key) {
      case 'ArrowDown': {
        const nextItem = menuItems[(index + 1) % menuItems.length]
        nextItem.focus()
        break
      }
      case 'ArrowUp': {
        event.preventDefault()
        const prevItem = menuItems[(index - 1 + menuItems.length) % menuItems.length]
        prevItem.focus()
        break
      }
      case 'Escape':
        closeMenu()
        menuButton.focus()
        break
      case 'Enter':
      case ' ': {
        const menuItem = menuItems[index]
        menuItem.click()
        break
      }
    }
  }

export const MenuPopover: FC = ({ children }) => {
  const { isOpen, closeMenu, getPopoverProps } = useMenuContext()
  const popoverRef = useRef<HTMLDivElement>(null)

  useClickOutside(popoverRef, closeMenu)

  useEffect(() => {
    if (isOpen) {
      const menuContainer = popoverRef.current?.parentElement
      const menuItems = menuContainer!.querySelectorAll('[role="menuitem"]') as NodeListOf<HTMLElement>
      const menuButton = menuContainer!.querySelector('[role="button"][aria-expanded="true"]') as HTMLButtonElement
      const menuList = menuContainer?.querySelector('[role="menu"]') as HTMLDivElement

      const controller = new AbortController()
      const { signal } = controller

      menuList.addEventListener('focusout', menuListFocusOutHandler(menuList, closeMenu), { signal })
      menuButton.addEventListener('keydown', menuButtonKeyDownHandler(menuItems), { signal })
      menuItems.forEach((menuItem, index) => {
        menuItem.addEventListener('keydown', menuItemKeyDownHandler(menuButton, menuItems, index, closeMenu), {
          signal,
        })
      })

      return () => controller.abort()
    }
  }, [isOpen])

  if (isOpen) {
    const onClick = (event) => {
      // close menu if clicked target has parent with below selector
      const menuItem = event.target.closest('[data-close-menu="true"]')
      if (menuItem) closeMenu()
    }

    return (
      <ElMenuPopover ref={popoverRef as MutableRefObject<HTMLDivElement>} {...getPopoverProps()} onClick={onClick}>
        {children}
      </ElMenuPopover>
    )
  }

  return null
}

export const MenuTrigger = ({ children }) => {
  const { getTriggerProps, isOpen } = useMenuContext()

  return children({ getTriggerProps, isOpen })
}
