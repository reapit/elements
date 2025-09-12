import { fireEvent, render, screen } from '@testing-library/react'
import { BottomBarContext } from '../../context'
import { BottomBarMenuListItem } from '../menu-list-menu-item'
import { Menu } from '#src/core/menu'
import { StarIcon } from '#src/icons/star'

import type { ReactNode } from 'react'

test('renders as a list item containing a button', () => {
  render(
    <BottomBarMenuListItem aria-label="More" icon={<StarIcon />}>
      More
    </BottomBarMenuListItem>,
    { wrapper },
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
    { wrapper },
  )

  const button = screen.getByTestId('nav-item')
  expect(button).toBeVisible()
})

test('opens the menu when clicked', () => {
  render(
    <BottomBarMenuListItem aria-label="More" icon={<StarIcon />}>
      <Menu.Item>Item 1</Menu.Item>
      <Menu.Item>Item 2</Menu.Item>
      <Menu.Item>Item 3</Menu.Item>
    </BottomBarMenuListItem>,
    { wrapper },
  )

  const button = screen.getByRole('button')

  fireEvent.click(button)

  expect(screen.getByText('Item 1')).toBeVisible()
  expect(screen.getByText('Item 2')).toBeVisible()
  expect(screen.getByText('Item 3')).toBeVisible()
})

interface WrapperProps {
  children: ReactNode
}

function wrapper({ children }: WrapperProps) {
  return <BottomBarContext.Provider value={{ isOpen: true }}>{children}</BottomBarContext.Provider>
}
