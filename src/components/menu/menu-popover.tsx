import { FC, MutableRefObject, useEffect, useRef } from 'react'
import { useClickOutside } from '../../hooks/use-click-outside'
import { useMenuContext } from './menu-context'
import { ElMenuPopover } from './styles'

export const MenuPopover: FC = ({ children }) => {
  const { isOpen, closeMenu, getPopoverProps } = useMenuContext()
  const popoverRef = useRef<HTMLDivElement>(null)

  useClickOutside(popoverRef, closeMenu)

  useEffect(() => {
    if (isOpen) {
      const menuItems = document.querySelectorAll('[role="menuitem"]') as NodeListOf<HTMLElement>
      const menuContainer = popoverRef.current?.parentElement
      const menuButton = menuContainer?.querySelector('[role="button"][aria-expanded="true"]') as HTMLButtonElement

      const controller = new AbortController()
      const { signal } = controller

      menuButton.addEventListener(
        'keydown',
        (e) => {
          if (e.key === 'ArrowDown') {
            e.preventDefault()
            menuItems[0].focus()
          }
        },
        { signal },
      )

      menuItems.forEach((menuItem, index) => {
        menuItem.addEventListener(
          'keydown',
          (e) => {
            switch (e.key) {
              case 'ArrowDown':
                e.preventDefault()
                menuItems[(index + 1) % menuItems.length].focus()
                break
              case 'ArrowUp':
                e.preventDefault()
                menuItems[(index - 1 + menuItems.length) % menuItems.length].focus()
                break
              case 'Escape':
                closeMenu()
                menuButton.focus()
                break
              case 'Enter':
              case ' ':
                menuItem.click()
                break
            }
          },
          { signal },
        )
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
