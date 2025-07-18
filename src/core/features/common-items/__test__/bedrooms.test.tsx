import { render, screen } from '@testing-library/react'
import { FeaturesBedroomsItem } from '../bedrooms'

test('renders bedrooms feature item with correct accessible name and value', () => {
  render(<FeaturesBedroomsItem value={4} />)

  expect(screen.getByRole('term', { name: 'Bedrooms' })).toBeVisible()
  expect(screen.getByRole('definition').textContent).toBe('4')
})
