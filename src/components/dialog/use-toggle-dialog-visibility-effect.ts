import { RefObject, useEffect } from 'react'

export interface UseDialogAppearanceInput {
  // A ref object that will be used to access the dialog element
  ref: RefObject<HTMLDialogElement>
  // Whether the dialog is open or not
  isOpen: boolean
  // A callback function that will be invoked when the dialog is closed
  onClose?: () => void
}

// NOTE: a side effect that will be triggered when the `isOpen` state changes
// and will handle the dialog visibility by invoking `showModal` and `close` methods
export const useToggleDialogVisibilityEffect = ({ isOpen, onClose, ref }: UseDialogAppearanceInput) => {
  // NOTE: a fallback to ensure the function is invoked, when the `onClose` prop is not provided
  const handleOnClose = () => onClose?.()

  useEffect(
    function handleToggleDialogVisibility() {
      if (!ref.current) return
      const abortController = new AbortController()

      if (isOpen) {
        ref.current.showModal()
        ref.current.addEventListener('close', handleOnClose, { signal: abortController.signal })
      } else {
        ref.current.removeEventListener('close', handleOnClose)
        ref.current.close()
      }

      return () => {
        abortController.abort()
      }
    },
    [isOpen, onClose],
  )
}
