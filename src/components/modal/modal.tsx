import React, { FC, HTMLAttributes, createRef, useEffect, useId } from 'react'
import { cx } from '@linaria/core'
import { ElModalBg, ElModal, ElModalHeader, ElModalBody } from './__styles__'
import { elIsActive } from '../../styles/states'

export interface ModalProps extends HTMLAttributes<HTMLDivElement> {
  isOpen: boolean
  onModalClose: () => void
  title?: string
  className?: string
}

export interface ModalBaseProps extends HTMLAttributes<HTMLElement> {}

export const ModalBg: FC<ModalBaseProps> = ({ className, children, ...rest }: ModalBaseProps) => (
  <ElModalBg className={cx(className)} {...rest}>
    {children}
  </ElModalBg>
)

export const ModalContainer: FC<ModalBaseProps> = ({ className, children, ...rest }: ModalBaseProps) => (
  <ElModal className={cx(className)} {...rest}>
    {children}
  </ElModal>
)

export const ModalHeader: FC<ModalBaseProps> = ({ className, children, ...rest }: ModalBaseProps) => (
  <ElModalHeader className={cx(className)} {...rest}>
    {children}
  </ElModalHeader>
)

export const ModalBody: FC<ModalBaseProps> = ({ className, children, ...rest }: ModalBaseProps) => (
  <ElModalBg className={cx(className)} {...rest}>
    {children}
  </ElModalBg>
)

export const handleModalFocus = (modalRef: React.RefObject<HTMLDivElement>, isOpen: boolean) => () => {
  if (isOpen && modalRef.current) {
    modalRef.current.focus()
  }
}

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

  if (!isOpen) return null

  return (
    <>
      <ElModalBg className={elIsActive} onClick={onModalClose} />
      <ElModal
        role="dialog"
        aria-modal="true"
        aria-describedby={id}
        className={modalCombinedClassname}
        ref={modalRef}
        autoFocus
        {...rest}
      >
        {title && <ElModalHeader>{title}</ElModalHeader>}
        <ElModalBody id={id}>{children}</ElModalBody>
      </ElModal>
    </>
  )
}
