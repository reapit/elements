import { render, screen } from '@testing-library/react'
import { TopBarMenuDrawerSubmenuItem } from '../submenu-item'

test('renders a link', () => {
  render(
    <TopBarMenuDrawerSubmenuItem href="/settings/profile" aria-current={false} hasBadge={false}>
      Profile
    </TopBarMenuDrawerSubmenuItem>,
  )
  expect(screen.getByRole('link', { name: 'Profile' })).toBeVisible()
})

test('has `aria-current="false"` attribute when it does NOT represent the current page', () => {
  render(
    <TopBarMenuDrawerSubmenuItem href="/settings/profile" aria-current={false} hasBadge={false}>
      Profile
    </TopBarMenuDrawerSubmenuItem>,
  )
  expect(screen.getByRole('link', { name: 'Profile' })).toHaveAttribute('aria-current', 'false')
})

test('has `aria-current="page"` attribute when it represents the current page', () => {
  render(
    <TopBarMenuDrawerSubmenuItem href="/settings/profile" aria-current="page" hasBadge={false}>
      Profile
    </TopBarMenuDrawerSubmenuItem>,
  )
  expect(screen.getByRole('link', { name: 'Profile' })).toHaveAttribute('aria-current', 'page')
})

test('has correct href attribute', () => {
  render(
    <TopBarMenuDrawerSubmenuItem href="/settings/profile" aria-current={false} hasBadge={false}>
      Profile
    </TopBarMenuDrawerSubmenuItem>,
  )
  expect(screen.getByRole('link')).toHaveAttribute('href', '/settings/profile')
})

test('does not render badge when hasBadge is false', () => {
  render(
    <TopBarMenuDrawerSubmenuItem href="/settings/profile" aria-current={false} hasBadge={false}>
      Profile
    </TopBarMenuDrawerSubmenuItem>,
  )
  const link = screen.getByRole('link')
  const spans = link.querySelectorAll('span')
  // Should only have the label span, not the badge span
  expect(spans.length).toBe(1)
})

test('renders badge when hasBadge is true', () => {
  render(
    <TopBarMenuDrawerSubmenuItem href="/settings/profile" aria-current={false} hasBadge>
      Profile
    </TopBarMenuDrawerSubmenuItem>,
  )
  const link = screen.getByRole('link')
  const spans = link.querySelectorAll('span')
  // Should have both label and badge spans
  expect(spans.length).toBe(2)
})
