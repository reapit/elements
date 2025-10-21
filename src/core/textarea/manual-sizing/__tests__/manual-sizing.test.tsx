import { render, screen } from '@testing-library/react'
import { TextareaWithManualSizing } from '../manual-sizing'

test('renders a textbox element', () => {
  render(<TextareaWithManualSizing fieldSizing="manual" />)
  expect(screen.getByRole('textbox')).toBeVisible()
})

test('applies data-field-sizing="content" attribute', () => {
  render(<TextareaWithManualSizing fieldSizing="manual" />)
  expect(screen.getByRole('textbox')).toHaveAttribute('data-field-sizing', 'manual')
})

test('applies data-show-validity attribute', () => {
  render(<TextareaWithManualSizing fieldSizing="manual" showValidity={true} />)
  expect(screen.getByRole('textbox')).toHaveAttribute('data-show-validity', 'true')
})

test('applies data-size attribute', () => {
  render(<TextareaWithManualSizing fieldSizing="manual" size="large" />)
  expect(screen.getByRole('textbox')).toHaveAttribute('data-size', 'large')
})

test('default rows is 3', () => {
  render(<TextareaWithManualSizing fieldSizing="manual" />)
  expect(screen.getByRole('textbox')).toHaveAttribute('rows', '3')
})

test('can set custom number of initial rows', () => {
  render(<TextareaWithManualSizing fieldSizing="manual" initialRows={7} />)
  expect(screen.getByRole('textbox')).toHaveAttribute('rows', '7')
})

test('forwards additional attributes to the textbox', () => {
  render(<TextareaWithManualSizing data-testid="test-id" fieldSizing="manual" />)
  expect(screen.getByTestId('test-id')).toBe(screen.getByRole('textbox'))
})
