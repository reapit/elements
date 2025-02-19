import { createContext, useContext } from 'react'
import { useSideBar } from './use-side-bar'

const SideBarContext = createContext<useSideBar | null>(null)

const SideBarProvider = ({ children }) => {
  const sidebar = useSideBar()

  return <SideBarContext.Provider value={sidebar}>{children}</SideBarContext.Provider>
}

export { SideBarContext, SideBarProvider }

export const useSideBarContext = () => {
  const context = useContext(SideBarContext)
  if (!context) {
    throw new Error('useSideBarContext must be used within a SideBarProvider')
  }
  return context
}
