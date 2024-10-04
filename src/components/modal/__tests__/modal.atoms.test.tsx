import { render } from '@testing-library/react'
import { ModalBg, ModalBody, ModalContainer, ModalFooter, ModalHeader } from '../modal.atoms'

describe('ModalBg', () => {
  it('should match a snapshot', () => {
    const { baseElement } = render(<ModalBg>Content within modal</ModalBg>)
    expect(baseElement).toMatchSnapshot()
  })
})

describe('ModalContainer', () => {
  it('should match a snapshot', () => {
    const { asFragment } = render(<ModalContainer>Content within modal</ModalContainer>)
    expect(asFragment()).toMatchSnapshot()
  })
})

describe('ModalHeader', () => {
  it('should match a snapshot', () => {
    const { asFragment } = render(<ModalHeader>Content within modal</ModalHeader>)
    expect(asFragment()).toMatchSnapshot()
  })
})

describe('ModalBody', () => {
  it('should match a snapshot', () => {
    const { asFragment } = render(<ModalBody>Content within modal</ModalBody>)
    expect(asFragment()).toMatchSnapshot()
  })
})

describe('ModalFooter', () => {
  it('should match a snapshot', () => {
    const { asFragment } = render(<ModalFooter>Content within modal</ModalFooter>)
    expect(asFragment()).toMatchSnapshot()
  })
})
