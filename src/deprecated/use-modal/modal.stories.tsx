import preview from '#.storybook/preview'
import { useModal } from '.'
import { Button } from '../../core/button'
import { ButtonGroup } from '../../core/button-group'
import { TextBase } from '../typography'

const meta = preview.meta({
  title: 'Deprecated/useModal',
})

export default meta

export const BasicUsage = meta.story({
  render: () => {
    const { Modal: ModalComponent, openModal, closeModal } = useModal('portal-root')

    return (
      <>
        <Button variant="primary" onClick={openModal}>
          Open Modal
        </Button>
        <ModalComponent title="Welcome to the demo modal">
          <TextBase>Here&apos;s some nice content for the inside of the modal.</TextBase>
          <ButtonGroup>
            <Button onClick={closeModal}>Close</Button>
            <Button variant="primary" onClick={console.log}>
              Do Something
            </Button>
          </ButtonGroup>
        </ModalComponent>
      </>
    )
  },
})

export const MultipleModals = meta.story({
  render: () => {
    const { Modal: ModalA, openModal: openModalA } = useModal('portal-root')
    const { Modal: ModalB, openModal: openModalB } = useModal('portal-root')

    return (
      <>
        <ButtonGroup>
          <Button variant="primary" onClick={openModalA}>
            Open Modal A
          </Button>
          <Button variant="primary" onClick={openModalB}>
            Open Modal B
          </Button>
        </ButtonGroup>
        <ModalA title="Modal A">I&apos;m the modal A&apos;s content</ModalA>
        <ModalB title="Modal B">I&apos;m the modal B&apos;s content</ModalB>
      </>
    )
  },
})
