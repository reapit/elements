import { render } from '@testing-library/react'
import { StatusIndicator } from '..'

describe('StatusIndicator', () => {
  it('should render as expected', () => {
    expect(render(<StatusIndicator variant="neutral">Neutral</StatusIndicator>).asFragment()).toMatchSnapshot()
    expect(render(<StatusIndicator variant="success">Success</StatusIndicator>).asFragment()).toMatchSnapshot()
    expect(render(<StatusIndicator variant="warning">Warning</StatusIndicator>).asFragment()).toMatchSnapshot()
    expect(render(<StatusIndicator variant="pending">Pending</StatusIndicator>).asFragment()).toMatchSnapshot()
    expect(render(<StatusIndicator variant="danger">Danger</StatusIndicator>).asFragment()).toMatchSnapshot()
    expect(render(<StatusIndicator variant="inactive">Inactive</StatusIndicator>).asFragment()).toMatchSnapshot()
    expect(render(<StatusIndicator variant="accent1">Accent 1</StatusIndicator>).asFragment()).toMatchSnapshot()
    expect(render(<StatusIndicator variant="accent2">Accent 2</StatusIndicator>).asFragment()).toMatchSnapshot()
  })
})
