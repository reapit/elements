import { createContext, useContext, type Dispatch, type SetStateAction } from 'react'

interface IsSideBarMenuGroupExpandedContextValue {
  isExpanded: boolean
  setIsExpanded: Dispatch<SetStateAction<boolean>>
}
export const IsSideBarMenuGroupExpandedContext = createContext<IsSideBarMenuGroupExpandedContextValue | null>(null)

export const useIsSideBarMenuGroupExpandedContext = () => {
  const context = useContext(IsSideBarMenuGroupExpandedContext)
  if (!context) {
    throw new Error(
      'useIsSideBarMenuGroupExpandedContext must be used within a SideBarMenuGroupExpandedContext Provider',
    )
  }
  return context
}
