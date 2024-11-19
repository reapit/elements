import isCSSContentFieldSizingSupported from '../is-css-content-fieldsizing-supported'
import { render, screen } from '@testing-library/react'
import { TextArea } from '../textarea'

vi.mock('../is-css-content-fieldsizing-supported')

describe('content field-sizing', () => {
  beforeEach(() => {
    vi.mocked(isCSSContentFieldSizingSupported).mockReturnValue(true)
  })

  test('default min/max rows are 3 -> Infinity', () => {
    const { asFragment } = render(<TextArea fieldSizing="content" />)
    expect(asFragment()).toMatchSnapshot()
  })

  test('can set custom min/max rows', () => {
    const { asFragment } = render(<TextArea fieldSizing="content" maxRows={10} minRows={3} />)
    expect(asFragment()).toMatchSnapshot()
  })

  test('a shadow text area is present when the CSS `field-sizing` property is not supported', () => {
    vi.mocked(isCSSContentFieldSizingSupported).mockReturnValue(false)

    const { asFragment } = render(<TextArea fieldSizing="content" />)
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
test.skip('is always accessible via the textbox role', () => {
  vi.mocked(isCSSContentFieldSizingSupported).mockReturnValue(true)

  const { rerender } = render(<TextArea fieldSizing="content" maxRows={10} minRows={3} />)
  expect(screen.getByRole('textbox')).toBeDefined()

  vi.mocked(isCSSContentFieldSizingSupported).mockReturnValue(false)

  rerender(<TextArea fieldSizing="content" maxRows={10} minRows={3} />)
  expect(screen.getByRole('textbox')).toBeDefined()
})
