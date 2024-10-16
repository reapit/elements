import React, { createContext, Dispatch, FC, HTMLAttributes, SetStateAction, useState } from 'react'

interface MenuContextValue {
  triggerProps: HTMLAttributes<HTMLButtonElement>
  popoverProps: HTMLAttributes<HTMLDivElement>
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
}

const MenuContext = createContext<MenuContextValue | null>(null)

const MenuProvider: FC = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false)

  const triggerProps = {
    onClick: () => {
      setIsOpen((prev) => !prev)
    },
  }

  const popoverProps = {
    hidden: !isOpen,
  }

  return (
    <MenuContext.Provider value={{ triggerProps, popoverProps, isOpen, setIsOpen }}>{children}</MenuContext.Provider>
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
