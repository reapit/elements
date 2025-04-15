import { createContext, ReactNode, useContext, type FC } from 'react'
import { TopBarMenuProps } from './top-bar-menu'

type TopBarMenuContextModel = Pick<TopBarMenuProps, 'onClose'>

interface TopBarMenuProviderProps extends TopBarMenuContextModel {
  children: ReactNode
}

const TopBarMenuContext = createContext<TopBarMenuContextModel | null>(null)

const TopBarMenuProvider: FC<TopBarMenuProviderProps> = ({ children, onClose }) => {
  return <TopBarMenuContext.Provider value={{ onClose }}>{children}</TopBarMenuContext.Provider>
}

export { TopBarMenuProvider }

export const useTopBarMenuContext = () => {
  const context = useContext(TopBarMenuContext)
  if (!context) {
    throw new Error('useTopBarMenuContext must be used within a TopBarMenuProvider')
  }
  return context
}
