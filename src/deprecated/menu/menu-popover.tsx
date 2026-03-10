import { type FC, type HTMLAttributes, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useDeprecatedMenuContext } from './menu-context'
import { ElDeprecatedMenuPopover } from './styles'

export const calculatePopoverPosition = (
  container: HTMLElement,
  popover: HTMLDivElement,
  setPopoverStyle: React.Dispatch<React.SetStateAction<React.CSSProperties>>,
  yOffset = 0,
) => {
  const triggerBtn = container.querySelector('[role="button"]')
  if (triggerBtn) {
    const viewportHeight = window.innerHeight
    const popoverHeight = popover.getBoundingClientRect().height
    const { bottom: triggerBottomPos, height: triggerheight } = triggerBtn.getBoundingClientRect()
    const spaceBelowButton = viewportHeight - triggerBottomPos

    const top = popoverHeight > spaceBelowButton ? 0 - popoverHeight : triggerheight

    setPopoverStyle({ top: top + yOffset })
  }
}

/** @deprecated */
export const DeprecatedMenuPopover: FC<
  {
    /**
     * Optional parameter to adjust the vertical position of the popover
     *
     * @default 4 // confirmed by design team to use var(--spacing-1) initially
     */
    yOffset?: number
  } & HTMLAttributes<HTMLDivElement>
> = ({ children, yOffset = 4, ...props }) => {
  const { isOpen, closeMenu, getPopoverProps } = useDeprecatedMenuContext()
  const popoverRef = useRef<HTMLDivElement>(null)

  const [popoverStyle, setPopoverStyle] = useState<React.CSSProperties>({
    position: 'absolute',
  })

  useEffect(() => {
    const controller = new AbortController()
    const handleClickOutside = (event: MouseEvent) => {
      const outside = popoverRef.current?.parentElement
      const target = event.target
      if (outside && target instanceof Node && !outside.contains(target)) {
        closeMenu()
      }
    }
    document.addEventListener('mousedown', handleClickOutside, { signal: controller.signal })
    return () => {
      controller.abort()
    }
  }, [closeMenu])

  useLayoutEffect(() => {
    const container = popoverRef.current?.parentElement
    if (container && isOpen && popoverRef.current) {
      calculatePopoverPosition(container, popoverRef.current, setPopoverStyle, yOffset)
    }
  }, [isOpen])

  if (!isOpen) return null

  const handleClick = (event) => {
    // close menu if clicked target has parent with below selector
    const menuItem = event.target.closest('[data-close-menu="true"]')
    if (menuItem) closeMenu()
  }

  return (
    <ElDeprecatedMenuPopover
      style={popoverStyle}
      ref={popoverRef}
      {...props}
      {...getPopoverProps()}
      onClick={handleClick}
    >
      {children}
    </ElDeprecatedMenuPopover>
  )
}

/** @deprecated */
export const DeprecatedMenuTrigger = ({ children }) => {
  const { getTriggerProps, isOpen } = useDeprecatedMenuContext()

  return children({ getTriggerProps, isOpen })
}
