import { Menu } from '#src/core/menu'
import { render, screen } from '@testing-library/react'
import { SplitButtonContext } from '../context'
import { SplitButtonMenu } from '../split-button-menu'

import type { ReactNode } from 'react'

test('renders as a button', () => {
  render(
    <SplitButtonMenu aria-label="More">
      <Menu.Item>Item 1</Menu.Item>
      <Menu.Item>Item 2</Menu.Item>
      <Menu.Item>Item 3</Menu.Item>
    </SplitButtonMenu>,
    { wrapper },
  )

  const button = screen.getByRole('button', { name: 'More' })
  expect(button).toBeVisible()
})

test('forwards props to the underlying button', () => {
  render(
    <SplitButtonMenu data-testid="nav-item" aria-label="More">
      Fake child
    </SplitButtonMenu>,
    { wrapper },
  )

  expect(screen.getByTestId('nav-item')).toBeInstanceOf(HTMLButtonElement)
})

test('will open the menu when clicked', () => {
  render(
    <SplitButtonMenu aria-label="More">
      <Menu.Item>Item 1</Menu.Item>
      <Menu.Item>Item 2</Menu.Item>
      <Menu.Item>Item 3</Menu.Item>
    </SplitButtonMenu>,
    { wrapper },
  )

  const button = screen.getByRole('button')
  const menu = screen.getByRole('menu')

  expect(button).toHaveAttribute('popovertarget', menu.id)
})

test('menu is labelled by the button', () => {
  render(<SplitButtonMenu aria-label="More">Fake item</SplitButtonMenu>, { wrapper })
  expect(screen.getByRole('menu', { name: 'More' })).toBeVisible()
})

interface WrapperProps {
  children: ReactNode
}

function wrapper({ children }: WrapperProps) {
  return (
    <SplitButtonContext.Provider value={{ size: 'medium', variant: 'primary' }}>{children}</SplitButtonContext.Provider>
  )
}
