import { Dispatch, RefObject, SetStateAction, useEffect, useState } from 'react'

type VerticalScrollDirection = {
  isScrollTop: boolean
  isScrollBottom: boolean
  previousTopPosition: number
}

export const handleChangeScrollDirection = (
  element: HTMLElement,
  setScrollStates: Dispatch<SetStateAction<VerticalScrollDirection>>,
) => {
  const { scrollTop } = element ?? {}

  setScrollStates((state) => ({
    isScrollTop: state.previousTopPosition > scrollTop,
    isScrollBottom: state.previousTopPosition < scrollTop,
    previousTopPosition: scrollTop,
  }))
}

/**
 * Hook to get the vertical scroll direction of the parent element
 */
export const useVerticalScrollDirection = (ref: RefObject<HTMLElement> | null): VerticalScrollDirection => {
  const [scrollStates, setScrollStates] = useState<VerticalScrollDirection>({
    isScrollTop: false,
    isScrollBottom: false,
    previousTopPosition: 0,
  })

  useEffect(
    function handleScrollListenerRegistry() {
      const element = ref?.current
      if (!element) return
      const abortController = new AbortController()

      element.addEventListener('scroll', () => handleChangeScrollDirection(element, setScrollStates), {
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
