import { useModal } from '.'
import { Button, ButtonGroup } from '../../components/button'
import { TextBase } from '../../components/typography'

export default {
  title: 'Hooks/useModal',
}

export const BasicUsage = {
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
}

export const MultipleModals = {
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
}
