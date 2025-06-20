import { render } from '@testing-library/react'
import { DoubleLineCell } from '../index'

describe('TableCell', () => {
  test('should match snapshot', () => {
    const { asFragment } = render(<DoubleLineCell>td</DoubleLineCell>)
    expect(asFragment()).toMatchSnapshot()
  })
})
