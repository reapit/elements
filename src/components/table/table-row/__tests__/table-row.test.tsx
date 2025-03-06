import { render } from '@testing-library/react'
import { TableRow } from '../index'

describe('TableRow', () => {
  test('should match snapshot', () => {
    const { asFragment } = render(<TableRow>Mock Children</TableRow>)
    expect(asFragment()).toMatchSnapshot()
  })
})
