import { render } from '@testing-library/react'
import { ToolTip } from '../index'

describe('ToolTip', () => {
  test('should match snapshot', () => {
    const { asFragment } = render(<ToolTip tip="Tooltip Text">Test</ToolTip>)
    expect(asFragment()).toMatchSnapshot()
  })
})
