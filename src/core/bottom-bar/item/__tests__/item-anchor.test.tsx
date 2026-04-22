import { render, screen } from '@testing-library/react'
import { BottomBarItemAnchor } from '../item-anchor'
import { NotificationIcon } from '#src/icons/notification'
import { StarIcon } from '#src/icons/star'

test('renders as a link with an accessible name', () => {
  render(
    <BottomBarItemAnchor aria-current={false} href="#" icon={<StarIcon />} aria-label="My Item">
      Label
    </BottomBarItemAnchor>,
  )
  expect(screen.getByRole('link', { name: 'My Item' })).toBeVisible()
})

test('forwards additional props to the link element', () => {
  const testId = 'nav-icon-item'
  render(
    <BottomBarItemAnchor aria-current={false} href="#" icon={<StarIcon />} data-testid={testId}>
      Label
    </BottomBarItemAnchor>,
  )

  const item = screen.getByTestId(testId)
  expect(item).toBeVisible()
})

test('can display a badge when `hasBadge` is `true`', () => {
  render(
    <BottomBarItemAnchor aria-current={false} href="#" icon={<NotificationIcon />} hasBadge>
      Notifications
    </BottomBarItemAnchor>,
  )
  const button = screen.getByRole('link', { name: 'Notifications' })
  expect(button.querySelector('span')).toBeVisible()
})
