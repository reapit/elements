import { render, screen } from '@testing-library/react'
import { TopBarMainNavMenuListItem } from '../main-nav-menu-list-item'

test('renders as a list item containing a button', () => {
  render(<TopBarMainNavMenuListItem label="More">Fake child</TopBarMainNavMenuListItem>)

  const listItem = screen.getByRole('listitem')
  expect(listItem).toBeVisible()

  const button = screen.getByRole('button', { name: 'More' })
  expect(button).toBeVisible()
})

test('forwards props to the underlying nav item', () => {
  render(
    <TopBarMainNavMenuListItem data-testid="nav-item" label="More">
      Fake child
    </TopBarMainNavMenuListItem>,
  )

  const button = screen.getByTestId('nav-item')
  expect(button).toBeVisible()
})

test('will open the menu when clicked', () => {
  render(<TopBarMainNavMenuListItem label="More">Fake child</TopBarMainNavMenuListItem>)

  const button = screen.getByRole('button')
  const menu = screen.getByRole('menu')

  expect(button).toHaveAttribute('popovertarget', menu.id)
})

test('menu is labelled by the button', () => {
  render(<TopBarMainNavMenuListItem label="More">Fake child</TopBarMainNavMenuListItem>)
  expect(screen.getByRole('menu', { name: 'More' })).toBeVisible()
})
