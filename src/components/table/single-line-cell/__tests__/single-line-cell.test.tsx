import { render } from '@testing-library/react'
import { SingleLineCell } from '..'

describe('SingleLineCell', () => {
  test('should match snapshot', () => {
    const { asFragment } = render(<SingleLineCell>Value</SingleLineCell>)
    expect(asFragment()).toMatchSnapshot()
  })
})
