import { RefObject, useEffect, useRef } from 'react'

interface UseDialogAppearanceOptions {
  isOpen: boolean
  onClose: () => void
}

export const handleDialogAppearance =
  (options: UseDialogAppearanceOptions, ref: RefObject<HTMLDialogElement>) => () => {
    const { isOpen, onClose } = options ?? {}
    if (!ref.current || !onClose) return

    if (isOpen) {
      ref.current.showModal()
      ref.current.addEventListener('close', onClose)
    } else {
      ref.current.removeEventListener('close', onClose)
      ref.current.close()
    }

    return () => {
      ref.current?.removeEventListener('close', onClose)
    }
  }
export const useDialogAppearance = ({ isOpen, onClose }: UseDialogAppearanceOptions) => {
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(handleDialogAppearance({ isOpen, onClose }, ref), [isOpen, onClose])

  return ref
}
