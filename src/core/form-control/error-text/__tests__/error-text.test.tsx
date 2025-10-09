import { FormControlErrorText } from '../error-text'
import { render, screen } from '@testing-library/react'

test('renders as a paragraph', () => {
  render(<FormControlErrorText id="my-error-message">Error message</FormControlErrorText>)
  expect(screen.getByRole('paragraph')).toBeVisible()
  expect(screen.getByRole('paragraph')).toHaveTextContent('Error message')
})

test('has no data-size attribute by default', () => {
  render(<FormControlErrorText id="my-error-message">Error message</FormControlErrorText>)
  expect(screen.getByRole('paragraph')).not.toHaveAttribute('data-size')
})

test('applies the correct data-size attribute when size is specified', () => {
  render(
    <FormControlErrorText id="my-error-message" size="medium">
      Error message
    </FormControlErrorText>,
  )
  expect(screen.getByRole('paragraph')).toHaveAttribute('data-size', 'medium')
})

test('forwards additional attributes to the paragraph element', () => {
  render(
    <FormControlErrorText data-testid="test-id" id="my-error-message">
      Error message
    </FormControlErrorText>,
  )
  expect(screen.getByTestId('test-id')).toBe(screen.getByRole('paragraph'))
})
