import { composeStories } from '@storybook/react-vite'
import * as featuresStories from '../features.stories'
import { render, screen } from '@testing-library/react'

const FeaturesStories = composeStories(featuresStories)

it('renders as a description list element', () => {
  render(<FeaturesStories.Example data-testid="features" />)
  const features = screen.getByTestId('features')
  expect(features).toBeVisible()
  expect(features.tagName).toBe('DL')
})

it('applies the `data-size` attribute when a `size` is specified', () => {
  render(<FeaturesStories.Example data-testid="features" size="base" />)
  expect(screen.getByTestId('features')).toHaveAttribute('data-size', 'base')
})

it('applies the `data-wrap` attribute when `wrap` is specified', () => {
  render(<FeaturesStories.Example data-testid="features" wrap="nowrap" />)
  expect(screen.getByTestId('features')).toHaveAttribute('data-wrap', 'nowrap')
})
