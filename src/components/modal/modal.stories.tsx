import { ModalBg, ModalBody, ModalHeader, ModalContainer, Modal } from './index'
import { TextBase } from '../typography'
import { elIsActive } from '../../styles/states'
import { useState } from 'react'
import { DeprecatedButton } from '../deprecated-button'

export default {
  title: 'Deprecated/Modal',
  component: Modal,
}

export const StylesOnlyUsage = {
  render: ({}) => (
    <>
      <ModalBg className={elIsActive} />
      <ModalContainer role="dialog" aria-modal="true" aria-describedby="modal-1" className={elIsActive} autoFocus>
        <ModalHeader>Welcome to the demo modal</ModalHeader>
        <ModalBody>
          <TextBase>Here&apos;s some nice content for the inside of the modal.</TextBase>
        </ModalBody>
      </ModalContainer>
    </>
  ),
}

export const ReactUsage = {
  render: ({}) => {
    const [modalIsOpen, setModalIsOpen] = useState(false)

    return (
      <>
        <DeprecatedButton variant="primary" onClick={() => setModalIsOpen(!modalIsOpen)}>
          Open Modal
        </DeprecatedButton>
        <Modal isOpen={modalIsOpen} onModalClose={() => setModalIsOpen(!modalIsOpen)} title="Welcome to the demo modal">
          <TextBase>Here&apos;s some nice content for the inside of the modal.</TextBase>
        </Modal>
      </>
    )
  },
}
