import React, { createContext, Dispatch, FC, HTMLAttributes, SetStateAction, useState } from 'react'

interface MenuContextValue {
  getTriggerProps: () => HTMLAttributes<HTMLButtonElement>
  getPopoverProps: () => HTMLAttributes<HTMLDivElement>
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
}

const MenuContext = createContext<MenuContextValue | null>(null)

const MenuProvider: FC = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false)

  const getTriggerProps = () => {
    return {
      onClick: () => {
        setIsOpen((prev) => !prev)
      },
      'aria-haspopup': 'true',
      'aria-expanded': isOpen,
      className: 'menu-trigger',
    } as ReturnType<MenuContextValue['getTriggerProps']>
  }

  const getPopoverProps = () => {
    return {
      'aria-labelledby': 'menu-header',
      role: 'menu',
      hidden: !isOpen,
      className: 'menu-popover',
    }
  }

  return (
    <MenuContext.Provider value={{ getTriggerProps, getPopoverProps, isOpen, setIsOpen }}>
      {children}
    </MenuContext.Provider>
  )
}

export { MenuContext, MenuProvider }

export const useMenu = () => {
  const context = React.useContext(MenuContext)
  if (!context) {
    throw new Error('useMenu must be used within a MenuProvider')
  }
  return context
}
