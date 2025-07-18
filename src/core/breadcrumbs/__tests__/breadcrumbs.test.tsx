import { render, screen } from '@testing-library/react'
import { Breadcrumbs } from '../breadcrumbs'

test('renders a navigation element with a list element as its child', () => {
  render(<Breadcrumbs>Fake children</Breadcrumbs>)

  const navigation = screen.getByRole('navigation')
  const list = screen.getByRole('list')

  expect(navigation).toBeVisible()
  expect(list).toBeVisible()
  expect(navigation.children[0]).toBe(list)
})

test('has no `data-width` attribute by default', () => {
  render(<Breadcrumbs>Fake children</Breadcrumbs>)
  expect(screen.getByRole('navigation')).not.toHaveAttribute('data-width')
})

test('has `data-overflow` attribute when `overflow` is specified', () => {
  render(<Breadcrumbs overflow="scroll">Fake children</Breadcrumbs>)
  expect(screen.getByRole('navigation')).toHaveAttribute('data-overflow', 'scroll')
})

test('forwards additional attributes to the navigation element', () => {
  render(<Breadcrumbs data-testid="breadcrumbs">Fake children</Breadcrumbs>)
  expect(screen.getByTestId('breadcrumbs')).toBeVisible()
})
