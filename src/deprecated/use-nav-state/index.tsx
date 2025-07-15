import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
  MouseEvent,
  useEffect,
  PropsWithChildren,
  FC,
} from 'react'

/** @deprecated */
export interface NavState {
  navItemIndex: number | null
  navMenuOpen: boolean
  navSubMenuIndex: number | null
  navSubItemIndex: number | null
  callback?: () => void
}

/** @deprecated */
export interface NavStateContextProps {
  navState: NavState
  setNavState: Dispatch<SetStateAction<NavState>>
}

/** @deprecated */
export interface UseNavState {
  navState: NavState
  setNavState: (
    newState: Partial<NavState>,
  ) => (event?: MouseEvent<HTMLAnchorElement | HTMLDivElement | HTMLSpanElement>) => void
}

/** @deprecated */
export const NavStateContext = createContext<NavStateContextProps>({} as NavStateContextProps)

const { Provider } = NavStateContext

/** @deprecated */
export const NavStateProvider: FC<PropsWithChildren> = ({ children }) => {
  const [navState, setNavState] = useState<NavState>({
    navItemIndex: null,
    navMenuOpen: false,
    navSubMenuIndex: null,
    navSubItemIndex: null,
  })

  return (
    <Provider
      value={{
        navState,
        setNavState,
      }}
    >
      {children}
    </Provider>
  )
}

/** @deprecated */
export const useNavState = (
  defaultNavIndex: number | null = null,
  defaultNavSubIndex: number | null = null,
): UseNavState => {
  const { navState, setNavState } = useContext(NavStateContext)

  useEffect(() => {
    setNavState((currentState) => ({
      ...currentState,
      navItemIndex: defaultNavIndex,
      navSubMenuIndex: defaultNavSubIndex,
    }))
  }, [])

  const handleSetNavState =
    (newState: Partial<NavState>) => (event?: MouseEvent<HTMLAnchorElement | HTMLDivElement | HTMLSpanElement>) => {
      event?.preventDefault()
      event?.stopPropagation()

      setNavState((currentState: NavState) => ({
        ...currentState,
        ...newState,
      }))

      if (newState.callback) {
        newState.callback()
      }
    }

  return {
    navState,
    setNavState: handleSetNavState,
  }
}
