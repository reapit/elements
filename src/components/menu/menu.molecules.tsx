import React, { FC, MutableRefObject, PropsWithChildren, useLayoutEffect, useState } from 'react'
import { MenuContainer, MenuItem, MenuItemGroup, MenuRadioItem } from './menu.atoms'
import { MenuProvider, useMenu } from './provider'
import { ElMenuPopover } from './styles'
import { useClickOutside } from '../../hooks/use-click-outside'

const Trigger = ({ children }) => {
  const { getTriggerProps, isOpen } = useMenu()

  return children({ getTriggerProps, isOpen })
}

export const handlePopoverPosition =
  (containerRef, isOpen, getTriggerProps, getPopoverProps, setPopoverStyle) => () => {
    if (containerRef?.current && isOpen) {
      const triggerBtn = containerRef.current.querySelector(`.${getTriggerProps().className}`)
      const popover = containerRef.current.querySelector(`.${getPopoverProps().className}`)
      if (triggerBtn && popover) {
        const buttonRect = triggerBtn.getBoundingClientRect()
        const viewportHeight = window.innerHeight
        const popoverHeight = popover?.getBoundingClientRect().height

        const spaceBelowButton = viewportHeight - buttonRect.bottom
        const gap = 3 // the shadow width or .etc
        let top = buttonRect.height + gap

        if (popoverHeight > spaceBelowButton) {
          top = 0 - popoverHeight - gap
        }

        setPopoverStyle({
          top,
        })
      }
    }
  }

const Popover: FC<PropsWithChildren<{ containerRef: MutableRefObject<HTMLDivElement | null> }>> = ({
  children,
  containerRef,
}) => {
  const { isOpen, setIsOpen, getPopoverProps, getTriggerProps } = useMenu()

  useClickOutside(containerRef as MutableRefObject<HTMLDivElement>, () => {
    setIsOpen(false)
  })

  const [popoverStyle, setPopoverStyle] = useState<React.CSSProperties>({
    position: 'absolute',
  })

  useLayoutEffect(handlePopoverPosition(containerRef, isOpen, getTriggerProps, getPopoverProps, setPopoverStyle), [
    containerRef,
    isOpen,
  ])

  if (isOpen)
    return (
      <ElMenuPopover
        {...getPopoverProps()}
        style={popoverStyle}
        onClick={(e) => {
          const button = (e.target as HTMLElement).closest('button')
          if (button) setIsOpen(false)
        }}
      >
        {children}
      </ElMenuPopover>
    )

  return null
}
const Menu = MenuProvider as React.FC & {
  Trigger: typeof Trigger
  Item: typeof MenuItem
  RadioItem: typeof MenuRadioItem
  List: typeof MenuContainer
  Group: typeof MenuItemGroup
  Popover: typeof Popover
}

Menu.RadioItem = MenuRadioItem
Menu.Item = MenuItem
Menu.Trigger = Trigger
Menu.Popover = Popover
Menu.List = MenuContainer
Menu.Group = MenuItemGroup

export { Menu }
