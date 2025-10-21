import { TextareaControl } from '../textarea-control'
import { render, screen } from '@testing-library/react'

test('renders a textarea', () => {
  render(<TextareaControl label="Label" fieldSizing="content" />)
  expect(screen.getByRole('textbox')).toBeInTheDocument()
})

test('displays error text, when provided', () => {
  render(<TextareaControl label="Label" fieldSizing="content" helpText="Help text" errorText="Error text" />)
  expect(screen.getByText('Error text')).toBeVisible()
})

test('is described by the error text, when provided', () => {
  render(<TextareaControl label="Label" fieldSizing="content" helpText="Help text" errorText="Error text" />)
  expect(screen.getByRole('textbox')).toHaveAccessibleDescription('Error text')
})

test('displays help text, when provided and no error is present', () => {
  render(<TextareaControl label="Label" fieldSizing="content" helpText="Help text" />)
  expect(screen.getByText('Help text')).toBeVisible()
})

test('is described by the help text, when provided and no error is present', () => {
  render(<TextareaControl label="Label" fieldSizing="content" helpText="Help text" />)
  expect(screen.getByRole('textbox')).toHaveAccessibleDescription('Help text')
})

test('does not display help text when error text is present', () => {
  render(<TextareaControl label="Label" fieldSizing="content" helpText="Help text" errorText="Error text" />)
  expect(screen.queryByText('Help text')).not.toBeInTheDocument()
})

test('associates the label with the textarea', () => {
  render(<TextareaControl label="Comments" fieldSizing="content" />)
  expect(screen.getByLabelText('Comments')).toBe(screen.getByRole('textbox'))
})

test('applies the required attribute to the textarea', () => {
  render(<TextareaControl label="Label" fieldSizing="content" required />)
  expect(screen.getByRole('textbox')).toBeRequired()
})

test('supports content field sizing', () => {
  render(<TextareaControl label="Label" fieldSizing="content" minRows={3} maxRows={10} />)
  const textarea = screen.getByRole('textbox')
  expect(textarea).toHaveAttribute('data-field-sizing', 'content')
})

test('supports fixed field sizing', () => {
  render(<TextareaControl label="Label" fieldSizing="fixed" rows={5} />)
  const textarea = screen.getByRole('textbox')
  expect(textarea).toHaveAttribute('data-field-sizing', 'fixed')
})

test('uses provided id for the textarea', () => {
  render(<TextareaControl id="custom-id" label="Label" fieldSizing="content" />)
  expect(screen.getByRole('textbox')).toHaveAttribute('id', 'custom-id')
})

test('generates an id when none is provided', () => {
  render(<TextareaControl label="Label" fieldSizing="content" />)
  const textarea = screen.getByRole('textbox')
  expect(textarea.getAttribute('id')).toBeTruthy()
})

test('forwards additional attributes to the textarea', () => {
  render(<TextareaControl data-testid="test-id" label="Label" fieldSizing="content" placeholder="Enter text" />)
  const textarea = screen.getByTestId('test-id')
  expect(textarea).toBe(screen.getByRole('textbox'))
  expect(textarea).toHaveAttribute('placeholder', 'Enter text')
})
