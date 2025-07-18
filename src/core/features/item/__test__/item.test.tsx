import { StarIcon } from '#src/icons/star'
import { render, screen } from '@testing-library/react'
import { FeaturesItem } from '../item'

test('renders term and definition elements', () => {
  render(<FeaturesItem icon={<StarIcon />} label="Bedrooms" value="4" />)

  // NOTE: because the "term" is the icon, we expect the label to be used as the term's accessible name.
  expect(screen.getByRole('term', { name: 'Bedrooms' })).toBeVisible()
  expect(screen.getByRole('definition')).toBeVisible()
  expect(screen.getByRole('definition').textContent).toBe('4')
})

test('the supplied icon is the visual content of the term element', () => {
  render(<FeaturesItem icon={<StarIcon data-testid="icon" />} label="Bedrooms" value="4" />)

  expect(screen.getByRole('term').children[0]).toBe(screen.getByTestId('icon'))
})

test('the supplied value is the text content of the definition element', () => {
  render(<FeaturesItem icon={<StarIcon />} label="Bedrooms" value="4" />)

  expect(screen.getByRole('definition').textContent).toBe('4')
})

test('forwards additional props to the div element', () => {
  render(<FeaturesItem icon={<StarIcon />} label="Bedrooms" value="4" data-testid="features-item" />)
  expect(screen.getByTestId('features-item')).toBeVisible()
})
