import { StarIcon } from '#src/icons/star'
import { render, screen } from '@testing-library/react'
import { FeatureItem } from '../item'

test('renders term, definition and tooltip elements', () => {
  render(<FeatureItem icon={<StarIcon />} label="Bedrooms" value="4" />)

  // NOTE: because the "term" is the icon, we expect the label to be used as the term's accessible name.
  expect(screen.getByRole('term', { name: 'Bedrooms' })).toBeVisible()
  expect(screen.getByRole('definition')).toBeVisible()
  expect(screen.getByRole('tooltip')).toBeVisible()
})

test('the supplied icon is the visual content of the term element', () => {
  render(<FeatureItem icon={<StarIcon data-testid="icon" />} label="Bedrooms" value="4" />)
  expect(screen.getByRole('term').children[0]).toBe(screen.getByTestId('icon'))
})

test('the supplied value is the text content of the definition element', () => {
  render(<FeatureItem icon={<StarIcon />} label="Bedrooms" value="4" />)
  expect(screen.getByRole('definition').textContent).toBe('4')
})

test('the term is labelled by the tooltip', () => {
  render(<FeatureItem icon={<StarIcon />} label="Bedrooms" value="4" />)
  expect(screen.getByRole('term')).toHaveAttribute('aria-labelledby', screen.getByRole('tooltip').id)
})

test('forwards additional props to the div element', () => {
  render(<FeatureItem icon={<StarIcon />} label="Bedrooms" value="4" data-testid="features-item" />)
  expect(screen.getByTestId('features-item')).toBeVisible()
})
