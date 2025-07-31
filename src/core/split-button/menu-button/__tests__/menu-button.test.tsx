import { render, screen } from '@testing-library/react'
import { SplitButtonMenuButton } from '../menu-button'
import { SplitButtonContext } from '../../context'

import type { ReactNode } from 'react'

vi.mock('#src/icons/chevron-down', () => ({
  ChevronDownIcon: () => <span data-testid="chevron-down-icon" />,
}))

test('renders a button element', () => {
  render(<SplitButtonMenuButton aria-label="Open menu" />, { wrapper })
  expect(screen.getByRole('button', { name: 'Open menu' })).toBeVisible()
})

test('forwards the `aria-expanded` prop', () => {
  render(<SplitButtonMenuButton aria-label="Expand" aria-expanded={true} />, { wrapper })
  expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'true')
})

test('forwards additional props to the underlying button', () => {
  render(<SplitButtonMenuButton aria-label="Test" data-testid="menu-btn" />, { wrapper })
  expect(screen.getByTestId('menu-btn')).toBeVisible()
})

test('shows `ChevronDownIcon`', () => {
  render(<SplitButtonMenuButton aria-label="Menu" />, { wrapper })
  expect(screen.getByTestId('chevron-down-icon')).toBeVisible()
})

test('applies size and variant from `SplitButtonContext`', () => {
  render(<SplitButtonMenuButton aria-label="Menu" />, { wrapper })

  const button = screen.getByRole('button')
  expect(button).toHaveAttribute('data-size', 'medium')
  expect(button).toHaveAttribute('data-variant', 'primary')
})

test('applies custom `className`', () => {
  render(<SplitButtonMenuButton aria-label="Menu" className="custom-class" />, { wrapper })
  expect(screen.getByRole('button')).toHaveClass('custom-class')
})

function wrapper({ children }: { children: ReactNode }) {
  return (
    <SplitButtonContext.Provider value={{ size: 'medium', variant: 'primary' }}>{children}</SplitButtonContext.Provider>
  )
}
