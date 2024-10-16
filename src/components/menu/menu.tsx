import React, { FC, MutableRefObject, PropsWithChildren } from 'react'
import { useClickOutside } from '../../hooks/use-click-outside'
import { MenuItemGroup } from './menu.atoms'
import { MenuProvider, useMenu } from './provider'
import { ElMenu, ElMenuItemContainer, ElMenuPopover } from './styles'

const Trigger = ({ children }) => {
  const { triggerProps, isOpen } = useMenu()

  return children({ triggerProps, isOpen })
}

const Popover: FC<PropsWithChildren<{ containerRef: MutableRefObject<HTMLDivElement | null> }>> = ({
  children,
  containerRef,
}) => {
  const { isOpen, setIsOpen, popoverProps } = useMenu()

  useClickOutside(containerRef as MutableRefObject<HTMLDivElement>, () => {
    setIsOpen(false)
  })

  if (isOpen) {
    const onClick = (e) => {
      const button = e.target.closest('button')
      if (button) setIsOpen(false)
    }

    return (
      <ElMenuPopover {...popoverProps} onClick={onClick}>
        {children}
      </ElMenuPopover>
    )
  }

  return null
}

const Menu = MenuProvider as React.FC & {
  Item: typeof ElMenuItemContainer
  Trigger: typeof Trigger
  Group: typeof MenuItemGroup
  Popover: typeof Popover
  List: typeof ElMenu
}

Menu.Item = ElMenuItemContainer
Menu.Trigger = Trigger
Menu.Group = MenuItemGroup
Menu.Popover = Popover
Menu.List = ElMenu

export { Menu }
