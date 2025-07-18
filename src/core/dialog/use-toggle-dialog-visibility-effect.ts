import { RefObject, useEffect } from 'react'

export interface UseToggleDialogVisibilityEffectInput {
  // Ref object that will be used to access the dialog element
  ref: RefObject<HTMLDialogElement>
  // Whether the dialog is open or not
  isOpen: boolean
  // An optional callback function that will be invoked when the dialog is closed
  onClose?: () => void
}

// NOTE: a side effect that will be triggered when the `isOpen` state changes
// and will handle the dialog visibility by invoking `showModal` and `close` methods
export const useToggleDialogVisibilityEffect = ({ isOpen, onClose, ref }: UseToggleDialogVisibilityEffectInput) => {
  // a fallback function to ensure the function is still exist, whether the `onClose` prop is not provided
  const handleOnClose = () => onClose?.()

  useEffect(
    function handleToggleDialogVisibility() {
      if (!ref.current) return
      const abortController = new AbortController()

      if (isOpen) {
        ref.current.showModal()
        ref.current.addEventListener('close', handleOnClose, { signal: abortController.signal })
      } else {
        abortController.abort()
        ref.current.close()
      }

      return () => {
        abortController.abort()
      }
    },
    [isOpen, onClose],
  )
}
