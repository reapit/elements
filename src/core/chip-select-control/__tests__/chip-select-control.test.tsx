import { ChipSelectControl } from '../chip-select-control'
import { render, screen } from '@testing-library/react'

test('renders a group', () => {
  render(<ChipSelectControl>Child</ChipSelectControl>)
  expect(screen.getByRole('group')).toBeVisible()
})

test('displays the provided children', () => {
  render(<ChipSelectControl>Child</ChipSelectControl>)
  expect(screen.getByText('Child')).toBeVisible()
})

test('is labelled by the label text, when provided', () => {
  render(<ChipSelectControl label="Group label">Child</ChipSelectControl>)
  expect(screen.getByRole('group', { name: 'Group label' })).toBeVisible()
})

test('is described by the help text, when provided and no error is present', () => {
  render(<ChipSelectControl helpText="Help text">Child</ChipSelectControl>)
  const group = screen.getByRole('group')
  expect(group).toHaveAttribute('aria-describedby')
  expect(group).toHaveAccessibleDescription('Help text')
  expect(group).not.toHaveAttribute('aria-errormessage')
  expect(group).not.toHaveAttribute('aria-invalid')
})

test('is described by the error text via aria-errormessage, when provided', () => {
  render(
    <ChipSelectControl helpText="Help text" errorText="Error text">
      Child
    </ChipSelectControl>,
  )
  expect(screen.getByRole('group')).toHaveAccessibleErrorMessage('Error text')
})

test('displays label text, when provided', () => {
  render(<ChipSelectControl label="Group label">Child</ChipSelectControl>)
  expect(screen.getByText('Group label')).toBeVisible()
})

test('displays help text, when provided', () => {
  render(<ChipSelectControl helpText="Help text">Child</ChipSelectControl>)
  expect(screen.getByText('Help text')).toBeVisible()
})

test('displays error text, when provided', () => {
  render(<ChipSelectControl errorText="Error text">Child</ChipSelectControl>)
  expect(screen.getByText('Error text')).toBeVisible()
})

test('does NOT display the help text when error text is present', () => {
  render(
    <ChipSelectControl helpText="Help text" errorText="Error text">
      Child
    </ChipSelectControl>,
  )
  expect(screen.queryByText('Help text')).not.toBeInTheDocument()
})

test('forwards additional attributes to the chip select element', () => {
  const { container } = render(<ChipSelectControl data-testid="chip-select">Child</ChipSelectControl>)
  expect(container.firstElementChild).toBe(screen.getByTestId('chip-select').parentElement)
})

test('sets aria-invalid to true when error text is present', () => {
  render(<ChipSelectControl errorText="Error text">Child</ChipSelectControl>)
  expect(screen.getByRole('group')).toHaveAttribute('aria-invalid', 'true')
})

test('does not set aria-invalid when error text is not present', () => {
  render(<ChipSelectControl>Child</ChipSelectControl>)
  expect(screen.getByRole('group')).not.toHaveAttribute('aria-invalid')
})

test('does not set aria-errormessage when error text is not present', () => {
  render(<ChipSelectControl helpText="Help text">Child</ChipSelectControl>)
  expect(screen.getByRole('group')).not.toHaveAttribute('aria-errormessage')
})

test('does not set aria-describedby when error text is present', () => {
  render(
    <ChipSelectControl helpText="Help text" errorText="Error text">
      Child
    </ChipSelectControl>,
  )
  expect(screen.getByRole('group')).not.toHaveAttribute('aria-describedby')
})
