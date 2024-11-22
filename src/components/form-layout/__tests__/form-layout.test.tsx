import { render } from '@testing-library/react'
import { FormLayout } from '..'
import { InputWrapMed, InputWrap, InputWrapFull, InputWrapHalf } from '../form-layout'

describe('FormLayout component', () => {
  it('should match a snapshot', () => {
    const wrapper = render(<FormLayout />)
    expect(wrapper.asFragment()).toMatchSnapshot()
  })
})

describe('InputWrap component', () => {
  it('should match a snapshot', () => {
    const wrapper = render(<InputWrap />)
    expect(wrapper.asFragment()).toMatchSnapshot()
  })
})

describe('InputWrapMed component', () => {
  it('should match a snapshot', () => {
    const wrapper = render(<InputWrapMed />)
    expect(wrapper.asFragment()).toMatchSnapshot()
  })
})

describe('InputWrapFull component', () => {
  it('should match a snapshot', () => {
    const wrapper = render(<InputWrapFull />)
    expect(wrapper.asFragment()).toMatchSnapshot()
  })
})

describe('InputWrapHalf component', () => {
  it('should match a snapshot', () => {
    const wrapper = render(<InputWrapHalf />)
    expect(wrapper.asFragment()).toMatchSnapshot()
  })
})
