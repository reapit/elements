import { createContext, useContext, type Dispatch, type SetStateAction } from 'react'

interface IsSideBarExpandedContextValue {
  isExpanded: boolean
  setIsExpanded: Dispatch<SetStateAction<boolean>>
}
export const IsSideBarExpandedContext = createContext<IsSideBarExpandedContextValue | undefined>(undefined)

export const useIsSideBarExpandedContext = () => {
  const context = useContext(IsSideBarExpandedContext)
  if (!context) {
    throw new Error('useIsSideBarExpandedContext must be used within a SideBarExpandedContext Provider')
  }
  return context
}
