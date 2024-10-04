import { render } from '@testing-library/react'
import { Modal, getModalVariantClass, handleModalFocus } from '../modal'
import { createRef } from 'react'
import { elModalSmallVariant } from '../styles'

describe('Modal component', () => {
  it('should match a snapshot when closed', () => {
    const { asFragment } = render(
      <Modal isOpen={false} onModalClose={() => {}} title="Title" footer="Footer">
        Content within modal
      </Modal>,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it('should match a snapshot when open', () => {
    const { asFragment } = render(
      <Modal isOpen={true} onModalClose={() => {}} title="Title" footer="Footer">
        Content within modal
      </Modal>,
    )
    expect(asFragment()).toMatchSnapshot()
  })
})

describe('handleModalFocus', () => {
  it('should focus on the modal if it is open', () => {
    const modalRef = createRef<HTMLDivElement>()
    const mockElement = document.createElement('div')
    const focusSpy = jest.spyOn(mockElement, 'focus')

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
    const focusSpy = jest.spyOn(mockElement, 'focus')

    Object.defineProperty(modalRef, 'current', {
      value: mockElement,
    })

    const curried = handleModalFocus(modalRef, false)

    curried()

    expect(focusSpy).not.toHaveBeenCalled()
  })
})

describe('getModalVariantClass', () => {
  it('should return undefined for an unknown variant', () => {
    const result = getModalVariantClass()
    expect(result).toBeUndefined()
  })

  it('should return the elModalSmallVariant class for the small variant', () => {
    const variant = 'small'
    const result = getModalVariantClass(variant)
    expect(result).toBe(elModalSmallVariant)
  })

  it('should return the undefined for the medium variant', () => {
    const variant = 'medium'
    const result = getModalVariantClass(variant)
    expect(result).toBeUndefined()
  })
})
