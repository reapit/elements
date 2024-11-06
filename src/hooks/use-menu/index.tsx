import { HTMLAttributes, useState } from 'react'

type HtmlButtonAttr = HTMLAttributes<HTMLButtonElement>
type HtmlDivAttr = HTMLAttributes<HTMLDivElement>

export interface useMenu {
  getTriggerProps: (props?: Partial<HtmlButtonAttr>) => HtmlButtonAttr
  getPopoverProps: (props?: Partial<HtmlDivAttr>) => HtmlDivAttr
  isOpen: boolean
  openMenu: VoidFunction
  closeMenu: VoidFunction
}

export const useMenu = (): useMenu => {
  const [isOpen, setIsOpen] = useState(false)

  const getTriggerProps: useMenu['getTriggerProps'] = (props) => {
    return {
      ...props,
      'aria-haspopup': true,
      'aria-expanded': isOpen,
      role: 'button',
      onKeyDown: (e) => {
        if (e.key === 'ArrowDown') {
          const menuItems = e.currentTarget.parentElement!.querySelectorAll(
            '[role="menuitem"]',
          ) as NodeListOf<HTMLElement>

          if (menuItems.length) menuItems[0].focus()
        }

        if (props?.onKeyDown) {
          props.onKeyDown(e)
        }
      },
      onClick: (e) => {
        setIsOpen((prev) => !prev)
        if (props?.onClick) {
          props.onClick(e)
        }
      },
    }
  }

  const getPopoverProps: useMenu['getPopoverProps'] = (props) => {
    return {
      ...props,
      'data-open': isOpen,
      // close menu when "focus" move out of menu
      onBlur: (e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
          closeMenu()
        }
      },
      // handle basic navigation key refer to https://www.w3.org/WAI/ARIA/apg/patterns/menubar
      onKeyDown: (e) => {
        const menu = e.currentTarget
        const menuButton = menu?.querySelector('[role="button"]') as HTMLButtonElement
        const menuItems = menu?.querySelectorAll('[role="menuitem"]') as NodeListOf<HTMLElement>

        let currentIndex = -1
        menuItems.forEach((item, index) => {
          if (item === document.activeElement) {
            currentIndex = index
          }
        })

        switch (e.key) {
          case 'ArrowDown': {
            const nextItem = menuItems[(currentIndex + 1) % menuItems.length]
            nextItem.focus()
            break
          }
          case 'ArrowUp': {
            const prevItem = menuItems[(currentIndex - 1 + menuItems.length) % menuItems.length]
            prevItem.focus()
            break
          }
          case 'Escape':
            closeMenu()
            menuButton.focus()
            break
          case 'Enter':
          case ' ': {
            const menuItem = menuItems[currentIndex]
            menuItem.click()
            break
          }
        }
      },
    }
  }

  const openMenu = () => {
    setIsOpen(true)
  }

  const closeMenu = () => {
    setIsOpen(false)
  }

  return { isOpen, openMenu, closeMenu, getTriggerProps, getPopoverProps }
}
