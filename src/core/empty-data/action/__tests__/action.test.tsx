import { EmptyDataAction } from '../action'
import { render, screen } from '@testing-library/react'

test('renders as a link element', () => {
  render(<EmptyDataAction href="https://fake.url">Action</EmptyDataAction>)
  expect(screen.getByRole('link', { name: 'Action' })).toBeVisible()
})

test('is a medium sized button', () => {
  render(<EmptyDataAction href="https://fake.url">Action</EmptyDataAction>)
  expect(screen.getByRole('link')).toHaveAttribute('data-size', 'medium')
})

test('is a tertiary button', () => {
  render(<EmptyDataAction href="https://fake.url">Action</EmptyDataAction>)
  expect(screen.getByRole('link')).toHaveAttribute('data-variant', 'tertiary')
})

test("uses the tertiary button's link styling", () => {
  render(<EmptyDataAction href="https://fake.url">Action</EmptyDataAction>)
  expect(screen.getByRole('link')).toHaveAttribute('data-use-link-style', 'true')
})

test('forwards additional props to the link', () => {
  render(
    <EmptyDataAction data-testid="test-id" href="https://fake.url">
      Action
    </EmptyDataAction>,
  )
  expect(screen.getByTestId('test-id')).toBe(screen.getByRole('link'))
})
