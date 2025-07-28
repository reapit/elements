import { fireEvent, render, screen } from '@testing-library/react'
import { StarIcon } from '#src/icons/star'
import { MenuItemBase } from '../item-base'
import { Badge } from '#src/core/badge'

test('renders as a menuitem element when `as="button"`', () => {
  render(<MenuItemBase as="button">Menu item</MenuItemBase>)
  expect(screen.getByRole('menuitem', { name: 'Menu item' })).toBeVisible()
})

test('renders as a menuitem element when `as="a"`', () => {
  render(
    <MenuItemBase as="a" href="https://fake.url">
      Menu item
    </MenuItemBase>,
  )
  expect(screen.getByRole('menuitem', { name: 'Menu item' })).toBeVisible()
})

test('has an `aria-details` attribute', () => {
  render(<MenuItemBase as="button">Test Button</MenuItemBase>)
  expect(screen.getByRole('menuitem')).toHaveAttribute('aria-details')
})

test('is ARIA disabled when `disabled` is true', () => {
  render(
    <MenuItemBase as="button" disabled>
      Menu item
    </MenuItemBase>,
  )
  expect(screen.getByRole('menuitem')).toHaveAttribute('aria-disabled', 'true')
})

describe('when `aria-disabled="true"`', () => {
  test('does not call the consumer-supplied `onClick` handler', () => {
    const onClick = vi.fn()

    render(
      <MenuItemBase as="button" aria-disabled="true" onClick={onClick}>
        Button
      </MenuItemBase>,
    )
    const button = screen.getByRole('menuitem')
    fireEvent.click(button)

    expect(onClick).not.toHaveBeenCalled()
  })

  test("prevents the event's default action", () => {
    // NOTE: we have to spy on the `preventDefault` method on the `Event` prototype because our onClick handler
    // will not be called when `aria-disabled` is true.
    const preventDefaultSpy = vi.spyOn(Event.prototype, 'preventDefault')

    render(
      <MenuItemBase as="button" aria-disabled="true">
        Button
      </MenuItemBase>,
    )
    const button = screen.getByRole('menuitem')
    fireEvent.click(button)

    expect(preventDefaultSpy).toHaveBeenCalled()
  })

  test("stops the event's propagation", () => {
    const parentOnClick = vi.fn()

    render(
      // NOTE: we attach the onClick handler to the parent div AND the button itself, to allow us to assert the
      <div onClick={parentOnClick}>
        <MenuItemBase as="button" aria-disabled="true">
          Button
        </MenuItemBase>
      </div>,
    )
    const button = screen.getByRole('menuitem')
    fireEvent.click(button)

    expect(parentOnClick).not.toHaveBeenCalled()
  })
})

test('forwards additional props to the underlying element', () => {
  render(
    <MenuItemBase as="button" data-testid="my-button">
      Test Button
    </MenuItemBase>,
  )
  expect(screen.getByTestId('my-button')).toBeVisible()
})

test('can display a badge', () => {
  render(
    <MenuItemBase
      as="button"
      badge={
        <Badge colour="success" data-testid="badge">
          New
        </Badge>
      }
    >
      Test Button
    </MenuItemBase>,
  )
  expect(screen.getByTestId('badge')).toBeVisible()
})

test('can display supplementary information', () => {
  render(
    <MenuItemBase as="button" supplementaryInfo="Supplementary info">
      Test Button
    </MenuItemBase>,
  )
  expect(screen.getByText('Supplementary info')).toBeVisible()
})

test('can display an icon on the left', () => {
  render(
    <MenuItemBase as="button" iconLeft={<StarIcon data-testid="left-icon" />}>
      Test Button
    </MenuItemBase>,
  )
  expect(screen.getByTestId('left-icon')).toBeVisible()
})

test('can display an icon on the right', () => {
  render(
    <MenuItemBase as="button" iconRight={<StarIcon data-testid="right-icon" />}>
      Test Button
    </MenuItemBase>,
  )
  expect(screen.getByTestId('right-icon')).toBeVisible()
})

test('can display icons on both the left and right', () => {
  render(
    <MenuItemBase
      as="button"
      iconLeft={<StarIcon data-testid="left-icon" />}
      iconRight={<StarIcon data-testid="right-icon" />}
    >
      Test Button
    </MenuItemBase>,
  )
  expect(screen.getByTestId('left-icon')).toBeVisible()
  expect(screen.getByTestId('right-icon')).toBeVisible()
})
