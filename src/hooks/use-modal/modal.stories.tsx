import { useModal } from '.'
import { DeprecatedButton, DeprecatedButtonGroup } from '../../components/deprecated-button'
import { TextBase } from '../../components/typography'

export default {
  title: 'Deprecated/useModal',
}

export const BasicUsage = {
  render: ({}) => {
    const { Modal: ModalComponent, openModal, closeModal } = useModal('portal-root')

    return (
      <>
        <DeprecatedButton variant="primary" onClick={openModal}>
          Open Modal
        </DeprecatedButton>
        <ModalComponent title="Welcome to the demo modal">
          <TextBase>Here&apos;s some nice content for the inside of the modal.</TextBase>
          <DeprecatedButtonGroup alignment="right">
            <DeprecatedButton onClick={closeModal}>Close</DeprecatedButton>
            <DeprecatedButton variant="primary" onClick={console.log}>
              Do Something
            </DeprecatedButton>
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
          <DeprecatedButton variant="primary" onClick={openModalA}>
            Open Modal A
          </DeprecatedButton>
          <DeprecatedButton variant="primary" onClick={openModalB}>
            Open Modal B
          </DeprecatedButton>
        </DeprecatedButtonGroup>
        <ModalA title="Modal A">I&apos;m the modal A&apos;s content</ModalA>
        <ModalB title="Modal B">I&apos;m the modal B&apos;s content</ModalB>
      </>
    )
  },
}
