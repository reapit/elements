import { fireEvent, render, screen } from '@testing-library/react'
import { NotificationIcon } from '#src/icons/notification'
import { StarIcon } from '#src/icons/star'
import { TopBarSecondaryNavListItemButton } from '../secondary-nav-list-item-button'

test('renders as a list item containing a button', () => {
  render(<TopBarSecondaryNavListItemButton aria-current={false} aria-label="My nav item" icon={<StarIcon />} />)

  const listItem = screen.getByRole('listitem')
  expect(listItem).toBeVisible()

  const button = screen.getByRole('button', { name: 'My nav item' })
  expect(button).toBeVisible()
})

test('forwards props to the underlying nav icon item', () => {
  render(
    <TopBarSecondaryNavListItemButton
      aria-current={false}
      aria-label="My nav item"
      icon={<StarIcon />}
      data-testid="nav-icon-item"
    />,
  )

  const button = screen.getByTestId('nav-icon-item')
  expect(button).toBeVisible()
})

test('has `aria-current="false"` when `aria-current={false}`', () => {
  render(<TopBarSecondaryNavListItemButton aria-current={false} aria-label="My nav item" icon={<StarIcon />} />)

  const button = screen.getByRole('button')
  expect(button).toHaveAttribute('aria-current', 'false')
})

test('has `aria-current="page"` when `aria-current="page"`', () => {
  render(<TopBarSecondaryNavListItemButton aria-current="page" aria-label="My nav item" icon={<StarIcon />} />)

  const button = screen.getByRole('button')
  expect(button).toHaveAttribute('aria-current', 'page')
})

test('calls onClick handler', () => {
  const onClick = vi.fn()
  render(
    <TopBarSecondaryNavListItemButton
      aria-current={false}
      aria-label="My nav item"
      icon={<StarIcon />}
      onClick={onClick}
    />,
  )

  fireEvent.click(screen.getByRole('button'))
  expect(onClick).toHaveBeenCalled()
})

test('can display a badge when `hasBadge` is `true`', () => {
  render(
    <TopBarSecondaryNavListItemButton
      aria-current={false}
      aria-label="Notifications"
      icon={<NotificationIcon />}
      hasBadge={true}
    />,
  )

  const button = screen.getByRole('button', { name: 'Notifications' })
  expect(button.querySelector('span')).toBeVisible()
})
