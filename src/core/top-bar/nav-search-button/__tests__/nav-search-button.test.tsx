import { fireEvent, render, screen } from '@testing-library/react'
import { TopBarNavSearchButton } from '../nav-search-button'

test('has a default accessible name of "Search"', () => {
  render(<TopBarNavSearchButton onClick={() => void 0} shortcut="" />)
  expect(screen.getByRole('button', { name: 'Search' })).toBeVisible()
})

test('accepts a custom accessible name', () => {
  const customLabel = 'Custom Search Label'
  render(<TopBarNavSearchButton onClick={() => void 0} shortcut="" aria-label={customLabel} />)

  const button = screen.getByRole('button', { name: customLabel })
  expect(button).toBeVisible()
})

test('calls onClick handler when clicked', () => {
  const onClick = vi.fn()
  render(<TopBarNavSearchButton onClick={onClick} shortcut="" />)

  const button = screen.getByRole('button')
  fireEvent.click(button)

  expect(onClick).toHaveBeenCalledTimes(1)
})

test('forwards additional props to the button element', () => {
  const testId = 'search-button'
  render(<TopBarNavSearchButton onClick={() => void 0} shortcut="" data-testid={testId} />)

  const button = screen.getByTestId(testId)
  expect(button).toBeVisible()
})

test('renders with search icon', () => {
  render(<TopBarNavSearchButton onClick={() => void 0} shortcut="" />)

  const button = screen.getByRole('button')
  const icon = button.querySelector('svg')
  expect(icon).toBeVisible()
})

test('can display a visual shortcut indicator', () => {
  render(<TopBarNavSearchButton onClick={() => void 0} shortcut="⌘K" aria-keyshortcuts="Meta+K" />)
  expect(screen.getByText('⌘K')).toBeVisible()
})
