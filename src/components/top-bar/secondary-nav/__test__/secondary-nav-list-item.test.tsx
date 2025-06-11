import { render, screen } from '@testing-library/react'
import { Icon } from '../../../icon'
import { TopBarSecondaryNavListItem } from '../secondary-nav-list-item'

test('renders as a list item containing a navigation link', () => {
  render(
    <TopBarSecondaryNavListItem
      href="https://example.com"
      aria-current={false}
      aria-label="My nav item"
      icon={<Icon icon="star" />}
    />,
  )

  const listItem = screen.getByRole('listitem')
  expect(listItem).toBeVisible()

  const link = screen.getByRole('link', { name: 'My nav item' })
  expect(link).toBeVisible()
})

test('forwards props to the underlying nav icon item', () => {
  render(
    <TopBarSecondaryNavListItem
      href="https://example.com"
      aria-current={false}
      aria-label="My nav item"
      icon={<Icon icon="star" />}
      data-testid="nav-icon-item"
    />,
  )

  const link = screen.getByTestId('nav-icon-item')
  expect(link).toBeVisible()
})

test('has `aria-current="false"` when `aria-current={false}`', () => {
  render(
    <TopBarSecondaryNavListItem
      href="https://example.com"
      aria-current={false}
      aria-label="My nav item"
      icon={<Icon icon="star" />}
    />,
  )

  const link = screen.getByRole('link')
  expect(link).toHaveAttribute('aria-current', 'false')
})

test('has `aria-current="page"` when `aria-current="page"`', () => {
  render(
    <TopBarSecondaryNavListItem
      href="https://example.com"
      aria-current="page"
      aria-label="My nav item"
      icon={<Icon icon="star" />}
    />,
  )

  const link = screen.getByRole('link')
  expect(link).toHaveAttribute('aria-current', 'page')
})

test('renders the correct href attribute', () => {
  render(
    <TopBarSecondaryNavListItem
      href="https://custom-url.com"
      aria-current={false}
      aria-label="My nav item"
      icon={<Icon icon="star" />}
    />,
  )

  const link = screen.getByRole('link')
  expect(link).toHaveAttribute('href', 'https://custom-url.com')
})

test('can display a badge when `hasBadge` is `true`', () => {
  render(
    <TopBarSecondaryNavListItem
      href="https://example.com"
      aria-current={false}
      aria-label="Notifications"
      icon={<Icon icon="notification" />}
      hasBadge={true}
    />,
  )

  const link = screen.getByRole('link', { name: 'Notifications' })
  expect(link.querySelector('span')).toBeVisible()
})
