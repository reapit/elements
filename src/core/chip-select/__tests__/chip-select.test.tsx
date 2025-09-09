import { ChipSelect } from '../chip-select'
import { ChipSelectContext } from '../context'
import { ChipSelectOption } from '../chip-select-option'
import { render, screen } from '@testing-library/react'

test('renders children', () => {
  render(<ChipSelect size="medium">Children</ChipSelect>)
  expect(screen.getByText('Children')).toBeVisible()
})

test('renders as a div', () => {
  const { container } = render(<ChipSelect size="medium">Child</ChipSelect>)
  expect(container.firstElementChild?.tagName).toBe('DIV')
})

test('has default data-flow="wrap" attribute', () => {
  render(
    <ChipSelect size="medium" data-testid="chip-select">
      Child
    </ChipSelect>,
  )
  expect(screen.getByTestId('chip-select')).toHaveAttribute('data-flow', 'wrap')
})

test('sets data-flow="nowrap" when flow="nowrap"', () => {
  render(
    <ChipSelect size="medium" flow="nowrap" data-testid="chip-select">
      Child
    </ChipSelect>,
  )

  expect(screen.getByTestId('chip-select')).toHaveAttribute('data-flow', 'nowrap')
})

test('has default data-overflow="visible" attribute', () => {
  render(
    <ChipSelect size="medium" data-testid="chip-select">
      Child
    </ChipSelect>,
  )

  expect(screen.getByTestId('chip-select')).toHaveAttribute('data-overflow', 'visible')
})

test('sets data-overflow="auto" when overflow="auto"', () => {
  render(
    <ChipSelect size="medium" overflow="auto" data-testid="chip-select">
      Child
    </ChipSelect>,
  )

  expect(screen.getByTestId('chip-select')).toHaveAttribute('data-overflow', 'auto')
})

test('passes `form` prop to context', () => {
  expect.assertions(1)
  render(
    <ChipSelect size="medium" form="test-form">
      <ChipSelectContext.Consumer>
        {(context) => {
          expect(context?.form).toBe('test-form')
          return null
        }}
      </ChipSelectContext.Consumer>
    </ChipSelect>,
  )
})

test('passes `name` prop to context', () => {
  expect.assertions(1)
  render(
    <ChipSelect size="medium" name="test-name">
      <ChipSelectContext.Consumer>
        {(context) => {
          expect(context?.name).toBe('test-name')
          return null
        }}
      </ChipSelectContext.Consumer>
    </ChipSelect>,
  )
})

test('passes `size` prop to context', () => {
  expect.assertions(1)
  render(
    <ChipSelect size="medium">
      <ChipSelectContext.Consumer>
        {(context) => {
          expect(context?.size).toBe('medium')
          return null
        }}
      </ChipSelectContext.Consumer>
    </ChipSelect>,
  )
})

test('defaults to single selection (multiple=false)', () => {
  expect.assertions(1)
  render(
    <ChipSelect size="medium">
      <ChipSelectContext.Consumer>
        {(context) => {
          expect(context?.multiple).toBe(false)
          return null
        }}
      </ChipSelectContext.Consumer>
    </ChipSelect>,
  )
})

test('enables multiple selection when multiple=true', () => {
  expect.assertions(1)
  render(
    <ChipSelect multiple size="medium">
      <ChipSelectContext.Consumer>
        {(context) => {
          expect(context?.multiple).toBe(true)
          return null
        }}
      </ChipSelectContext.Consumer>
    </ChipSelect>,
  )
})

test('forwards additional attributes to the div element', () => {
  const { container } = render(
    <ChipSelect size="medium" data-testid="chip-select">
      Child
    </ChipSelect>,
  )
  expect(screen.getByTestId('chip-select')).toBe(container.firstElementChild)
})

test('exposes ChipSelectOption as ChipSelect.Option', () => {
  expect(ChipSelect.Option).toBe(ChipSelectOption)
})
