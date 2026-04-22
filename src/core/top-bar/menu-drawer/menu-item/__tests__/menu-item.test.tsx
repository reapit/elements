import { render, screen } from '@testing-library/react'
import { TopBarMenuDrawerMenuItem } from '../menu-item'
import { elTopBarMenuDrawerMenuItem } from '../styles'

test('renders a link', () => {
  render(
    <TopBarMenuDrawerMenuItem href="/dashboard" aria-current={false}>
      Item
    </TopBarMenuDrawerMenuItem>,
  )
  expect(screen.getByRole('link', { name: 'Item' })).toBeVisible()
})

test(`combines the .${elTopBarMenuDrawerMenuItem} and consumer-supplied classes correctly`, () => {
  render(
    <TopBarMenuDrawerMenuItem href="/dashboard" aria-current={false} className="my-custom-class">
      Dashboard
    </TopBarMenuDrawerMenuItem>,
  )
  expect(screen.getByRole('link')).toHaveAttribute('class', `${elTopBarMenuDrawerMenuItem} my-custom-class`)
})

test('has `aria-current="false"` attribute when it does NOT represent the current page', () => {
  render(
    <TopBarMenuDrawerMenuItem href="/dashboard" aria-current={false}>
      Item
    </TopBarMenuDrawerMenuItem>,
  )
  expect(screen.getByRole('link', { name: 'Item' })).toHaveAttribute('aria-current', 'false')
})

test('has `aria-current="page"` attribute when it represents the current page', () => {
  render(
    <TopBarMenuDrawerMenuItem href="/dashboard" aria-current="page">
      Item
    </TopBarMenuDrawerMenuItem>,
  )
  expect(screen.getByRole('link', { name: 'Item' })).toHaveAttribute('aria-current', 'page')
})

test('has correct href attribute', () => {
  render(
    <TopBarMenuDrawerMenuItem href="/test" aria-current={false}>
      Dashboard
    </TopBarMenuDrawerMenuItem>,
  )
  expect(screen.getByRole('link')).toHaveAttribute('href', '/test')
})

test('does not render badge when hasBadge is false', () => {
  render(
    <TopBarMenuDrawerMenuItem href="/dashboard" aria-current={false}>
      Dashboard
    </TopBarMenuDrawerMenuItem>,
  )
  // Badge spans have 2 children: label and potentially badge
  const link = screen.getByRole('link')
  const spans = link.querySelectorAll('span')
  // Should only have the label span, not the badge span
  expect(spans.length).toBe(1)
})

test('renders badge when hasBadge is true', () => {
  render(
    <TopBarMenuDrawerMenuItem href="/dashboard" aria-current={false} hasBadge>
      Dashboard
    </TopBarMenuDrawerMenuItem>,
  )
  const link = screen.getByRole('link')
  const spans = link.querySelectorAll('span')
  // Should have both label and badge spans
  expect(spans.length).toBe(2)
})
