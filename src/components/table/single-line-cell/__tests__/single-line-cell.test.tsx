import { render } from '@testing-library/react'
import { SingleLineCell } from '..'

describe('TableText', () => {
  test('should match snapshot', () => {
    const { asFragment } = render(<SingleLineCell>Value</SingleLineCell>)
    expect(asFragment()).toMatchSnapshot()
  })
})
