import { fireEvent, render, screen } from '@testing-library/react'
import { BottomBarMenuListItem } from '../menu-list-menu-item'
import { StarIcon } from '#src/icons/star'
import { Menu } from '#src/core/menu/menu'

test('renders as a list item containing a button', () => {
  render(
    <BottomBarMenuListItem aria-label="More" icon={<StarIcon />}>
      More
    </BottomBarMenuListItem>,
  )

  const listItem = screen.getByRole('listitem')
  expect(listItem).toBeVisible()

  const button = screen.getByRole('button', { name: 'More' })
  expect(button).toBeVisible()
})

test('forwards props to the underlying nav item', () => {
  render(
    <BottomBarMenuListItem data-testid="nav-item" aria-label="More" icon={<StarIcon />}>
      Fake child
    </BottomBarMenuListItem>,
  )

  const button = screen.getByTestId('nav-item')
  expect(button).toBeVisible()
})

test('opens the menu when clicked', () => {
  render(
    <BottomBarMenuListItem aria-label="More" icon={<StarIcon />}>
      <Menu.Item label="Item 1" />
      <Menu.Item label="Item 2" />
      <Menu.Item label="Item 3" />
    </BottomBarMenuListItem>,
  )

  const button = screen.getByRole('button')

  fireEvent.click(button)

  expect(button).toHaveAttribute('aria-expanded', 'true')
  expect(screen.getByText('Item 1')).toBeVisible()
  expect(screen.getByText('Item 2')).toBeVisible()
  expect(screen.getByText('Item 3')).toBeVisible()
})
