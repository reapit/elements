import { render, screen } from '@testing-library/react'
import { TopBarSecondaryNav } from '../secondary-nav'

test('renders as a nav element with a ul child', () => {
  render(<TopBarSecondaryNav>Test</TopBarSecondaryNav>)

  const nav = screen.getByRole('navigation')
  expect(nav).toBeInTheDocument()
  expect(nav.tagName).toBe('NAV')

  const list = nav.querySelector('ul')
  expect(list).toBeInTheDocument()
  expect(list).toHaveTextContent('Test')
})

test('has a default aria-label of "Secondary navigation"', () => {
  render(<TopBarSecondaryNav>Test</TopBarSecondaryNav>)

  const nav = screen.getByRole('navigation')
  expect(nav).toHaveAttribute('aria-label', 'Secondary navigation')
})

test('allows overriding the aria-label', () => {
  render(<TopBarSecondaryNav aria-label="Custom label">Test</TopBarSecondaryNav>)

  const nav = screen.getByRole('navigation')
  expect(nav).toHaveAttribute('aria-label', 'Custom label')
})

test('forwards additional props to the nav element', () => {
  render(
    <TopBarSecondaryNav data-testid="test" className="custom-class">
      Test
    </TopBarSecondaryNav>,
  )

  const nav = screen.getByTestId('test')
  expect(nav).toHaveClass('custom-class')
})
