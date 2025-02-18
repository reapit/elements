import { render } from '@testing-library/react'
import { TableBody } from '../index'

describe('TableBody', () => {
  test('should match snapshot', () => {
    const { asFragment } = render(<TableBody>Mock Children</TableBody>)
    expect(asFragment()).toMatchSnapshot()
  })
})
