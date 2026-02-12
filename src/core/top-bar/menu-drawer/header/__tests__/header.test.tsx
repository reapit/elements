import { TopBarMenuDrawer } from '../../menu-drawer'
import { render, screen } from '@testing-library/react'

function Wrapper({ children }: { children: React.ReactNode }) {
  return <TopBarMenuDrawer isOpen>{children}</TopBarMenuDrawer>
}

test('renders a header element', () => {
  render(<TopBarMenuDrawer.Header />, { wrapper: Wrapper })
  expect(screen.getByRole('banner')).toBeVisible()
})

test('renders default close button when no action provided', () => {
  render(<TopBarMenuDrawer.Header />, { wrapper: Wrapper })
  expect(screen.getByRole('button', { name: 'Close menu' })).toBeVisible()
})

test('forwards additional props to header element', () => {
  render(<TopBarMenuDrawer.Header data-testid="header" />, { wrapper: Wrapper })
  expect(screen.getByTestId('header')).toBeVisible()
})
