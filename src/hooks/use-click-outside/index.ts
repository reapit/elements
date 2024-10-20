import { MutableRefObject, useEffect } from 'react'

export const useClickOutside = (ref: MutableRefObject<HTMLDivElement | null>, onClickOutside: VoidFunction) => {
  useEffect(() => {
    const controller = new AbortController()
    const handleClickOutside = (event) => {
      if (ref?.current && !ref.current.parentElement!.contains(event?.target)) {
        onClickOutside()
      }
    }
    document.addEventListener('mousedown', handleClickOutside, {
      signal: controller.signal,
    })
    return () => {
      controller.abort()
    }
  }, [ref, onClickOutside])
}
