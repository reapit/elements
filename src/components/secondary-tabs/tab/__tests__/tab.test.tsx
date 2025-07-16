import { render, screen } from '@testing-library/react'
import { SecondaryTab } from '../tab'

test('renders a link element', () => {
  render(
    <SecondaryTab aria-current={false} href="/">
      Tab item
    </SecondaryTab>,
  )
  expect(screen.getByRole('link', { name: 'Tab item' })).toBeVisible()
})

test('has the specified `aria-current` attribute', () => {
  render(
    <SecondaryTab aria-current="page" href="/">
      Tab item
    </SecondaryTab>,
  )
  expect(screen.getByRole('link')).toHaveAttribute('aria-current', 'page')
})

test('passes through additional props to the link element', () => {
  render(
    <SecondaryTab aria-current="page" data-testid="custom-tab" href="/">
      Tab item
    </SecondaryTab>,
  )
  const link = screen.getByRole('link')
  expect(link).toHaveAttribute('data-testid', 'custom-tab')
})
