import React, { forwardRef, MutableRefObject, PropsWithChildren } from 'react'
import { useClickOutside } from '../../hooks/use-click-outside'
import { MenuContainer, MenuItemGroup } from './menu.atoms'
import { MenuProvider, useMenu } from './provider'
import { ElMenuItemContainer } from './styles'

const Trigger = ({ children }) => {
  const { getTriggerProps, isOpen } = useMenu()

  return children({ getTriggerProps, isOpen })
}

const Popover = forwardRef<HTMLDivElement, PropsWithChildren<any>>(({ children }, ref) => {
  const { isOpen, setIsOpen, getPopoverProps } = useMenu()

  useClickOutside(ref as MutableRefObject<HTMLDivElement>, () => {
    setIsOpen(false)
  })

  if (isOpen)
    return (
      <div
        {...getPopoverProps()}
        onClick={(e) => {
          const button = (e.target as HTMLElement).closest('button')
          if (button) setIsOpen(false)
        }}
      >
        {children}
      </div>
    )

  return null
})

const Menu = MenuProvider as React.FC & {
  Trigger: typeof Trigger
  Item: typeof ElMenuItemContainer
  List: typeof MenuContainer
  Group: typeof MenuItemGroup
  Popover: typeof Popover
}

Menu.Trigger = Trigger
Menu.Item = ElMenuItemContainer
Menu.Popover = Popover
Menu.List = MenuContainer
Menu.Group = MenuItemGroup

export { Menu }
