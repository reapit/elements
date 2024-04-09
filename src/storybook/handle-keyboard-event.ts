import { useEffect, KeyboardEvent } from 'react'

export type KeyCode = 'Escape' | 'Tab' | 'ArrowUp' | 'ArrowDown' | 'Enter'

export const handleKeyboardEvent = (keyCode: KeyCode, callback: () => void) => (event: KeyboardEvent<HTMLElement>) => {
  if (keyCode === event.code) {
    callback()
  }
}

export const useKeyboard = (keyCode: KeyCode, callback: () => void) => {
  useEffect(() => {
    window.addEventListener('keypress', handleKeyboardEvent(keyCode, callback) as () => EventListener)

    return () => window.removeEventListener('keypress', handleKeyboardEvent(keyCode, callback) as () => EventListener)
  }, [])
}
