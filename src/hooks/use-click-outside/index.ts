import { MutableRefObject, useEffect } from 'react'

export const useClickOutside = (ref: MutableRefObject<HTMLDivElement>, onClickOutside: VoidFunction) => {
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref?.current && !ref.current.contains(event?.target)) {
        onClickOutside()
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [ref, onClickOutside])
}
