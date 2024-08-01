import { render, screen } from '@testing-library/react'
import { TextArea } from '..'

test('default min/max rows are 2 -> Infinity', () => {
  const { asFragment } = render(<TextArea />)
  expect(asFragment()).toMatchSnapshot()
})

test('can set custom min/max rows', () => {
  const { asFragment } = render(<TextArea maxRows={10} minRows={3} />)
  expect(asFragment()).toMatchSnapshot()
})

// TODO: This test is currently skipped because our Linaria styled global mock
// is changing the tag name.
test.skip('is accessible via the textbox role', () => {
  render(<TextArea maxRows={10} minRows={3} />)
  expect(screen.getByRole('textbox')).toBeDefined()
})
