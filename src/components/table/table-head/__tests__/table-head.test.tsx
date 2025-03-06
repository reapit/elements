import { render } from '@testing-library/react'
import { TableHead } from '../index'

describe('TableHead', () => {
  test('should match snapshot', () => {
    const { asFragment } = render(<TableHead>Mock Children</TableHead>)
    expect(asFragment()).toMatchSnapshot()
  })
})
