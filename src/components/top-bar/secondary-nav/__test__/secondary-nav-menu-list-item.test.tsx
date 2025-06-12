import { fireEvent, render, screen } from '@testing-library/react'
import { Menu } from '#src/components/menu'
import { TopBarSecondaryNavMenuListItem } from '../secondary-nav-menu-list-item'
import { Icon } from '#src/components/icon'

test('renders as a list item containing a button', () => {
  render(
    <TopBarSecondaryNavMenuListItem aria-label="More" icon={<Icon icon="star" />}>
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
    <TopBarSecondaryNavMenuListItem data-testid="nav-item" aria-label="More" icon={<Icon icon="star" />}>
      Fake child
    </TopBarSecondaryNavMenuListItem>,
  )

  const button = screen.getByTestId('nav-item')
  expect(button).toBeVisible()
})

test('opens the menu when clicked', () => {
  render(
    <TopBarSecondaryNavMenuListItem aria-label="More" icon={<Icon icon="star" />}>
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
