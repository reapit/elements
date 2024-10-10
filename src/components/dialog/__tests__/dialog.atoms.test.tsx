import { render } from '@testing-library/react'
import { Dialog } from '../dialog.atoms'

describe('Dialog.Container', () => {
  it('should match snapshot', () => {
    expect(render(<Dialog />).asFragment()).toMatchSnapshot()
  })
})

describe('Dialog.Title', () => {
  it('should match snapshot', () => {
    expect(render(<Dialog.Title />).asFragment()).toMatchSnapshot()
  })
})

describe('Dialog.Body', () => {
  it('should match snapshot', () => {
    expect(render(<Dialog.Body />).asFragment()).toMatchSnapshot()
  })
})

describe('Dialog.Footer', () => {
  it('should match snapshot', () => {
    expect(render(<Dialog.Footer />).asFragment()).toMatchSnapshot()
  })
})
