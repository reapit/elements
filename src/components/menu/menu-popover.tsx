import { FC, MutableRefObject, useRef } from 'react'
import { useClickOutside } from '../../hooks/use-click-outside'
import { useMenuContext } from './menu-context'
import { ElMenuPopover } from './styles'

export const MenuPopover: FC = ({ children }) => {
  const { isOpen, closeMenu, getPopoverProps } = useMenuContext()
  const popoverRef = useRef<HTMLDivElement>(null)

  useClickOutside(popoverRef, closeMenu)

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
