import { render } from '@testing-library/react'
import { Modal, handleModalFocus } from '../modal'
import { createRef } from 'react'

describe('Modal component', () => {
  it('should match a snapshot when closed', () => {
    const wrapper = render(
      <Modal isOpen={false} onModalClose={() => {}} title="test">
        Content within modal
      </Modal>,
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('should match a snapshot when open', () => {
    const wrapper = render(
      <Modal isOpen={true} onModalClose={() => {}} title="test">
        Content within modal
      </Modal>,
    )
    expect(wrapper).toMatchSnapshot()
  })
})

describe('handleModalFocus', () => {
  it('should focus on the modal if it is open', () => {
    const modalRef = createRef<HTMLDivElement>()
    const mockElement = document.createElement('div')
    const focusSpy = vi.spyOn(mockElement, 'focus')

    Object.defineProperty(modalRef, 'current', {
      value: mockElement,
    })

    const curried = handleModalFocus(modalRef, true)

    curried()

    expect(focusSpy).toHaveBeenCalled()
  })

  it('should not focus on the modal if it is not open', () => {
    const modalRef = createRef<HTMLDivElement>()
    const mockElement = document.createElement('div')
    const focusSpy = vi.spyOn(mockElement, 'focus')

    Object.defineProperty(modalRef, 'current', {
      value: mockElement,
    })

    const curried = handleModalFocus(modalRef, false)

    curried()

    expect(focusSpy).not.toHaveBeenCalled()
  })
})
