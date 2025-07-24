import { fireEvent, render, screen } from '@testing-library/react'
import { Menu } from '#src/deprecated/menu'
import { SplitButtonContext } from '../context'
import { SplitButtonMenu } from '../split-button-menu'

import type { ReactNode } from 'react'

test('renders as a button', () => {
  render(
    <SplitButtonMenu aria-label="More">
      <Menu.Item label="Item 1" />
      <Menu.Item label="Item 2" />
      <Menu.Item label="Item 3" />
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

test('opens the menu when clicked', () => {
  render(
    <SplitButtonMenu aria-label="More">
      <Menu.Item label="Item 1" />
      <Menu.Item label="Item 2" />
      <Menu.Item label="Item 3" />
    </SplitButtonMenu>,
    { wrapper },
  )

  const button = screen.getByRole('button')

  fireEvent.click(button)

  expect(button).toHaveAttribute('aria-expanded', 'true')
  expect(screen.getByText('Item 1')).toBeVisible()
  expect(screen.getByText('Item 2')).toBeVisible()
  expect(screen.getByText('Item 3')).toBeVisible()
})

interface WrapperProps {
  children: ReactNode
}

function wrapper({ children }: WrapperProps) {
  return (
    <SplitButtonContext.Provider value={{ size: 'medium', variant: 'primary' }}>{children}</SplitButtonContext.Provider>
  )
}
