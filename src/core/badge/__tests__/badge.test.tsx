import { render, screen } from '@testing-library/react'
import { StarIcon } from '#src/icons/star'
import { Badge } from '../badge'

test('renders badge with label', () => {
  render(<Badge colour="neutral">Test Badge</Badge>)
  expect(screen.getByText('Test Badge')).toBeVisible()
})

test('applies correct data attributes', () => {
  render(
    <Badge colour="success" variant="reversed" data-testid="badge">
      Test Badge
    </Badge>,
  )
  const badge = screen.getByTestId('badge')
  expect(badge).toHaveAttribute('data-colour', 'success')
  expect(badge).toHaveAttribute('data-variant', 'reversed')
})

test('uses the default variant when one is not specified', () => {
  render(
    <Badge colour="neutral" data-testid="badge">
      Test Badge
    </Badge>,
  )
  expect(screen.getByTestId('badge')).toHaveAttribute('data-variant', 'default')
})

test('can display an icon on the left', () => {
  render(
    <Badge colour="neutral" iconLeft={<StarIcon data-testid="left-icon" />}>
      Test Badge
    </Badge>,
  )
  expect(screen.getByTestId('left-icon')).toBeVisible()
})

test('can display an icon on the right', () => {
  render(
    <Badge colour="neutral" iconRight={<StarIcon data-testid="right-icon" />}>
      Test Badge
    </Badge>,
  )
  expect(screen.getByTestId('right-icon')).toBeVisible()
})

test('can display icons on both the left and right', () => {
  render(
    <Badge
      colour="neutral"
      iconLeft={<StarIcon data-testid="left-icon" />}
      iconRight={<StarIcon data-testid="right-icon" />}
    >
      Test Badge
    </Badge>,
  )
  expect(screen.getByTestId('left-icon')).toBeVisible()
  expect(screen.getByTestId('right-icon')).toBeVisible()
})

test('forwards additional props to the underlying element', () => {
  render(
    <Badge colour="neutral" data-testid="my-badge" className="custom-class">
      Test Badge
    </Badge>,
  )
  expect(screen.getByTestId('my-badge')).toBeVisible()
  expect(screen.getByTestId('my-badge')).toHaveClass('custom-class')
})

test('applies aria-label when provided', () => {
  render(
    <Badge colour="neutral" data-testid="my-badge" aria-label="Accessible Badge">
      Test Badge
    </Badge>,
  )
  const labelledElement = screen.getByLabelText('Accessible Badge')
  expect(labelledElement).toBeVisible()
  expect(screen.getByTestId('my-badge')).toBe(labelledElement)
})

test('icon-only badges are labelled by their tooltip', () => {
  render(
    <Badge
      aria-label="Accessible Badge"
      colour="neutral"
      data-testid="my-badge"
      iconLeft={<StarIcon data-testid="left-icon" />}
    />,
  )
  const tooltip = screen.getByRole('tooltip')
  expect(tooltip).toBeVisible()
  expect(screen.getByTestId('my-badge')).toHaveAttribute('aria-labelledby', tooltip.id)
})

test('icon-only badge has no tooltip if aria-label is not provided', () => {
  render(<Badge colour="neutral" data-testid="my-badge" iconLeft={<StarIcon data-testid="left-icon" />} />)
  expect(screen.queryByRole('tooltip')).not.toBeInTheDocument()
})
