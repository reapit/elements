import { useState } from 'react'
import { useModal } from '../../hooks/use-modal'
import { Modal, ModalBg } from './index'
import { Button, ButtonGroup } from '../button'
import { BodyText } from '../typography'

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
          <BodyText>Here&apos;s some nice content for the inside of the modal.</BodyText>
        </Modal>
      </>
    )
  },
}

export const UseModalExample = {
  render: ({}) => {
    const { Modal: ModalComponent, openModal, closeModal } = useModal('storybook-docs')

    return (
      <>
        <Button intent="primary" onClick={openModal}>
          Open Modal
        </Button>
        <ModalComponent title="Welcome to the demo modal">
          <BodyText>Here&apos;s some nice content for the inside of the modal.</BodyText>
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
    const { Modal: ModalA, openModal: openModalA } = useModal('storybook-docs')

    const { Modal: ModalB, openModal: openModalB } = useModal('storybook-docs')

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
