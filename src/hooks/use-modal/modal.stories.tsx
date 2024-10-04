import React from 'react'
import { useModal } from '.'
import { Button, ButtonGroup } from '../../components/button'
import { TextBase } from '../../components/typography'

export default {
  title: 'Hooks/useModal',
}

export const BasicUsage = {
  render: (args) => {
    const { Modal: ModalComponent, openModal, closeModal } = useModal('portal-root')

    return (
      <React.Fragment {...args}>
        <Button intent="primary" onClick={openModal}>
          Open Modal
        </Button>
        <ModalComponent
          title="Welcome to the demo modal"
          footer={
            <ButtonGroup alignment="right">
              <Button intent="default" onClick={closeModal}>
                Close
              </Button>
              <Button intent="primary" onClick={console.log}>
                Do Something
              </Button>
            </ButtonGroup>
          }
        >
          <TextBase>Here&apos;s some nice content for the inside of the modal.</TextBase>
        </ModalComponent>
      </React.Fragment>
    )
  },
}

export const MultipleModals = {
  render: (args) => {
    const { Modal: ModalA, openModal: openModalA } = useModal('portal-root')
    const { Modal: ModalB, openModal: openModalB } = useModal('portal-root')

    return (
      <React.Fragment {...args}>
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
      </React.Fragment>
    )
  },
}
