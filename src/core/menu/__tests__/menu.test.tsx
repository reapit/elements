import { Menu } from '../menu'
import { render, screen } from '@testing-library/react'

const requiredProps = {
  'aria-labelledby': 'trigger-button',
  id: 'test-menu',
}

test('renders a menu element', () => {
  render(<Menu {...requiredProps}>Menu content</Menu>)
  expect(screen.getByRole('menu')).toBeVisible()
})

test('uses popover="auto"', () => {
  render(<Menu {...requiredProps}>Menu content</Menu>)
  expect(screen.getByRole('menu')).toHaveAttribute('popover', 'auto')
})

test('accepts consumer-supplied class names', () => {
  render(
    <Menu {...requiredProps} className="custom-class">
      Menu content
    </Menu>,
  )
  expect(screen.getByRole('menu')).toHaveClass('custom-class')
})

test('forwards additional props to the menu', () => {
  render(
    <Menu {...requiredProps} data-testid="test-id">
      Menu content
    </Menu>,
  )
  expect(screen.getByTestId('test-id')).toBeVisible()
})

test('exposes Menu.Item component', () => {
  expect(Menu.Item).toBeDefined()
})

test('exposes Menu.AnchorItem component', () => {
  expect(Menu.AnchorItem).toBeDefined()
})

test('exposes Menu.Divider component', () => {
  expect(Menu.Divider).toBeDefined()
})

test('exposes Menu.Group component', () => {
  expect(Menu.Group).toBeDefined()
})
