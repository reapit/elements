import { render, screen } from '@testing-library/react'
import { TopBarAvatarMenu } from '../avatar-menu'

test('renders a button element', () => {
  render(<TopBarAvatarMenu initials="AA">Fake child</TopBarAvatarMenu>)

  const button = screen.getByRole('button', { name: 'Profile menu' })
  expect(button).toBeVisible()
})

test('forwards props to the underlying button', () => {
  render(
    <TopBarAvatarMenu data-testid="nav-item" initials="AA">
      Fake child
    </TopBarAvatarMenu>,
  )

  const button = screen.getByTestId('nav-item')
  expect(button.tagName).toBe('BUTTON')
  expect(button).toBeVisible()
})

test('will open the menu when clicked', () => {
  render(<TopBarAvatarMenu initials="AA">Fake child</TopBarAvatarMenu>)

  const button = screen.getByRole('button')
  const menu = screen.getByRole('menu')

  expect(button).toHaveAttribute('popovertarget', menu.id)
})

test('menu is labelled by the button', () => {
  render(<TopBarAvatarMenu initials="AA">Fake child</TopBarAvatarMenu>)
  expect(screen.getByRole('menu', { name: 'Profile menu' })).toBeVisible()
})
