import preview from '#.storybook/preview'
import { ModalBg, ModalBody, ModalHeader, ModalContainer, Modal } from './index'
import { TextBase } from '../typography'
import { elIsActive } from '../../styles/deprecated-states'
import { useState } from 'react'
import { Button } from '../../core/button'

const meta = preview.meta({
  title: 'Deprecated/Modal',
  component: Modal,
})

export const StylesOnlyUsage = meta.story({
  render: () => (
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
})

export const ReactUsage = meta.story({
  render: () => {
    const [modalIsOpen, setModalIsOpen] = useState(false)

    return (
      <>
        <Button variant="primary" onClick={() => setModalIsOpen(!modalIsOpen)}>
          Open Modal
        </Button>
        <Modal isOpen={modalIsOpen} onModalClose={() => setModalIsOpen(!modalIsOpen)} title="Welcome to the demo modal">
          <TextBase>Here&apos;s some nice content for the inside of the modal.</TextBase>
        </Modal>
      </>
    )
  },
})
