import { createContext, ReactNode, useContext, type FC } from 'react'
import { useMenu } from '../../hooks/use-menu'

interface MenuProviderProps {
  children: ReactNode
}

const MenuContext = createContext<useMenu | null>(null)

const MenuProvider: FC<MenuProviderProps> = ({ children }) => {
  const menu = useMenu()

  return <MenuContext.Provider value={menu}>{children}</MenuContext.Provider>
}

export { MenuContext, MenuProvider }

export const useMenuContext = () => {
  const context = useContext(MenuContext)
  if (!context) {
    throw new Error('useMenuContext must be used within a MenuProvider')
  }
  return context
}
