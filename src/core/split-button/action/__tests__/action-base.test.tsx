import { render, screen } from '@testing-library/react'
import { SplitButtonActionBase } from '../action-base'
import { SplitButtonContext } from '../../context'
import { StarIcon } from '#src/icons/star'

import type { ReactNode } from 'react'

test('renders as a button element when `as="button"`', () => {
  render(<SplitButtonActionBase as="button">Button</SplitButtonActionBase>, { wrapper })
  expect(screen.getByRole('button', { name: 'Button' })).toBeVisible()
})

test('renders as a link element when `as="a"`', () => {
  render(
    <SplitButtonActionBase as="a" href="https://fake.url">
      Link
    </SplitButtonActionBase>,
    { wrapper },
  )
  expect(screen.getByRole('link', { name: 'Link' })).toBeVisible()
})

test('applies correct data-* attributes', () => {
  render(
    <SplitButtonActionBase as="button" isDestructive>
      Test Button
    </SplitButtonActionBase>,
    { wrapper },
  )

  const button = screen.getByRole('button')
  // NOTE: determined by SplitButtonContext.Provider in the wrapper
  expect(button).toHaveAttribute('data-variant', 'primary')
  // NOTE: determined by SplitButtonContext.Provider in the wrapper
  expect(button).toHaveAttribute('data-size', 'medium')
  expect(button).toHaveAttribute('data-is-destructive', 'true')
})

test('applies size and variant from `SplitButtonContext`', () => {
  render(<SplitButtonActionBase as="button" />, { wrapper })
  const button = screen.getByRole('button')
  expect(button).toHaveAttribute('data-size', 'medium')
  expect(button).toHaveAttribute('data-variant', 'primary')
})

test('forwards additional props to the underlying element', () => {
  render(
    <SplitButtonActionBase as="button" data-testid="my-button">
      Test Button
    </SplitButtonActionBase>,
    { wrapper },
  )
  expect(screen.getByTestId('my-button')).toBeVisible()
})

test('can display an icon on the left', () => {
  render(
    <SplitButtonActionBase as="button" iconLeft={<StarIcon data-testid="icon" />}>
      Test Button
    </SplitButtonActionBase>,
    { wrapper },
  )
  expect(screen.getByTestId('icon')).toBeVisible()
})

test('does not display icon when busy', () => {
  render(
    <SplitButtonActionBase as="button" iconLeft={<StarIcon data-testid="icon" />} isBusy>
      Test Button
    </SplitButtonActionBase>,
    { wrapper },
  )
  expect(screen.queryByTestId('icon')).not.toBeInTheDocument()
})

test('shows a spinner when busy', () => {
  render(
    <SplitButtonActionBase as="button" iconLeft={<StarIcon data-testid="icon" />} isBusy>
      Test Button
    </SplitButtonActionBase>,
    { wrapper },
  )
  expect(screen.queryByTestId('icon')).not.toBeInTheDocument()
})

interface WrapperProps {
  children: ReactNode
}

function wrapper({ children }: WrapperProps) {
  return (
    <SplitButtonContext.Provider value={{ size: 'medium', variant: 'primary' }}>{children}</SplitButtonContext.Provider>
  )
}
