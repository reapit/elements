import isCSSFieldSizingSupported from '../isCSSFieldSizingSupported'
import { render, screen } from '@testing-library/react'
import { TextArea } from '..'

jest.mock('../isCSSFieldSizingSupported')

test('default min/max rows are 2 -> Infinity', () => {
  jest.mocked(isCSSFieldSizingSupported).mockReturnValue(true)

  const { asFragment } = render(<TextArea />)
  expect(asFragment()).toMatchSnapshot()
})

test('can set custom min/max rows', () => {
  jest.mocked(isCSSFieldSizingSupported).mockReturnValue(true)

  const { asFragment } = render(<TextArea maxRows={10} minRows={3} />)
  expect(asFragment()).toMatchSnapshot()
})

// TODO: This test is currently skipped because our Linaria styled global mock
// is changing the tag name.
test.skip('is always accessible via the textbox role', () => {
  jest.mocked(isCSSFieldSizingSupported).mockReturnValue(true)

  const { rerender } = render(<TextArea maxRows={10} minRows={3} />)
  expect(screen.getByRole('textbox')).toBeDefined()

  jest.mocked(isCSSFieldSizingSupported).mockReturnValue(false)

  rerender(<TextArea maxRows={10} minRows={3} />)
  expect(screen.getByRole('textbox')).toBeDefined()
})

test('a shadow text area is present when the CSS `field-sizing` property is not supported', () => {
  jest.mocked(isCSSFieldSizingSupported).mockReturnValue(false)

  const { asFragment } = render(<TextArea />)
  expect(asFragment()).toMatchSnapshot()
})
