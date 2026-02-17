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
