import { render, screen } from '@testing-library/react'
import { FeaturesLandSizeItem } from '../land-size'

test('renders land size feature item with correct accessible name and value', () => {
  render(<FeaturesLandSizeItem value="375 sq m" />)

  expect(screen.getByRole('term', { name: 'Land size' })).toBeVisible()
  expect(screen.getByRole('definition').textContent).toBe('375 sq m')
})
