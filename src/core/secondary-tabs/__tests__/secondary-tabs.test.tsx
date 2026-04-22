import { render, screen } from '@testing-library/react'
import { SecondaryTabs } from '../secondary-tabs'

const children = [
  <SecondaryTabs.Item key="apples" href="#" aria-current={false}>
    Apples
  </SecondaryTabs.Item>,
  <SecondaryTabs.Item key="bananas" aria-current={false} href="#">
    Bananas
  </SecondaryTabs.Item>,
  <SecondaryTabs.Item key="peaches" aria-current={false} href="#">
    Peaches
  </SecondaryTabs.Item>,
  <SecondaryTabs.Item key="strawberries" aria-current={false} href="#">
    Strawberries
  </SecondaryTabs.Item>,
  <SecondaryTabs.Item key="watermelon" aria-current={false} href="#">
    Watermelon
  </SecondaryTabs.Item>,
]

test('renders as a navigation element with a list', () => {
  render(<SecondaryTabs>{children}</SecondaryTabs>)
  expect(screen.getByRole('navigation')).toBeVisible()
  expect(screen.getByRole('list')).toBeVisible()
})

test('has a default data-overflow of "visible"', () => {
  render(<SecondaryTabs>{children}</SecondaryTabs>)
  expect(screen.getByRole('navigation')).toHaveAttribute('data-overflow', 'visible')
})

test('allows overriding the data-overflow', () => {
  render(<SecondaryTabs overflow="scroll">{children}</SecondaryTabs>)
  expect(screen.getByRole('navigation')).toHaveAttribute('data-overflow', 'scroll')
})

test('forwards additional props to the nav element', () => {
  render(<SecondaryTabs data-testid="test">{children}</SecondaryTabs>)
  expect(screen.getByTestId('test')).toBeVisible()
})
