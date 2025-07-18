import { render, screen } from '@testing-library/react'
import { FeaturesBathroomsItem } from '../bathrooms'

test('renders bathrooms feature item with correct accessible name and value', () => {
  render(<FeaturesBathroomsItem value={2.5} />)

  expect(screen.getByRole('term', { name: 'Bathrooms' })).toBeVisible()
  expect(screen.getByRole('definition').textContent).toBe('2.5')
})
