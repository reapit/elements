import { TopBarMenuDrawer } from '../menu-drawer'
import { render, screen } from '@testing-library/react'

test('renders dialog element', () => {
  render(
    <TopBarMenuDrawer isOpen>
      <div>Menu content</div>
    </TopBarMenuDrawer>,
  )

  expect(screen.getByRole('dialog')).toBeVisible()
})

test('renders children', () => {
  render(
    <TopBarMenuDrawer isOpen>
      <div>Menu content</div>
    </TopBarMenuDrawer>,
  )

  expect(screen.getByText('Menu content')).toBeVisible()
})

test('applies custom className', () => {
  render(
    <TopBarMenuDrawer isOpen className="custom-class" data-testid="menu-drawer">
      <div>Content</div>
    </TopBarMenuDrawer>,
  )

  expect(screen.getByTestId('menu-drawer')).toHaveClass('custom-class')
})

test('uses aria-label when provided', () => {
  render(
    <TopBarMenuDrawer isOpen aria-label="Navigation menu">
      <div>Content</div>
    </TopBarMenuDrawer>,
  )

  expect(screen.getByRole('dialog', { name: 'Navigation menu' })).toBeVisible()
})

test('uses aria-labelledby when provided and no aria-label', () => {
  render(
    <>
      <h2 id="menu-title">Menu Title</h2>
      <TopBarMenuDrawer isOpen aria-labelledby="menu-title">
        <div>Content</div>
      </TopBarMenuDrawer>
    </>,
  )

  expect(screen.getByRole('dialog', { name: 'Menu Title' })).toBeVisible()
})

test('forwards additional props to dialog element', () => {
  render(
    <TopBarMenuDrawer isOpen data-testid="menu-drawer">
      <div>Content</div>
    </TopBarMenuDrawer>,
  )

  expect(screen.getByTestId('menu-drawer')).toBeVisible()
})

test('exposes TopBarMenuDrawer.Header', () => {
  expect(TopBarMenuDrawer.Header).toBeDefined()
})

test('exposes TopBarMenuDrawer.getClosestDialogElement', () => {
  expect(TopBarMenuDrawer.getClosestDialogElement).toBeDefined()
})
