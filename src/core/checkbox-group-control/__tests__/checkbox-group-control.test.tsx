import { CheckboxGroupControl } from '../checkbox-group-control'
import { render, screen } from '@testing-library/react'

test('renders a group', () => {
  render(<CheckboxGroupControl>Child</CheckboxGroupControl>)
  expect(screen.getByRole('group')).toBeVisible()
})

test('displays the provided children', () => {
  render(<CheckboxGroupControl>Child</CheckboxGroupControl>)
  expect(screen.getByText('Child')).toBeVisible()
})

test('is labelled by the label text, when provided', () => {
  render(<CheckboxGroupControl label="Group label">Child</CheckboxGroupControl>)
  expect(screen.getByRole('group', { name: 'Group label' })).toBeVisible()
})

test('is described by the help text, when provided', () => {
  render(<CheckboxGroupControl helpText="Help text">Child</CheckboxGroupControl>)
  expect(screen.getByRole('group')).toHaveAccessibleDescription('Help text')
})

test('is described by the error text, when provided', () => {
  render(
    <CheckboxGroupControl helpText="Help text" errorText="Error text">
      Child
    </CheckboxGroupControl>,
  )
  expect(screen.getByRole('group')).toHaveAccessibleDescription('Error text')
})

test('displays label text, when provided', () => {
  render(<CheckboxGroupControl label="Group label">Child</CheckboxGroupControl>)
  expect(screen.getByText('Group label')).toBeVisible()
})

test('displays help text, when provided', () => {
  render(<CheckboxGroupControl helpText="Help text">Child</CheckboxGroupControl>)
  expect(screen.getByText('Help text')).toBeVisible()
})

test('displays error text, when provided', () => {
  render(<CheckboxGroupControl errorText="Error text">Child</CheckboxGroupControl>)
  expect(screen.getByText('Error text')).toBeVisible()
})

test('does NOT display the help text when error text is present', () => {
  render(
    <CheckboxGroupControl helpText="Help text" errorText="Error text">
      Child
    </CheckboxGroupControl>,
  )
  expect(screen.queryByText('Help text')).not.toBeInTheDocument()
})

test('has data-orientation="vertical" by default', () => {
  render(<CheckboxGroupControl>Child</CheckboxGroupControl>)
  // NOTE: we're relying on implementation details here (the fact we know the text will be the direct
  // descendant of the element we're looking for), but the element that handles the layout is not
  // otherwise accessible.
  expect(screen.getByText('Child')).toHaveAttribute('data-orientation', 'vertical')
})

test('applies data-orientation="horizontal" when specified', () => {
  render(
    <CheckboxGroupControl orientation="horizontal" data-testid="group">
      Child
    </CheckboxGroupControl>,
  )
  // NOTE: we're relying on implementation details here (the fact we know the text will be the direct
  // descendant of the element we're looking for), but the element that handles the layout is not
  // otherwise accessible.
  expect(screen.getByText('Child')).toHaveAttribute('data-orientation', 'horizontal')
})

test('forwards additional attributes to the div element', () => {
  const { container } = render(<CheckboxGroupControl data-testid="group">Child</CheckboxGroupControl>)
  expect(container.firstElementChild).toBe(screen.getByTestId('group'))
})
