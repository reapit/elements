import { render, screen } from '@testing-library/react'
import { test, expect } from 'vitest'
import { SupplementaryInfo } from '../supplementary-info'

test('renders a list of supplementary information items', () => {
  render(
    <SupplementaryInfo>
      <SupplementaryInfo.Item colour="primary">Residential home</SupplementaryInfo.Item>
      <SupplementaryInfo.Item colour="primary">$500 per week</SupplementaryInfo.Item>
      <SupplementaryInfo.Item colour="danger">Expired 20 April</SupplementaryInfo.Item>
    </SupplementaryInfo>,
  )

  expect(screen.getByRole('list')).toBeVisible()
  expect(screen.getAllByRole('listitem')).toHaveLength(3)
})

test('applies the correct size class based on the size prop', () => {
  render(<SupplementaryInfo size="xs">Fake child</SupplementaryInfo>)
  expect(screen.getByRole('list')).toHaveAttribute('data-size', 'xs')
})

test('forwards additional props to the list element', () => {
  render(<SupplementaryInfo data-testid="test-id">Fake child</SupplementaryInfo>)
  expect(screen.getByTestId('test-id')).toBeVisible()
})
