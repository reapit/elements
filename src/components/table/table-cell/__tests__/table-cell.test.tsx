import { render } from '@testing-library/react'
import { TableCell } from '../index'

describe('TableCell', () => {
  test('should match snapshot', () => {
    const { asFragment } = render(<TableCell>td</TableCell>)
    expect(asFragment()).toMatchSnapshot()
  })
})
