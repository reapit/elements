import { useModal } from '.'
import { Button, DeprecatedButtonGroup } from '../../components/button'
import { TextBase } from '../../components/typography'

export default {
  title: 'Deprecated/useModal',
}

export const BasicUsage = {
  render: ({}) => {
    const { Modal: ModalComponent, openModal, closeModal } = useModal('portal-root')

    return (
      <>
        <Button variant="primary" onClick={openModal}>
          Open Modal
        </Button>
        <ModalComponent title="Welcome to the demo modal">
          <TextBase>Here&apos;s some nice content for the inside of the modal.</TextBase>
          <DeprecatedButtonGroup alignment="right">
            <Button onClick={closeModal}>Close</Button>
            <Button variant="primary" onClick={console.log}>
              Do Something
            </Button>
          </DeprecatedButtonGroup>
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
        <DeprecatedButtonGroup>
          <Button variant="primary" onClick={openModalA}>
            Open Modal A
          </Button>
          <Button variant="primary" onClick={openModalB}>
            Open Modal B
          </Button>
        </DeprecatedButtonGroup>
        <ModalA title="Modal A">I&apos;m the modal A&apos;s content</ModalA>
        <ModalB title="Modal B">I&apos;m the modal B&apos;s content</ModalB>
      </>
    )
  },
}
