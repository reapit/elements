import { render } from '@testing-library/react'
import { Tooltip } from '../index'

describe('Tooltip', () => {
  test('should match snapshot', () => {
    const { asFragment } = render(<Tooltip description="Tooltip Text">Test</Tooltip>)
    expect(asFragment()).toMatchSnapshot()
  })
})
