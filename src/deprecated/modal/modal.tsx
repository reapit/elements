import { FC, HTMLAttributes, Ref, RefObject, createRef, useEffect, useId } from 'react'
import { cx } from '@linaria/core'
import { ModalBg, ModalContainer, ModalHeader, ModalBody } from './modal.atoms'
import { elIsActive } from '../../styles/states'
import { ModalProps } from './types'

/** @deprecated */
export const handleModalFocus = (modalRef: RefObject<HTMLDivElement>, isOpen: boolean) => () => {
  if (isOpen && modalRef.current) {
    modalRef.current.focus()
  }
}

/**
 * This component will be replaced by the `Dialog` component in a future major version
 *
 * @deprecated The `Modal` component is deprecated and will be removed in a future major version.
 * Use the `Dialog` component instead
 */
export const Modal: FC<ModalProps> = ({ isOpen, onModalClose, title, className, children, ...rest }) => {
  const id = rest.id || useId()
  const modalRef = createRef<HTMLDivElement>()

  useEffect(() => {
    const onKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onModalClose()
      }
    }
    document.addEventListener('keyup', onKeyUp, false)

    return () => {
      document.removeEventListener('keyup', onKeyUp, false)
    }
  }, [onModalClose])

  const modalCombinedClassname = cx(className, elIsActive)

  useEffect(handleModalFocus(modalRef, isOpen), [modalRef, isOpen])

  useEffect(() => {
    console.warn('Modal component will be removed in future major version. Use `Dialog` component instead')
  }, [])

  if (!isOpen) return null

  return (
    <>
      <ModalBg className={elIsActive} onClick={onModalClose} />
      <ModalContainer
        role="dialog"
        aria-modal="true"
        aria-describedby={id}
        className={modalCombinedClassname}
        ref={modalRef as unknown as Ref<HTMLAttributes<HTMLElement>>}
        autoFocus
        {...rest}
      >
        {title && <ModalHeader>{title}</ModalHeader>}
        <ModalBody id={id}>{children}</ModalBody>
      </ModalContainer>
    </>
  )
}
