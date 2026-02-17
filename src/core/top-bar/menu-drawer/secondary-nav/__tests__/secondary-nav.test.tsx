import { TopBarMenuDrawerSecondaryNav } from '../secondary-nav'
import { render, screen } from '@testing-library/react'

test('renders with default aria-label', () => {
  render(
    <TopBarMenuDrawerSecondaryNav>
      <li>Item 1</li>
    </TopBarMenuDrawerSecondaryNav>,
  )

  expect(screen.getByRole('list', { name: 'Secondary navigation' })).toBeVisible()
})

test('renders with custom aria-label', () => {
  render(
    <TopBarMenuDrawerSecondaryNav aria-label="Custom secondary nav">
      <li>Item 1</li>
    </TopBarMenuDrawerSecondaryNav>,
  )

  expect(screen.getByRole('list', { name: 'Custom secondary nav' })).toBeVisible()
})

test('renders children', () => {
  render(
    <TopBarMenuDrawerSecondaryNav>
      <li>Item 1</li>
      <li>Item 2</li>
    </TopBarMenuDrawerSecondaryNav>,
  )

  expect(screen.getByText('Item 1')).toBeVisible()
  expect(screen.getByText('Item 2')).toBeVisible()
})

test('applies custom className', () => {
  render(
    <TopBarMenuDrawerSecondaryNav className="custom-class" data-testid="secondary-nav">
      <li>Item 1</li>
    </TopBarMenuDrawerSecondaryNav>,
  )

  expect(screen.getByTestId('secondary-nav')).toHaveClass('custom-class')
})

test('forwards additional props', () => {
  render(
    <TopBarMenuDrawerSecondaryNav data-testid="secondary-nav" data-custom="value">
      <li>Item 1</li>
    </TopBarMenuDrawerSecondaryNav>,
  )

  const element = screen.getByTestId('secondary-nav')
  expect(element).toBeVisible()
  expect(element).toHaveAttribute('data-custom', 'value')
})

test('has correct displayName', () => {
  expect(TopBarMenuDrawerSecondaryNav.displayName).toBe('TopBar.MenuSecondaryNav')
})
