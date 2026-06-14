import { render, screen } from '@testing-library/react'
import { ButtonGroup } from '../button-group'
import { expect, test } from 'vitest'

test('renders its children', () => {
  render(
    <ButtonGroup>
      <ButtonGroup.Item>Button 1</ButtonGroup.Item>
      <ButtonGroup.Item>Button 2</ButtonGroup.Item>
      <ButtonGroup.Item>Button 3</ButtonGroup.Item>
    </ButtonGroup>,
  )

  expect(screen.getByRole('button', { name: 'Button 1' })).toBeVisible()
  expect(screen.getByRole('button', { name: 'Button 2' })).toBeVisible()
  expect(screen.getByRole('button', { name: 'Button 3' })).toBeVisible()
})

test('provides context to child buttons', () => {
  expect.assertions(1)
  render(
    <ButtonGroup size="large">
      <ButtonGroup.Context.Consumer>
        {(context) => {
          expect(context).toMatchInlineSnapshot(`
            {
              "size": "large",
            }
          `)
          return null
        }}
      </ButtonGroup.Context.Consumer>
    </ButtonGroup>,
  )
})

test('defaults size to medium in context when not specified', () => {
  expect.assertions(1)
  render(
    <ButtonGroup>
      <ButtonGroup.Context.Consumer>
        {(context) => {
          expect(context).toMatchInlineSnapshot(`
            {
              "size": "medium",
            }
          `)
          return null
        }}
      </ButtonGroup.Context.Consumer>
    </ButtonGroup>,
  )
})

test('sets data-orientation attribute when orientation prop is provided', () => {
  const { container } = render(
    <ButtonGroup orientation="vertical">
      <ButtonGroup.Item>Button</ButtonGroup.Item>
    </ButtonGroup>,
  )

  expect(container.firstElementChild).toHaveAttribute('data-orientation', 'vertical')
})

test('does not set data-orientation attribute when orientation prop is omitted', () => {
  const { container } = render(
    <ButtonGroup>
      <ButtonGroup.Item>Button</ButtonGroup.Item>
    </ButtonGroup>,
  )

  expect(container.firstElementChild).not.toHaveAttribute('data-orientation')
})

test('sets data-align attribute when align prop is provided', () => {
  const { container } = render(
    <ButtonGroup align="end">
      <ButtonGroup.Item>Button</ButtonGroup.Item>
    </ButtonGroup>,
  )

  expect(container.firstElementChild).toHaveAttribute('data-align', 'end')
})

test('does not set data-align attribute when align prop is omitted', () => {
  const { container } = render(
    <ButtonGroup>
      <ButtonGroup.Item>Button</ButtonGroup.Item>
    </ButtonGroup>,
  )

  expect(container.firstElementChild).not.toHaveAttribute('data-align')
})

// TODO: remove the following tests when autoFlow and justifyContent are removed
test('sets data-auto-flow attribute when autoFlow prop is provided', () => {
  const { container } = render(
    <ButtonGroup autoFlow="column">
      <ButtonGroup.Item>Button</ButtonGroup.Item>
    </ButtonGroup>,
  )

  expect(container.firstElementChild).toHaveAttribute('data-auto-flow', 'column')
})

test('sets data-auto-flow to row when autoFlow="row"', () => {
  const { container } = render(
    <ButtonGroup autoFlow="row">
      <ButtonGroup.Item>Button</ButtonGroup.Item>
    </ButtonGroup>,
  )

  expect(container.firstElementChild).toHaveAttribute('data-auto-flow', 'row')
})

test('does not set data-auto-flow attribute when autoFlow prop is omitted', () => {
  const { container } = render(
    <ButtonGroup>
      <ButtonGroup.Item>Button</ButtonGroup.Item>
    </ButtonGroup>,
  )

  expect(container.firstElementChild).not.toHaveAttribute('data-auto-flow')
})

test('sets data-justify-content attribute when justifyContent prop is provided', () => {
  const { container } = render(
    <ButtonGroup justifyContent="end">
      <ButtonGroup.Item>Button</ButtonGroup.Item>
    </ButtonGroup>,
  )

  expect(container.firstElementChild).toHaveAttribute('data-justify-content', 'end')
})

test('does not set data-justify-content attribute when justifyContent prop is omitted', () => {
  const { container } = render(
    <ButtonGroup>
      <ButtonGroup.Item>Button</ButtonGroup.Item>
    </ButtonGroup>,
  )

  expect(container.firstElementChild).not.toHaveAttribute('data-justify-content')
})
