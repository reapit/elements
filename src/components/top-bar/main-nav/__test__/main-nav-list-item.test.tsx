import { render, screen } from '@testing-library/react'
import { TopBarMainNavListItem } from '../main-nav-list-item'

test('renders as a list item containing a navigation link', () => {
  render(
    <TopBarMainNavListItem href="https://example.com" aria-current={false}>
      My Link
    </TopBarMainNavListItem>,
  )

  const listItem = screen.getByRole('listitem')
  expect(listItem).toBeVisible()

  const link = screen.getByRole('link', { name: 'My Link' })
  expect(link).toBeVisible()
})

test('forwards props to the underlying nav item', () => {
  render(
    <TopBarMainNavListItem aria-current={false} data-testid="nav-item" href="https://example.com">
      My Link
    </TopBarMainNavListItem>,
  )

  const link = screen.getByTestId('nav-item')
  expect(link).toBeVisible()
})

test('has `aria-current="false"` when `aria-current={false}`', () => {
  render(
    <TopBarMainNavListItem href="https://example.com" aria-current={false}>
      My Link
    </TopBarMainNavListItem>,
  )

  const link = screen.getByRole('link')
  expect(link).toHaveAttribute('aria-current', 'false')
})

test('has `aria-current="page"` when `aria-current="page"`', () => {
  render(
    <TopBarMainNavListItem href="https://example.com" aria-current="page">
      My Link
    </TopBarMainNavListItem>,
  )

  const link = screen.getByRole('link')
  expect(link).toHaveAttribute('aria-current', 'page')
})

test('renders the correct href attribute', () => {
  render(
    <TopBarMainNavListItem href="https://custom-url.com" aria-current={false}>
      My Link
    </TopBarMainNavListItem>,
  )

  const link = screen.getByRole('link')
  expect(link).toHaveAttribute('href', 'https://custom-url.com')
})
