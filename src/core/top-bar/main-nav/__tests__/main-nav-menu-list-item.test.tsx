import { fireEvent, render, screen } from '@testing-library/react'
import { DeprecatedMenu } from '#src/deprecated/menu'
import { TopBarMainNavMenuListItem } from '../main-nav-menu-list-item'

test('renders as a list item containing a button', () => {
  render(<TopBarMainNavMenuListItem label="More">More</TopBarMainNavMenuListItem>)

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

test('opens the menu when clicked', () => {
  render(
    <TopBarMainNavMenuListItem label="More">
      <DeprecatedMenu.Item label="Item 1" />
      <DeprecatedMenu.Item label="Item 2" />
      <DeprecatedMenu.Item label="Item 3" />
    </TopBarMainNavMenuListItem>,
  )

  const button = screen.getByRole('button')

  fireEvent.click(button)

  expect(button).toHaveAttribute('aria-expanded', 'true')
  expect(screen.getByText('Item 1')).toBeVisible()
  expect(screen.getByText('Item 2')).toBeVisible()
  expect(screen.getByText('Item 3')).toBeVisible()
})
