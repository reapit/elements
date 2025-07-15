import { FC, useMemo, useState } from 'react'
import { Modal, ModalProps } from '../modal'
import { Portal } from '../use-portal'

/** @deprecated */
export interface UseModal {
  Modal: FC<Partial<ModalProps>>
  closeModal: () => void
  openModal: () => void
  modalIsOpen: boolean
}

/** @deprecated */
export const useModal = (id?: string): UseModal => {
  const [modalIsOpen, setModalIsOpen] = useState(false)

  const portalId = id ?? 'root'
  const closeModal = () => setModalIsOpen(false)
  const openModal = () => setModalIsOpen(true)

  const ModalComponent: FC<Partial<ModalProps>> = ({
    children,
    isOpen = modalIsOpen,
    onModalClose = closeModal,
    ...rest
  }) => (
    <Portal id={portalId}>
      <Modal isOpen={isOpen} onModalClose={onModalClose} {...rest}>
        {children}
      </Modal>
    </Portal>
  )

  return useMemo(() => ({ Modal: ModalComponent, closeModal, openModal, modalIsOpen }), [modalIsOpen])
}
