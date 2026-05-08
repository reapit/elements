import { useLayoutEffect, useState } from 'react'
import type { RefObject } from 'react'

/**
 * Observes the open state of a `<details>` element via the native `toggle` event and synchronises it with
 * local component state.
 *
 * @param ref - Reference to the details element to observe.
 * @param initialOpen - The initial open state to use before the ref is populated. Pass the `open` prop
 *   of the `<details>` element to avoid a brief incorrect initial value.
 * @returns Whether the details element is currently open.
 */
export function useDetailsOpenState(ref: RefObject<HTMLDetailsElement>, initialOpen = false): boolean {
  const [isOpen, setIsOpen] = useState(initialOpen)

  // NOTE: This hook assumes `ref` is a stable object (e.g. from `useRef`). If a new ref object is passed
  // on re-render, the effect will re-run and re-attach the listener to the new element.
  useLayoutEffect(() => {
    if (!ref.current) return

    const details = ref.current
    setIsOpen(details.open)

    const handleToggle = () => {
      setIsOpen(details.open)
    }

    details.addEventListener('toggle', handleToggle)
    return () => details.removeEventListener('toggle', handleToggle)
  }, [ref])

  return isOpen
}
