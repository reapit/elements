import { AtAGlanceCardRadio } from '../card-radio'
import { AtAGlanceCardContent } from '../../card-content'
import { render, screen, fireEvent } from '@testing-library/react'

test('renders a radio input', () => {
  render(
    <AtAGlanceCardRadio name="test" value="test-value">
      <AtAGlanceCardContent label="Test" value="123" />
    </AtAGlanceCardRadio>,
  )
  expect(screen.getByRole('radio')).toBeInTheDocument()
})

test('applies name attribute to radio input', () => {
  render(
    <AtAGlanceCardRadio name="metric-group" value="test-value">
      <AtAGlanceCardContent label="Test" value="123" />
    </AtAGlanceCardRadio>,
  )
  expect(screen.getByRole('radio')).toHaveAttribute('name', 'metric-group')
})

test('applies value attribute to radio input', () => {
  render(
    <AtAGlanceCardRadio name="test" value="sales">
      <AtAGlanceCardContent label="Test" value="123" />
    </AtAGlanceCardRadio>,
  )
  expect(screen.getByRole('radio')).toHaveAttribute('value', 'sales')
})

test('renders children content', () => {
  render(
    <AtAGlanceCardRadio name="test" value="test-value">
      <AtAGlanceCardContent label="Sales Total" value="$12,345" />
    </AtAGlanceCardRadio>,
  )
  expect(screen.getByText('Sales Total')).toBeVisible()
  expect(screen.getByText('$12,345')).toBeVisible()
})

test('applies checked attribute when provided', () => {
  render(
    <AtAGlanceCardRadio name="test" value="test-value" checked>
      <AtAGlanceCardContent label="Test" value="123" />
    </AtAGlanceCardRadio>,
  )
  expect(screen.getByRole('radio')).toBeChecked()
})

test('is not checked by default', () => {
  render(
    <AtAGlanceCardRadio name="test" value="test-value">
      <AtAGlanceCardContent label="Test" value="123" />
    </AtAGlanceCardRadio>,
  )
  expect(screen.getByRole('radio')).not.toBeChecked()
})

test('applies disabled attribute when provided', () => {
  render(
    <AtAGlanceCardRadio name="test" value="test-value" disabled>
      <AtAGlanceCardContent label="Test" value="123" />
    </AtAGlanceCardRadio>,
  )
  expect(screen.getByRole('radio')).toBeDisabled()
})

test('calls onChange handler when clicked', () => {
  const onChange = vi.fn()
  render(
    <AtAGlanceCardRadio name="test" value="test-value" onChange={onChange}>
      <AtAGlanceCardContent label="Test" value="123" />
    </AtAGlanceCardRadio>,
  )

  fireEvent.click(screen.getByRole('radio'))

  expect(onChange).toHaveBeenCalledTimes(1)
})

test('applies className to container', () => {
  const { container } = render(
    <AtAGlanceCardRadio name="test" value="test-value" className="custom-class">
      <AtAGlanceCardContent label="Test" value="123" />
    </AtAGlanceCardRadio>,
  )
  expect(container.firstChild).toHaveClass('custom-class')
})

test('applies style to container', () => {
  const { container } = render(
    <AtAGlanceCardRadio name="test" value="test-value" style={{ marginTop: '10px' }}>
      <AtAGlanceCardContent label="Test" value="123" />
    </AtAGlanceCardRadio>,
  )
  expect(container.firstChild).toHaveStyle({ marginTop: '10px' })
})

test('forwards ref to the radio input', () => {
  const ref = vi.fn()
  render(
    <AtAGlanceCardRadio name="test" value="test-value" ref={ref}>
      <AtAGlanceCardContent label="Test" value="123" />
    </AtAGlanceCardRadio>,
  )
  expect(ref).toHaveBeenCalledWith(expect.any(HTMLInputElement))
})

test('forwards additional props to the radio input', () => {
  render(
    <AtAGlanceCardRadio name="test" value="test-value" data-testid="my-radio">
      <AtAGlanceCardContent label="Test" value="123" />
    </AtAGlanceCardRadio>,
  )
  expect(screen.getByTestId('my-radio')).toBe(screen.getByRole('radio'))
})
