import { useState } from 'react'
import { useModal } from '../../hooks/use-modal'
import { Modal, ModalBg } from './index'
import { Button, ButtonGroup } from '../button'
import { TextBase } from '../typography'

export default {
  title: 'Modal',
  component: Modal,
}

export const BasicUsageClosed = {
  render: ({}) => <ModalBg />,
  name: 'Basic Usage - Closed',
}

export const ReactModal = {
  render: ({}) => {
    const [modalIsOpen, setModalIsOpen] = useState(false)

    return (
      <>
        <Button intent="primary" onClick={() => setModalIsOpen(!modalIsOpen)}>
          Open Modal
        </Button>
        <Modal isOpen={modalIsOpen} onModalClose={() => setModalIsOpen(!modalIsOpen)} title="Welcome to the demo modal">
          <TextBase>Here&apos;s some nice content for the inside of the modal.</TextBase>
        </Modal>
      </>
    )
  },
}

export const UseModalExample = {
  render: ({}) => {
    const { Modal: ModalComponent, openModal, closeModal } = useModal('portal-root')

    return (
      <>
        <Button intent="primary" onClick={openModal}>
          Open Modal
        </Button>
        <ModalComponent title="Welcome to the demo modal">
          <TextBase>Here&apos;s some nice content for the inside of the modal.</TextBase>
          <ButtonGroup alignment="right">
            <Button intent="default" onClick={closeModal}>
              Close
            </Button>
            <Button intent="primary" onClick={console.log}>
              Do Something
            </Button>
          </ButtonGroup>
        </ModalComponent>
      </>
    )
  },

  name: 'useModal example',
}

export const UseModalExampleMultipleModals = {
  render: ({}) => {
    const { Modal: ModalA, openModal: openModalA } = useModal('portal-root')

    const { Modal: ModalB, openModal: openModalB } = useModal('portal-root')

    return (
      <>
        <ButtonGroup>
          <Button intent="primary" onClick={openModalA}>
            Open Modal A
          </Button>
          <Button intent="primary" onClick={openModalB}>
            Open Modal B
          </Button>
        </ButtonGroup>
        <ModalA title="Modal A">I&apos;m the modal A&apos;s content</ModalA>
        <ModalB title="Modal B">I&apos;m the modal B&apos;s content</ModalB>
      </>
    )
  },

  name: 'useModal example - multiple modals',
}
