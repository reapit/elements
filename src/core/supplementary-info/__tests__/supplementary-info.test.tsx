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

test('uses inherit colour by default', () => {
  render(<SupplementaryInfo>Test content</SupplementaryInfo>)
  expect(screen.getByRole('list')).toHaveAttribute('data-colour', 'inherit')
})

test('applies the correct colour attribute based on the colour prop', () => {
  render(<SupplementaryInfo colour="primary">Fake child</SupplementaryInfo>)
  expect(screen.getByRole('list')).toHaveAttribute('data-colour', 'primary')
})

test('applies the correct size attribute based on the size prop', () => {
  render(<SupplementaryInfo size="xs">Fake child</SupplementaryInfo>)
  expect(screen.getByRole('list')).toHaveAttribute('data-size', 'xs')
})

test('forwards additional props to the list element', () => {
  render(<SupplementaryInfo data-testid="test-id">Fake child</SupplementaryInfo>)
  expect(screen.getByTestId('test-id')).toBeVisible()
})
