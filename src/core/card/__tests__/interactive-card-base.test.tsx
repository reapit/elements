import { fireEvent, render, screen } from '@testing-library/react'
import { InteractiveCardBase } from '../interactive-card-base'

afterEach(() => {
  vi.restoreAllMocks()
})

test('renders as a button element when `as="button"`', () => {
  render(<InteractiveCardBase as="button">Content</InteractiveCardBase>)
  expect(screen.getByRole('button')).toBeVisible()
})

test('renders as a link element when `as="a"`', () => {
  render(
    <InteractiveCardBase as="a" href="https://example.com">
      Content
    </InteractiveCardBase>,
  )
  expect(screen.getByRole('link')).toBeVisible()
})

test('forwards type to the underlying button element', () => {
  render(
    <InteractiveCardBase as="button" type="submit">
      Content
    </InteractiveCardBase>,
  )
  expect(screen.getByRole('button')).toHaveAttribute('type', 'submit')
})

test('renders children', () => {
  render(<InteractiveCardBase as="button">Hello card</InteractiveCardBase>)
  expect(screen.getByText('Hello card')).toBeVisible()
})

test('applies borderRadius override as an inline style', () => {
  render(
    <InteractiveCardBase as="button" borderRadius="--border-radius-l" data-testid="card">
      Content
    </InteractiveCardBase>,
  )
  expect(screen.getByTestId('card').style.borderRadius).toBe('var(--border-radius-l)')
})

test('applies padding override as a CSS variable', () => {
  render(
    <InteractiveCardBase as="button" data-testid="card" padding="--spacing-2">
      Content
    </InteractiveCardBase>,
  )
  expect(screen.getByTestId('card').style.getPropertyValue('--card-padding')).toBe('var(--spacing-2)')
})

test('merges consumer style with override props', () => {
  render(
    <InteractiveCardBase as="button" borderRadius="--border-radius-m" data-testid="card" style={{ color: 'red' }}>
      Content
    </InteractiveCardBase>,
  )
  const card = screen.getByTestId('card')
  expect(card.style.borderRadius).toBe('var(--border-radius-m)')
  expect(card).toHaveStyle({ color: 'red' })
})

test('forwards additional props to the underlying element', () => {
  render(
    <InteractiveCardBase as="button" aria-label="my card" data-testid="card">
      Content
    </InteractiveCardBase>,
  )
  expect(screen.getByTestId('card')).toHaveAttribute('aria-label', 'my card')
})

test('forwards className to the underlying element', () => {
  render(
    <InteractiveCardBase as="button" className="custom" data-testid="card">
      Content
    </InteractiveCardBase>,
  )
  expect(screen.getByTestId('card')).toHaveClass('custom')
})

test('calls onClick when the button card is clicked', () => {
  const onClick = vi.fn()
  render(
    <InteractiveCardBase as="button" onClick={onClick}>
      Content
    </InteractiveCardBase>,
  )
  fireEvent.click(screen.getByRole('button'))
  expect(onClick).toHaveBeenCalledTimes(1)
})

test('passes aria-pressed through to the button element', () => {
  render(
    <InteractiveCardBase as="button" aria-pressed="true">
      Content
    </InteractiveCardBase>,
  )
  expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'true')
})

test('passes aria-current through to the anchor element', () => {
  render(
    <InteractiveCardBase as="a" aria-current="page" href="https://example.com">
      Content
    </InteractiveCardBase>,
  )
  expect(screen.getByRole('link')).toHaveAttribute('aria-current', 'page')
})

test('passes href through to the anchor element', () => {
  render(
    <InteractiveCardBase as="a" href="https://example.com">
      Content
    </InteractiveCardBase>,
  )
  expect(screen.getByRole('link')).toHaveAttribute('href', 'https://example.com')
})

test('does not call onClick when aria-disabled is true', () => {
  const onClick = vi.fn()
  render(
    <InteractiveCardBase as="button" aria-disabled="true" onClick={onClick}>
      Content
    </InteractiveCardBase>,
  )
  fireEvent.click(screen.getByRole('button'))
  expect(onClick).not.toHaveBeenCalled()
})

test('prevents default on click when aria-disabled is true', () => {
  // NOTE: we spy on `Event.prototype.preventDefault` because the component's internal click handler
  // always runs when `aria-disabled` is true — it is the consumer-supplied `onClick` callback that
  // is skipped. A consumer `onClick` spy would never fire, so we assert on the prototype instead.
  const preventDefaultSpy = vi.spyOn(Event.prototype, 'preventDefault')
  render(
    <InteractiveCardBase as="a" aria-disabled="true" href="https://example.com">
      Content
    </InteractiveCardBase>,
  )
  fireEvent.click(screen.getByRole('link'))
  expect(preventDefaultSpy).toHaveBeenCalled()
})

test('stops propagation on click when aria-disabled is true', () => {
  const parentOnClick = vi.fn()
  render(
    <div onClick={parentOnClick}>
      <InteractiveCardBase as="a" aria-disabled="true" href="https://example.com">
        Content
      </InteractiveCardBase>
    </div>,
  )
  fireEvent.click(screen.getByRole('link'))
  expect(parentOnClick).not.toHaveBeenCalled()
})

test('calls onClick when aria-disabled is not set', () => {
  const onClick = vi.fn()
  render(
    <InteractiveCardBase as="a" href="https://example.com" onClick={onClick}>
      Content
    </InteractiveCardBase>,
  )
  fireEvent.click(screen.getByRole('link'))
  expect(onClick).toHaveBeenCalledTimes(1)
})

test('calls onClick when aria-disabled is "false"', () => {
  const onClick = vi.fn()
  render(
    <InteractiveCardBase as="a" aria-disabled="false" href="https://example.com" onClick={onClick}>
      Content
    </InteractiveCardBase>,
  )
  fireEvent.click(screen.getByRole('link'))
  expect(onClick).toHaveBeenCalledTimes(1)
})

test('sets aria-disabled when disabled is true', () => {
  render(
    <InteractiveCardBase as="button" disabled>
      Content
    </InteractiveCardBase>,
  )
  expect(screen.getByRole('button')).toHaveAttribute('aria-disabled', 'true')
})
