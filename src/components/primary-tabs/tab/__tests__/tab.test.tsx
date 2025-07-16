import { render, screen } from '@testing-library/react'
import { PrimaryTab } from '../tab'

test('renders a link element', () => {
  render(
    <PrimaryTab aria-current={false} href="/">
      Tab item
    </PrimaryTab>,
  )
  expect(screen.getByRole('link', { name: 'Tab item' })).toBeVisible()
})

test('has the specified `aria-current` attribute', () => {
  render(
    <PrimaryTab aria-current="page" href="/">
      Tab item
    </PrimaryTab>,
  )
  expect(screen.getByRole('link')).toHaveAttribute('aria-current', 'page')
})

test('passes through additional props to the link element', () => {
  render(
    <PrimaryTab aria-current="page" data-testid="custom-tab" href="/">
      Tab item
    </PrimaryTab>,
  )
  const link = screen.getByRole('link')
  expect(link).toHaveAttribute('data-testid', 'custom-tab')
})
