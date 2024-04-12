import React, { createContext, Dispatch, SetStateAction, useContext, useState, MouseEvent, useEffect, FC } from 'react'
import { PropsWithChildren } from '../../types/core'

export interface NavState {
  navItemIndex: number | null
  navMenuOpen: boolean
  navSubMenuIndex: number | null
  navSubItemIndex: number | null
  callback?: () => void
}

export interface NavStateContextProps {
  navState: NavState
  setNavState: Dispatch<SetStateAction<NavState>>
}

export interface UseNavState {
  navState: NavState
  setNavState: (
    newState: Partial<NavState>,
  ) => (event?: MouseEvent<HTMLAnchorElement | HTMLDivElement | HTMLSpanElement>) => void
}

export const NavStateContext = createContext<NavStateContextProps>({} as NavStateContextProps)

const { Provider } = NavStateContext

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
