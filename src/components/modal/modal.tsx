import { FC, HTMLAttributes, Ref, RefObject, createRef, useEffect } from 'react'
import { cx } from '@linaria/core'
import { ModalBg, ModalContainer, ModalHeader, ModalBody } from './modal.atoms'
import { elIsActive } from '../../styles/states'
import { useId } from '../../storybook/random-id'
import { ModalProps } from './types'

export const handleModalFocus = (modalRef: RefObject<HTMLDivElement>, isOpen: boolean) => () => {
  if (isOpen && modalRef.current) {
    modalRef.current.focus()
  }
}

export const Modal: FC<ModalProps> = ({ isOpen, onModalClose, title, className, children, ...rest }) => {
  const id = useId(rest.id)
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
