import { render, screen } from '@testing-library/react'
import { SplitButtonActionBase } from '../action-base'
import { SplitButtonContext } from '../../context'
import { StarIcon } from '#src/icons/star'

import type { ReactNode } from 'react'
import type { SplitButtonContextType } from '../../context'

test('renders as a button element when `as="button"`', () => {
  render(<SplitButtonActionBase as="button">Button</SplitButtonActionBase>, { wrapper: Wrapper })
  expect(screen.getByRole('button', { name: 'Button' })).toBeVisible()
})

test('renders as a link element when `as="a"`', () => {
  render(
    <SplitButtonActionBase as="a" href="https://fake.url">
      Link
    </SplitButtonActionBase>,
    { wrapper: Wrapper },
  )
  expect(screen.getByRole('link', { name: 'Link' })).toBeVisible()
})

test('is ARIA disabled when `SplitButtonContext` has `busy="action"`', () => {
  render(<SplitButtonActionBase as="button" />, {
    wrapper: (props) => <Wrapper {...props} busy="action" />,
  })
  const button = screen.getByRole('button')
  expect(button).toBeEnabled()
  expect(button).toHaveAttribute('aria-disabled', 'true')
})

test('is ARIA disabled when `SplitButtonContext` has `busy="menu-item"`', () => {
  render(<SplitButtonActionBase as="button" />, {
    wrapper: (props) => <Wrapper {...props} busy="menu-item" />,
  })

  const button = screen.getByRole('button')
  expect(button).toBeEnabled()
  expect(button).toHaveAttribute('aria-disabled', 'true')
})

test('is ARIA disabled when `SplitButtonContext` has no `busy` but `aria-disabled` is true', () => {
  render(<SplitButtonActionBase as="button" aria-disabled={true} />, { wrapper: Wrapper })

  const button = screen.getByRole('button')
  expect(button).toBeEnabled()
  expect(button).toHaveAttribute('aria-disabled', 'true')
})

test('is ARIA disabled when `SplitButtonContext` is not busy but `aria-disabled` is true', () => {
  render(<SplitButtonActionBase as="a" aria-disabled href="https://fake.url" />, { wrapper: Wrapper })
  expect(screen.getByRole('link')).toHaveAttribute('aria-disabled', 'true')
})

test('applies correct data-* attributes', () => {
  render(
    <SplitButtonActionBase as="button" isDestructive>
      Test Button
    </SplitButtonActionBase>,
    { wrapper: Wrapper },
  )

  const button = screen.getByRole('button')
  // NOTE: determined by SplitButtonContext.Provider in the wrapper
  expect(button).toHaveAttribute('data-variant', 'primary')
  // NOTE: determined by SplitButtonContext.Provider in the wrapper
  expect(button).toHaveAttribute('data-size', 'medium')
  expect(button).toHaveAttribute('data-is-destructive', 'true')
})

test('applies size and variant from `SplitButtonContext`', () => {
  render(<SplitButtonActionBase as="button" />, { wrapper: Wrapper })
  const button = screen.getByRole('button')
  expect(button).toHaveAttribute('data-size', 'medium')
  expect(button).toHaveAttribute('data-variant', 'primary')
})

test('forwards additional props to the underlying element', () => {
  render(
    <SplitButtonActionBase as="button" data-testid="my-button">
      Test Button
    </SplitButtonActionBase>,
    { wrapper: Wrapper },
  )
  expect(screen.getByTestId('my-button')).toBeVisible()
})

test('can display an icon on the left', () => {
  render(
    <SplitButtonActionBase as="button" iconLeft={<StarIcon data-testid="icon" />}>
      Test Button
    </SplitButtonActionBase>,
    { wrapper: Wrapper },
  )
  expect(screen.getByTestId('icon')).toBeVisible()
})

test('does not display icon when busy', () => {
  render(
    <SplitButtonActionBase as="button" iconLeft={<StarIcon data-testid="icon" />} isBusy>
      Test Button
    </SplitButtonActionBase>,
    { wrapper: Wrapper },
  )
  expect(screen.queryByTestId('icon')).not.toBeInTheDocument()
})

test('shows a spinner when busy', () => {
  render(
    <SplitButtonActionBase as="button" iconLeft={<StarIcon data-testid="icon" />} isBusy>
      Test Button
    </SplitButtonActionBase>,
    { wrapper: Wrapper },
  )
  expect(screen.queryByTestId('icon')).not.toBeInTheDocument()
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
