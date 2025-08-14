import { render } from '@testing-library/react'
import { SingleLineCell } from '../index'

describe('TableCell', () => {
  test('should match snapshot', () => {
    const { asFragment } = render(<SingleLineCell>td</SingleLineCell>)
    expect(asFragment()).toMatchSnapshot()
  })
})
