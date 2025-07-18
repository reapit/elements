import { useLayoutEffect, useRef } from 'react'
import type { RefObject } from 'react'

/**
 * When consumers control the open state of the dialog, we need to imperatively show or close the dialog element.
 * We do this by using the `showModal` and `close` methods on the dialog element.
 *
 * If the `isOpen` prop is not controlled by the consumer, we don't do anything.
 *
 * **Note:** We do not rely on the `open` attribute of the dialog element because it does not show the dialog in a
 * modal state.
 */
export function useDialogController(isOpen: boolean | undefined): RefObject<HTMLDialogElement> {
  const ref = useRef<HTMLDialogElement>(null)

  useLayoutEffect(
    function openOrCloseDialog() {
      // If the dialog is not yet mounted, or the `isOpen` value is not controlled, we do nothing.
      if (!ref.current || isOpen === undefined) return

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
