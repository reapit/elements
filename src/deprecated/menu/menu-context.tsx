import { createContext, ReactNode, useContext, type FC } from 'react'
import { useDeprecatedMenu } from './use-menu'

/** @deprecated */
interface DeprecatedMenuProviderProps {
  children: ReactNode
}

/** @deprecated */
export const DeprecatedMenuContext = createContext<useDeprecatedMenu | null>(null)

/** @deprecated */
export const DeprecatedMenuProvider: FC<DeprecatedMenuProviderProps> = ({ children }) => {
  const menu = useDeprecatedMenu()

  return <DeprecatedMenuContext.Provider value={menu}>{children}</DeprecatedMenuContext.Provider>
}

/** @deprecated */
export const useDeprecatedMenuContext = () => {
  const context = useContext(DeprecatedMenuContext)
  if (!context) {
    throw new Error('useMenuContext must be used within a MenuProvider')
  }
  return context
}
