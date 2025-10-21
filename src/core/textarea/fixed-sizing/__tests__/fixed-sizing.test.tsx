import { render, screen } from '@testing-library/react'
import { TextareaWithFixedSizing } from '../fixed-sizing'

test('renders a textbox element', () => {
  render(<TextareaWithFixedSizing fieldSizing="fixed" />)
  expect(screen.getByRole('textbox')).toBeVisible()
})

test('applies data-field-sizing="content" attribute', () => {
  render(<TextareaWithFixedSizing fieldSizing="fixed" />)
  expect(screen.getByRole('textbox')).toHaveAttribute('data-field-sizing', 'fixed')
})

test('applies data-show-validity attribute', () => {
  render(<TextareaWithFixedSizing fieldSizing="fixed" showValidity={true} />)
  expect(screen.getByRole('textbox')).toHaveAttribute('data-show-validity', 'true')
})

test('applies data-size attribute', () => {
  render(<TextareaWithFixedSizing fieldSizing="fixed" size="large" />)
  expect(screen.getByRole('textbox')).toHaveAttribute('data-size', 'large')
})

test('default rows is 2', () => {
  render(<TextareaWithFixedSizing fieldSizing="fixed" />)
  expect(screen.getByRole('textbox')).toHaveAttribute('rows', '2')
})

test('can set custom number of rows', () => {
  render(<TextareaWithFixedSizing fieldSizing="fixed" rows={10} />)
  expect(screen.getByRole('textbox')).toHaveAttribute('rows', '10')
})

test('forwards additional attributes to the textbox', () => {
  render(<TextareaWithFixedSizing data-testid="test-id" fieldSizing="fixed" />)
  expect(screen.getByTestId('test-id')).toBe(screen.getByRole('textbox'))
})
