import { fireEvent, render, screen } from '@testing-library/react'
import { TopBarNavDropdownButton } from '..'

test('renders a button element with children', () => {
  render(<TopBarNavDropdownButton>Test button</TopBarNavDropdownButton>)
  expect(screen.getByRole('button', { name: 'Test button' })).toBeVisible()
})

test('calls onClick handler when clicked', () => {
  const onClick = vi.fn()
  render(<TopBarNavDropdownButton onClick={onClick}>Test button</TopBarNavDropdownButton>)

  const button = screen.getByRole('button')
  fireEvent.click(button)

  expect(onClick).toHaveBeenCalledTimes(1)
})

test('forwards additional props to the button element', () => {
  const testId = 'search-button'
  render(<TopBarNavDropdownButton data-testid={testId}>Test button</TopBarNavDropdownButton>)

  const button = screen.getByTestId(testId)
  expect(button).toBeVisible()
})

test('renders with chevron icon', () => {
  render(<TopBarNavDropdownButton>Test button</TopBarNavDropdownButton>)

  const button = screen.getByRole('button')
  const icon = button.querySelector('svg')
  expect(icon).toBeVisible()
})
