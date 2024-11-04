import { FC, MutableRefObject, useLayoutEffect, useRef, useState } from 'react'
import { useClickOutside } from '../../hooks/use-click-outside'
import { useMenuContext } from './menu-context'
import { ElMenuPopover } from './styles'

export const setPopoverPosition = (container, popover, setPopoverStyle) => {
  const triggerBtn = container.querySelector('[role="button"]')
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

export const MenuPopover: FC = ({ children }) => {
  const { isOpen, closeMenu, getPopoverProps } = useMenuContext()
  const popoverRef = useRef<HTMLDivElement>(null)

  const [popoverStyle, setPopoverStyle] = useState<React.CSSProperties>({
    position: 'absolute',
  })

  useClickOutside(popoverRef, closeMenu)

  useLayoutEffect(() => {
    const container = popoverRef.current?.parentElement
    if (container && isOpen) {
      setPopoverPosition(container, popoverRef.current, setPopoverStyle)
    }
  }, [isOpen, popoverRef.current, setPopoverStyle])

  if (isOpen) {
    const onClick = (event) => {
      // close menu if clicked target has parent with below selector
      const menuItem = event.target.closest('[data-close-menu="true"]')
      if (menuItem) closeMenu()
    }

    return (
      <ElMenuPopover
        style={popoverStyle}
        ref={popoverRef as MutableRefObject<HTMLDivElement>}
        {...getPopoverProps()}
        onClick={onClick}
      >
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
