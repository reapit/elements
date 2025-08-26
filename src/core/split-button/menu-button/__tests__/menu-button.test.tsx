import { render, screen } from '@testing-library/react'
import { SplitButtonMenuButton } from '../menu-button'
import { SplitButtonContext } from '../../context'

import type { ReactNode } from 'react'
import type { SplitButtonContextType } from '../../context'

vi.mock('#src/icons/chevron-down', () => ({
  ChevronDownIcon: () => <span data-testid="chevron-down-icon" />,
}))

test('renders a button element', () => {
  render(<SplitButtonMenuButton aria-label="Open menu" />, { wrapper: Wrapper })
  expect(screen.getByRole('button', { name: 'Open menu' })).toBeVisible()
})

test('always has type="button"', () => {
  render(<SplitButtonMenuButton aria-label="Expand" aria-expanded={true} />, { wrapper: Wrapper })
  expect(screen.getByRole('button')).toHaveAttribute('type', 'button')
})

test('is ARIA disabled when `SplitButtonContext` has `busy="menu-item"`', () => {
  render(<SplitButtonMenuButton aria-label="Expand" aria-expanded={true} />, {
    wrapper: (props) => <Wrapper {...props} busy="menu-item" />,
  })

  const button = screen.getByRole('button')
  expect(button).toBeEnabled()
  expect(button).toHaveAttribute('aria-disabled', 'true')
})

test('is ARIA disabled when `SplitButtonContext` has `busy="action"`', () => {
  render(<SplitButtonMenuButton aria-label="Expand" aria-expanded={true} />, {
    wrapper: (props) => <Wrapper {...props} busy="action" />,
  })

  const button = screen.getByRole('button')
  expect(button).toBeEnabled()
  expect(button).toHaveAttribute('aria-disabled', 'true')
})

test('is ARIA disabled when `SplitButtonContext` is no `busy` but `aria-disabled` is true', () => {
  render(<SplitButtonMenuButton aria-disabled={true} aria-label="Expand" aria-expanded={true} />, { wrapper: Wrapper })

  const button = screen.getByRole('button')
  expect(button).toBeEnabled()
  expect(button).toHaveAttribute('aria-disabled', 'true')
})

test('forwards the `aria-expanded` prop', () => {
  render(<SplitButtonMenuButton aria-label="Expand" aria-expanded={true} />, { wrapper: Wrapper })
  expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'true')
})

test('forwards additional props to the underlying button', () => {
  render(<SplitButtonMenuButton aria-label="Test" data-testid="menu-btn" />, { wrapper: Wrapper })
  expect(screen.getByTestId('menu-btn')).toBeVisible()
})

test('shows `ChevronDownIcon`', () => {
  render(<SplitButtonMenuButton aria-label="Menu" />, { wrapper: Wrapper })
  expect(screen.getByTestId('chevron-down-icon')).toBeVisible()
})

test('applies size and variant from `SplitButtonContext`', () => {
  render(<SplitButtonMenuButton aria-label="Menu" />, { wrapper: Wrapper })

  const button = screen.getByRole('button')
  expect(button).toHaveAttribute('data-size', 'medium')
  expect(button).toHaveAttribute('data-variant', 'primary')
})

test('applies custom `className`', () => {
  render(<SplitButtonMenuButton aria-label="Menu" className="custom-class" />, { wrapper: Wrapper })
  expect(screen.getByRole('button')).toHaveClass('custom-class')
})

interface WrapperProps {
  children: ReactNode
  busy?: SplitButtonContextType['busy']
}

function Wrapper({ children, busy }: WrapperProps) {
  return (
    <SplitButtonContext.Provider value={{ busy, size: 'medium', variant: 'primary' }}>
      {children}
    </SplitButtonContext.Provider>
  )
}
