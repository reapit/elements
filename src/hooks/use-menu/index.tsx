import { cx } from '@linaria/core'
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
