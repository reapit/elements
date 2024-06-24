import { ModalBg, ModalBody, ModalHeader, ModalContainer } from '../index'
import { TextBase } from '../../typography'
import { elIsActive } from '../../../styles/states'

export default {
  title: 'Basic Components/Modal',
  component: ModalContainer,
}

export const BasicUsage = {
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
