import { useState } from 'react'
import { Modal } from '../index'
import { Button } from '../../button'
import { TextBase } from '../../typography'

export default {
  title: 'Composed Components/Modal',
  component: Modal,
}

export const BasicUsage = {
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
