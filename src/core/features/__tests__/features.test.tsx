import { render, screen } from '@testing-library/react'
import { Features } from '../features'

const exampleChildren = (
  <>
    <Features.Bedrooms value={4} />
    <Features.Bathrooms value={2} />
    <Features.CarSpaces value={2} />
    <Features.LandSize
      value={
        <>
          375 <abbr title="square metres">sq m</abbr>
        </>
      }
    />
  </>
)

it('renders as a description list element', () => {
  render(
    <Features data-testid="features" size="2xs">
      {exampleChildren}
    </Features>,
  )
  const features = screen.getByTestId('features')
  expect(features).toBeVisible()
  expect(features.tagName).toBe('DL')
})

it('applies the `data-size` attribute when a `size` is specified', () => {
  render(
    <Features data-testid="features" size="base">
      {exampleChildren}
    </Features>,
  )
  expect(screen.getByTestId('features')).toHaveAttribute('data-size', 'base')
})

it('applies the `data-wrap` attribute when `wrap` is specified', () => {
  render(
    <Features data-testid="features" size="2xs" wrap="nowrap">
      {exampleChildren}
    </Features>,
  )
  expect(screen.getByTestId('features')).toHaveAttribute('data-wrap', 'nowrap')
})
