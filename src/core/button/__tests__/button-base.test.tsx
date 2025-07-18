import { fireEvent, render, screen } from '@testing-library/react'
import { StarIcon } from '#src/icons/star'
import { ButtonBase } from '../button-base'

test('renders as a button element when `as="button"`', () => {
  render(
    <ButtonBase as="button" variant="primary" size="medium">
      Button
    </ButtonBase>,
  )
  expect(screen.getByRole('button', { name: 'Button' })).toBeVisible()
})

test('renders as a link element when `as="a"`', () => {
  render(
    <ButtonBase as="a" href="https://fake.url" size="medium" variant="primary">
      Link
    </ButtonBase>,
  )
  expect(screen.getByRole('link', { name: 'Link' })).toBeVisible()
})

test('is ARIA disabled when `isBusy` is true', () => {
  render(
    <ButtonBase as="button" isBusy size="medium" variant="primary">
      Button
    </ButtonBase>,
  )
  expect(screen.getByRole('button')).toHaveAttribute('aria-disabled', 'true')
})

test('is ARIA disabled when `disabled` is true', () => {
  render(
    <ButtonBase as="button" disabled size="medium" variant="primary">
      Button
    </ButtonBase>,
  )
  expect(screen.getByRole('button')).toHaveAttribute('aria-disabled', 'true')
})

describe('when `aria-disabled="true"`', () => {
  test('does not call the consumer-supplied `onClick` handler', () => {
    const onClick = vi.fn()

    render(
      <ButtonBase as="button" aria-disabled="true" onClick={onClick} size="medium" variant="primary">
        Button
      </ButtonBase>,
    )
    const button = screen.getByRole('button')
    fireEvent.click(button)

    expect(onClick).not.toHaveBeenCalled()
  })

  test("prevents the event's default action", () => {
    // NOTE: we have to spy on the `preventDefault` method on the `Event` prototype because our onClick handler
    // will not be called when `aria-disabled` is true.
    const preventDefaultSpy = vi.spyOn(Event.prototype, 'preventDefault')

    render(
      <ButtonBase as="button" aria-disabled="true" size="medium" variant="primary">
        Button
      </ButtonBase>,
    )
    const button = screen.getByRole('button')
    fireEvent.click(button)

    expect(preventDefaultSpy).toHaveBeenCalled()
  })

  test("stops the event's propagation", () => {
    const parentOnClick = vi.fn()

    render(
      // NOTE: we attach the onClick handler to the parent div AND the button itself, to allow us to assert the
      <div onClick={parentOnClick}>
        <ButtonBase as="button" aria-disabled="true" size="medium" variant="primary">
          Button
        </ButtonBase>
      </div>,
    )
    const button = screen.getByRole('button')
    fireEvent.click(button)

    expect(parentOnClick).not.toHaveBeenCalled()
  })
})

test('applies correct data-* attributes', () => {
  render(
    <ButtonBase as="button" isDestructive hasNoPadding size="large" useLinkStyle variant="secondary">
      Test Button
    </ButtonBase>,
  )

  const button = screen.getByRole('button')
  expect(button).toHaveAttribute('data-variant', 'secondary')
  expect(button).toHaveAttribute('data-size', 'large')
  expect(button).toHaveAttribute('data-is-destructive', 'true')
  expect(button).toHaveAttribute('data-has-no-padding', 'true')
  expect(button).toHaveAttribute('data-use-link-style', 'true')
})

test('forwards additional props to the underlying element', () => {
  render(
    <ButtonBase as="button" data-testid="my-button" size="medium" variant="primary">
      Test Button
    </ButtonBase>,
  )
  expect(screen.getByTestId('my-button')).toBeVisible()
})

test('can display an icon on the left', () => {
  render(
    <ButtonBase as="button" iconLeft={<StarIcon data-testid="left-icon" />} size="medium" variant="primary">
      Test Button
    </ButtonBase>,
  )
  expect(screen.getByTestId('left-icon')).toBeVisible()
})

test('can display an icon on the right', () => {
  render(
    <ButtonBase as="button" iconRight={<StarIcon data-testid="right-icon" />} size="medium" variant="primary">
      Test Button
    </ButtonBase>,
  )
  expect(screen.getByTestId('right-icon')).toBeVisible()
})

test('can display icons on both the left and right', () => {
  render(
    <ButtonBase
      as="button"
      iconLeft={<StarIcon data-testid="left-icon" />}
      iconRight={<StarIcon data-testid="right-icon" />}
      size="medium"
      variant="primary"
    >
      Test Button
    </ButtonBase>,
  )
  expect(screen.getByTestId('left-icon')).toBeVisible()
  expect(screen.getByTestId('right-icon')).toBeVisible()
})

test('does not display icons when busy', () => {
  render(
    <ButtonBase
      as="button"
      iconLeft={<StarIcon data-testid="left-icon" />}
      iconRight={<StarIcon data-testid="right-icon" />}
      isBusy
      size="medium"
      variant="primary"
    >
      Test Button
    </ButtonBase>,
  )
  expect(screen.queryByTestId('left-icon')).not.toBeInTheDocument()
  expect(screen.queryByTestId('right-icon')).not.toBeInTheDocument()
})

test('shows a spinner when busy', () => {
  render(
    <ButtonBase
      as="button"
      iconLeft={<StarIcon data-testid="left-icon" />}
      iconRight={<StarIcon data-testid="right-icon" />}
      isBusy
      size="medium"
      variant="primary"
    >
      Test Button
    </ButtonBase>,
  )
  expect(screen.queryByTestId('left-icon')).not.toBeInTheDocument()
  expect(screen.queryByTestId('right-icon')).not.toBeInTheDocument()
})
