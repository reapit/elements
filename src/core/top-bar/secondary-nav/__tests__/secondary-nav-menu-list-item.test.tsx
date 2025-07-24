import { fireEvent, render, screen } from '@testing-library/react'
import { Menu } from '#src/deprecated/menu'
import { StarIcon } from '#src/icons/star'
import { TopBarSecondaryNavMenuListItem } from '../secondary-nav-menu-list-item'

test('renders as a list item containing a button', () => {
  render(
    <TopBarSecondaryNavMenuListItem aria-label="More" icon={<StarIcon />}>
      More
    </TopBarSecondaryNavMenuListItem>,
  )

  const listItem = screen.getByRole('listitem')
  expect(listItem).toBeVisible()

  const button = screen.getByRole('button', { name: 'More' })
  expect(button).toBeVisible()
})

test('forwards props to the underlying nav item', () => {
  render(
    <TopBarSecondaryNavMenuListItem data-testid="nav-item" aria-label="More" icon={<StarIcon />}>
      Fake child
    </TopBarSecondaryNavMenuListItem>,
  )

  const button = screen.getByTestId('nav-item')
  expect(button).toBeVisible()
})

test('opens the menu when clicked', () => {
  render(
    <TopBarSecondaryNavMenuListItem aria-label="More" icon={<StarIcon />}>
      <Menu.Item label="Item 1" />
      <Menu.Item label="Item 2" />
      <Menu.Item label="Item 3" />
    </TopBarSecondaryNavMenuListItem>,
  )

  const button = screen.getByRole('button')

  fireEvent.click(button)

  expect(button).toHaveAttribute('aria-expanded', 'true')
  expect(screen.getByText('Item 1')).toBeVisible()
  expect(screen.getByText('Item 2')).toBeVisible()
  expect(screen.getByText('Item 3')).toBeVisible()
})
