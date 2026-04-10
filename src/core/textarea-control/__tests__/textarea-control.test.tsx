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

test('is described by the error text via aria-errormessage, when provided', () => {
  render(<TextareaControl label="Label" fieldSizing="content" helpText="Help text" errorText="Error text" />)
  expect(screen.getByRole('textbox')).toHaveAccessibleErrorMessage('Error text')
})

test('displays help text, when provided and no error is present', () => {
  render(<TextareaControl label="Label" fieldSizing="content" helpText="Help text" />)
  expect(screen.getByText('Help text')).toBeVisible()
})

test('is described by the help text, when provided and no error is present', () => {
  render(<TextareaControl label="Label" fieldSizing="content" helpText="Help text" />)
  const textarea = screen.getByRole('textbox')
  expect(textarea).toHaveAttribute('aria-describedby')
  expect(textarea).toHaveAccessibleDescription('Help text')
  expect(textarea).not.toHaveAttribute('aria-errormessage')
  expect(textarea).not.toHaveAttribute('aria-invalid')
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

test('sets aria-invalid to true when error text is present', () => {
  render(<TextareaControl label="Label" fieldSizing="content" errorText="Error text" />)
  expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true')
})

test('does not set aria-invalid when error text is not present', () => {
  render(<TextareaControl label="Label" fieldSizing="content" />)
  expect(screen.getByRole('textbox')).not.toHaveAttribute('aria-invalid')
})

test('does not set aria-errormessage when error text is not present', () => {
  render(<TextareaControl label="Label" fieldSizing="content" helpText="Help text" />)
  expect(screen.getByRole('textbox')).not.toHaveAttribute('aria-errormessage')
})

test('does not set aria-describedby when error text is present', () => {
  render(<TextareaControl label="Label" fieldSizing="content" helpText="Help text" errorText="Error text" />)
  expect(screen.getByRole('textbox')).not.toHaveAttribute('aria-describedby')
})

test('sets data-show-validity="true" on the textarea when error text is present', () => {
  render(<TextareaControl label="Label" fieldSizing="content" errorText="Error text" />)
  expect(screen.getByRole('textbox')).toHaveAttribute('data-show-validity', 'true')
})

test('does not set data-show-validity="true" on the textarea when no error text is present', () => {
  render(<TextareaControl label="Label" fieldSizing="content" />)
  expect(screen.getByRole('textbox')).not.toHaveAttribute('data-show-validity', 'true')
})

test('respects an explicit showValidity={false} override even when error text is present', () => {
  render(<TextareaControl label="Label" fieldSizing="content" errorText="Error text" showValidity={false} />)
  expect(screen.getByRole('textbox')).toHaveAttribute('data-show-validity', 'false')
})

test('forwards a ref to the underlying textarea element', () => {
  const ref = { current: null }
  render(<TextareaControl label="Label" fieldSizing="content" ref={ref} />)
  expect(ref.current).toBe(screen.getByRole('textbox'))
})
