import { render, screen } from '@testing-library/react'
import { FeaturesCarSpacesItem } from '../car-spaces'

test('renders car spaces feature item with correct accessible name and value', () => {
  render(<FeaturesCarSpacesItem value={2} />)

  expect(screen.getByRole('term', { name: 'Car spaces' })).toBeVisible()
  expect(screen.getByRole('definition').textContent).toBe('2')
})
