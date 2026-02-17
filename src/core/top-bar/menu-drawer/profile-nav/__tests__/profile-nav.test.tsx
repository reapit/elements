import { TopBarMenuDrawerProfileNav } from '../profile-nav'
import { render, screen } from '@testing-library/react'

test('renders with default aria-label', () => {
  render(
    <TopBarMenuDrawerProfileNav>
      <li>Item 1</li>
    </TopBarMenuDrawerProfileNav>,
  )

  expect(screen.getByRole('list', { name: 'Profile navigation' })).toBeVisible()
})

test('renders with custom aria-label', () => {
  render(
    <TopBarMenuDrawerProfileNav aria-label="Custom profile nav">
      <li>Item 1</li>
    </TopBarMenuDrawerProfileNav>,
  )

  expect(screen.getByRole('list', { name: 'Custom profile nav' })).toBeVisible()
})

test('renders children', () => {
  render(
    <TopBarMenuDrawerProfileNav>
      <li>Item 1</li>
      <li>Item 2</li>
    </TopBarMenuDrawerProfileNav>,
  )

  expect(screen.getByText('Item 1')).toBeVisible()
  expect(screen.getByText('Item 2')).toBeVisible()
})

test('applies custom className', () => {
  render(
    <TopBarMenuDrawerProfileNav className="custom-class" data-testid="profile-nav">
      <li>Item 1</li>
    </TopBarMenuDrawerProfileNav>,
  )

  expect(screen.getByTestId('profile-nav')).toHaveClass('custom-class')
})

test('forwards additional props', () => {
  render(
    <TopBarMenuDrawerProfileNav data-testid="profile-nav" data-custom="value">
      <li>Item 1</li>
    </TopBarMenuDrawerProfileNav>,
  )

  const element = screen.getByTestId('profile-nav')
  expect(element).toBeVisible()
  expect(element).toHaveAttribute('data-custom', 'value')
})

test('has correct displayName', () => {
  expect(TopBarMenuDrawerProfileNav.displayName).toBe('TopBar.MenuProfileNav')
})
