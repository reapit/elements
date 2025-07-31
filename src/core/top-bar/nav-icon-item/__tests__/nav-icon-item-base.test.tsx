import { TopBarNavIconItemBase } from '../nav-icon-item-base'
import { render, screen } from '@testing-library/react'

test('renders as a button when as="button"', () => {
  render(<TopBarNavIconItemBase aria-label="My Item" as="button" icon="Icon" />)
  expect(screen.getByRole('button', { name: 'My Item' })).toBeVisible()
})

test('renders as a link when as="a"', () => {
  render(<TopBarNavIconItemBase aria-label="My Item" as="a" href="http://fake.url" icon="Icon" />)
  expect(screen.getByRole('link', { name: 'My Item' })).toBeVisible()
})

test('forwards additional props to the underlying element', () => {
  render(<TopBarNavIconItemBase aria-label="My Item" as="button" data-testid="nav-icon-item" icon="Icon" />)
  expect(screen.getByTestId('nav-icon-item')).toBeVisible()
})

test('can display a badge', () => {
  render(<TopBarNavIconItemBase aria-label="My Item" as="button" hasBadge icon="Icon" />)
  const button = screen.getByRole('button', { name: 'My Item' })
  expect(button.querySelector('span')).toBeVisible()
})
