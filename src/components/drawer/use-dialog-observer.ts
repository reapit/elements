import { useLayoutEffect, useState } from 'react'
import type { RefObject } from 'react'

/**
 * Observes changes to the dialog's `open` attribute and synchronises its own local component state with changes
 * to the dialog open state.
 */
export function useDialogObserver(ref: RefObject<HTMLDialogElement>): boolean {
  const [isOpen, setIsOpen] = useState(false)

  useLayoutEffect(() => {
    if (!ref.current) return

    // Sync the initial state of the dialog with our local component state
    const dialogElement = ref.current
    setIsOpen(dialogElement.open)

    const observer = new MutationObserver(() => {
      // Update the local component state to match the dialog's `open` state
      setIsOpen(dialogElement.open)
    })

    // We want to observe changes to the dialog element's attributes, but only changes to the `open` attribute.
    observer.observe(dialogElement, {
      attributeFilter: ['open'],
    })

    return () => observer.disconnect()
  }, [ref, setIsOpen])

  return isOpen
}
