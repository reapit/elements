import { render } from '@testing-library/react'
import { ModalBg, ModalBody, ModalContainer, ModalHeader } from '../modal.atoms'

describe('ModalBg', () => {
  it('should match a snapshot', () => {
    const wrapper = render(<ModalBg>Content within modal</ModalBg>)
    expect(wrapper.asFragment()).toMatchSnapshot()
  })
})

describe('ModalContainer', () => {
  it('should match a snapshot', () => {
    const wrapper = render(<ModalContainer>Content within modal</ModalContainer>)
    expect(wrapper.asFragment()).toMatchSnapshot()
  })
})

describe('ModalHeader', () => {
  it('should match a snapshot', () => {
    const wrapper = render(<ModalHeader>Content within modal</ModalHeader>)
    expect(wrapper.asFragment()).toMatchSnapshot()
  })
})

describe('ModalBody', () => {
  it('should match a snapshot', () => {
    const wrapper = render(<ModalBody>Content within modal</ModalBody>)
    expect(wrapper.asFragment()).toMatchSnapshot()
  })
})
