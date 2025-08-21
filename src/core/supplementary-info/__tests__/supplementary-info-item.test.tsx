import { render, screen } from '@testing-library/react'
import { SupplementaryInfoItem } from '../supplementary-info-item'

test('renders a list item element with the expected content', () => {
  render(<SupplementaryInfoItem>Test content</SupplementaryInfoItem>)
  expect(screen.getByRole('listitem')).toBeVisible()
  // NOTE: The text content within the list item is NOT its accessible name.
  expect(screen.getByText('Test content')).toBeVisible()
})

test('uses inherit colour by default', () => {
  render(<SupplementaryInfoItem>Test content</SupplementaryInfoItem>)
  expect(screen.getByRole('listitem')).toHaveAttribute('data-colour', 'inherit')
})

test('applies the correct `data-colour` attribute', () => {
  render(<SupplementaryInfoItem colour="danger">Test content</SupplementaryInfoItem>)
  expect(screen.getByRole('listitem')).toHaveAttribute('data-colour', 'danger')
})

test('forwards additional props to the list item', () => {
  render(<SupplementaryInfoItem data-testid="test-id">Test content</SupplementaryInfoItem>)
  expect(screen.getByTestId('test-id')).toBeVisible()
})
