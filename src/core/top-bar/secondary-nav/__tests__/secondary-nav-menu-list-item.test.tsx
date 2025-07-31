import { render, screen } from '@testing-library/react'
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
      Fake item
    </TopBarSecondaryNavMenuListItem>,
  )

  const button = screen.getByRole('button')
  const menu = screen.getByRole('menu')

  expect(button).toHaveAttribute('popovertarget', menu.id)
})

test('menu is labelled by the button', () => {
  render(
    <TopBarSecondaryNavMenuListItem aria-label="More" icon={<StarIcon />}>
      Fake child
    </TopBarSecondaryNavMenuListItem>,
  )
  expect(screen.getByRole('menu', { name: 'More' })).toBeVisible()
})
