import { render, screen } from '@testing-library/react'
import { TextArea } from '../textarea'

describe('content field-sizing', () => {
  test('default min/max rows are 3 -> Infinity', () => {
    const { asFragment } = render(<TextArea fieldSizing="content" />)
    expect(asFragment()).toMatchSnapshot()
  })

  test('can set custom min/max rows', () => {
    const { asFragment } = render(<TextArea fieldSizing="content" maxRows={10} minRows={3} />)
    expect(asFragment()).toMatchSnapshot()
  })
})

describe('fixed field-sizing', () => {
  test('default rows is 3', () => {
    const { asFragment } = render(<TextArea fieldSizing="fixed" />)
    expect(asFragment()).toMatchSnapshot()
  })

  test('can set custom number of rows', () => {
    const { asFragment } = render(<TextArea fieldSizing="fixed" rows={10} />)
    expect(asFragment()).toMatchSnapshot()
  })
})

describe('manual field-sizing', () => {
  test('default rows is 3', () => {
    const { asFragment } = render(<TextArea fieldSizing="manual" />)
    expect(asFragment()).toMatchSnapshot()
  })

  test('can set custom number of initial rows', () => {
    const { asFragment } = render(<TextArea fieldSizing="manual" initialRows={7} />)
    expect(asFragment()).toMatchSnapshot()
  })
})

// TODO: This test is currently skipped because our Linaria styled global mock
// is changing the tag name.
test.skip('is accessible via the textbox role', () => {
  render(<TextArea fieldSizing="content" maxRows={10} minRows={3} />)
  expect(screen.getByRole('textbox')).toBeDefined()
})
