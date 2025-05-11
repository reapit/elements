import { useEffect, useRef } from 'react'
import type { RefObject } from 'react'

export default function useToggleDrawerVisibilityEffect(isOpen: boolean): RefObject<HTMLDialogElement> {
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(
    function toggleHTMLDialogElementVisibility() {
      if (!ref.current) return

      if (isOpen) {
        ref.current.showModal()
      } else {
        ref.current.close()
      }
    },
    [isOpen],
  )

  return ref
}
