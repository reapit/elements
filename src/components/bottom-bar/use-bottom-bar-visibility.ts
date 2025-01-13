import { Dispatch, RefObject, SetStateAction, useEffect, useState } from 'react'

type BottomBarVisibility = {
  isOpen: boolean | undefined
  previousTopPosition: number
}

export const handleChangeBottomBarVisibility = (
  element: HTMLElement,
  setScrollStates: Dispatch<SetStateAction<BottomBarVisibility>>,
) => {
  const { scrollTop } = element ?? {}

  setScrollStates((state) => ({
    isOpen: state.previousTopPosition > scrollTop,
    previousTopPosition: scrollTop,
  }))
}

/**
 * Hook to get the vertical scroll direction of the parent element
 */
export const useBottomBarVisibility = (ref: RefObject<HTMLElement> | null): BottomBarVisibility => {
  const [scrollStates, setScrollStates] = useState<BottomBarVisibility>({
    isOpen: undefined,
    previousTopPosition: 0,
  })

  useEffect(
    function handleScrollListenerRegistry() {
      const element = ref?.current
      if (!element) return
      const abortController = new AbortController()

      element.addEventListener('scroll', () => handleChangeBottomBarVisibility(element, setScrollStates), {
        signal: abortController.signal,
      })

      return () => {
        abortController.abort()
      }
    },
    [ref],
  )

  return scrollStates
}
