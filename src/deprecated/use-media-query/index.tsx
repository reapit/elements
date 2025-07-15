import React, { FC, PropsWithChildren, createContext, useContext, useEffect, useState } from 'react'

/** @deprecated */
export interface MediaType {
  isMobile: boolean
  isTablet: boolean
  isDesktop: boolean
  isWideScreen: boolean
  isSuperWideScreen: boolean
  is4KScreen: boolean
}

/** @deprecated */
export const MOBILE_BREAKPOINT = 768
/** @deprecated */
export const TABLET_BREAKPOINT = 1024
/** @deprecated */
export const DESKTOP_BREAKPOINT = 1440
/** @deprecated */
export const WIDESCREEN_BREAKPOINT = 1920
/** @deprecated */
export const SUPER_WIDESCREEN_BREAKPOINT = 2560

/** @deprecated */
export const MediaStateContext = createContext<MediaType>({} as MediaType)

const { Provider } = MediaStateContext

/** @deprecated */
export const MediaStateProvider: FC<PropsWithChildren> = ({ children }) => {
  const initialWindowWidth = window.innerWidth
  const [mediaType, setMediaType] = useState<MediaType>({
    isMobile: initialWindowWidth < MOBILE_BREAKPOINT,
    isTablet: initialWindowWidth >= MOBILE_BREAKPOINT && initialWindowWidth < TABLET_BREAKPOINT,
    isDesktop: initialWindowWidth >= TABLET_BREAKPOINT && initialWindowWidth < DESKTOP_BREAKPOINT,
    isWideScreen: initialWindowWidth >= DESKTOP_BREAKPOINT && initialWindowWidth < WIDESCREEN_BREAKPOINT,
    isSuperWideScreen: initialWindowWidth >= WIDESCREEN_BREAKPOINT && initialWindowWidth < SUPER_WIDESCREEN_BREAKPOINT,
    is4KScreen: initialWindowWidth >= SUPER_WIDESCREEN_BREAKPOINT,
  })

  useEffect(() => {
    const onResize = () => {
      const windowWidth = window.innerWidth
      const isMobile = windowWidth < MOBILE_BREAKPOINT
      const isTablet = windowWidth >= MOBILE_BREAKPOINT && windowWidth < TABLET_BREAKPOINT
      const isDesktop = windowWidth >= TABLET_BREAKPOINT && windowWidth < DESKTOP_BREAKPOINT
      const isWideScreen = windowWidth >= DESKTOP_BREAKPOINT && windowWidth < WIDESCREEN_BREAKPOINT
      const isSuperWideScreen = windowWidth >= WIDESCREEN_BREAKPOINT && windowWidth < SUPER_WIDESCREEN_BREAKPOINT
      const is4KScreen = windowWidth >= SUPER_WIDESCREEN_BREAKPOINT

      setMediaType({
        isMobile,
        isTablet,
        isDesktop,
        isWideScreen,
        isSuperWideScreen,
        is4KScreen,
      })
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  })

  return <Provider value={mediaType}>{children}</Provider>
}

/** @deprecated */
export const useMediaQuery = (): MediaType => {
  return useContext(MediaStateContext)
}
