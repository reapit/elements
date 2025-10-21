import isCSSContentFieldSizingSupported from '../is-css-content-fieldsizing-supported'
import { fireEvent, render, screen } from '@testing-library/react'
import { TextareaWithContentSizing } from '../content-sizing'

vi.mock('../is-css-content-fieldsizing-supported')

beforeEach(() => {
  vi.mocked(isCSSContentFieldSizingSupported).mockReturnValue(true)
})

test('renders a textbox element', () => {
  render(<TextareaWithContentSizing fieldSizing="content" maxRows={10} minRows={3} />)
  expect(screen.getByRole('textbox')).toBeVisible()
})

test('applies data-field-sizing="content" attribute', () => {
  render(<TextareaWithContentSizing fieldSizing="content" maxRows={10} minRows={3} />)
  expect(screen.getByRole('textbox')).toHaveAttribute('data-field-sizing', 'content')
})

test('applies data-show-validity attribute', () => {
  render(<TextareaWithContentSizing fieldSizing="content" showValidity={true} />)
  expect(screen.getByRole('textbox')).toHaveAttribute('data-show-validity', 'true')
})

test('applies data-size attribute', () => {
  render(<TextareaWithContentSizing fieldSizing="content" size="large" />)
  expect(screen.getByRole('textbox')).toHaveAttribute('data-size', 'large')
})

// NOTE: Skipped because the assertion doesn't currently work as expected. Unsure if it's happy-dom
// or @testing-library/jest-dom that owns the behaviour.
// See https://github.com/testing-library/jest-dom/issues/649
test.skip('default min/max rows are 3 and Infinity respectively', () => {
  render(<TextareaWithContentSizing fieldSizing="content" />)
  expect(screen.getByRole('textbox')).toHaveStyle({ '--textarea-min-rows': 3, '--textarea-max-rows': Infinity })
})

// NOTE: Skipped because the assertion doesn't currently work as expected. Unsure if it's happy-dom
// or @testing-library/jest-dom that owns the behaviour.
// See https://github.com/testing-library/jest-dom/issues/649
test.skip('can set custom min/max rows', () => {
  render(<TextareaWithContentSizing fieldSizing="content" maxRows={10} minRows={5} />)
  expect(screen.getByRole('textbox')).toHaveStyle({ '--textarea-min-rows': 5, '--textarea-max-rows': 10 })
})

test('a shadow text area is present when the CSS `field-sizing` property is not supported', () => {
  vi.mocked(isCSSContentFieldSizingSupported).mockReturnValue(false)
  render(<TextareaWithContentSizing fieldSizing="content" />)
  expect(screen.getAllByRole('textbox', { hidden: true })).toHaveLength(2)
})

test('passes value through to the textbox', () => {
  render(<TextareaWithContentSizing fieldSizing="content" value="bob" />)
  expect(screen.getByRole('textbox')).toHaveValue('bob')
})

test('passes defaultValue through to the textbox', () => {
  render(<TextareaWithContentSizing fieldSizing="content" defaultValue="bob" />)
  expect(screen.getByRole('textbox')).toHaveValue('bob')
})

test('calls consumer-supplied onChange', () => {
  const onChange = vi.fn()
  render(<TextareaWithContentSizing fieldSizing="content" onChange={onChange} />)

  const textbox = screen.getByRole('textbox')
  fireEvent.change(textbox, { target: { value: 'new value' } })

  expect(onChange).toHaveBeenCalledTimes(1)
})

test('forwards additional attributes to the textbox', () => {
  render(<TextareaWithContentSizing data-testid="test-id" fieldSizing="content" />)
  expect(screen.getByTestId('test-id')).toBe(screen.getByRole('textbox'))
})
