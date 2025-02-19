import { useState, type HTMLAttributes } from 'react'

type HtmlButtonAttr = HTMLAttributes<HTMLButtonElement>

export interface useSideBar {
  getTriggerProps: (props?: Partial<HtmlButtonAttr>) => HtmlButtonAttr
  isOpen: boolean
  openSideBar: VoidFunction
  closeSideBar: VoidFunction
}

export const useSideBar = () => {
  const [isOpen, setIsOpen] = useState(true)

  const getTriggerProps: useSideBar['getTriggerProps'] = (props) => {
    return {
      ...props,
      'aria-expanded': isOpen,
      onKeyDown: () => {
        // TODO: a11y thing
      },
      onClick: (e) => {
        setIsOpen((prev) => !prev)
        if (props?.onClick) {
          props.onClick(e)
        }
      },
    }
  }

  const openSideBar = () => {
    setIsOpen(true)
  }

  const closeSideBar = () => {
    setIsOpen(false)
  }

  return { isOpen, openSideBar, closeSideBar, getTriggerProps }
}
