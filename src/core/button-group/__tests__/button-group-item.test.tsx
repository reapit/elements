import { ButtonGroup } from '../button-group'
import { ButtonGroupItem } from '../button-group-item'
import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'

test('renders a button', () => {
  render(
    <ButtonGroup>
      <ButtonGroupItem>Label</ButtonGroupItem>
    </ButtonGroup>,
  )
  const button = screen.getByRole('button', { name: 'Label' })

  expect(button).toBeVisible()
})

test('applies size from ButtonGroupContext', () => {
  render(
    <ButtonGroup size="large">
      <ButtonGroupItem>Label</ButtonGroupItem>
    </ButtonGroup>,
  )
  const button = screen.getByRole('button', { name: 'Label' })

  expect(button).toHaveAttribute('data-size', 'large')
})

test('size from ButtonGroupContext can be overridden', () => {
  render(
    <ButtonGroup size="large">
      <ButtonGroupItem size="small">Label</ButtonGroupItem>
    </ButtonGroup>,
  )
  const button = screen.getByRole('button', { name: 'Label' })

  expect(button).toHaveAttribute('data-size', 'small')
})

test('defaults to medium size when context does not specify size', () => {
  render(
    <ButtonGroup>
      <ButtonGroupItem>Label</ButtonGroupItem>
    </ButtonGroup>,
  )
  const button = screen.getByRole('button', { name: 'Label' })

  expect(button).toHaveAttribute('data-size', 'medium')
})

test('throws error when used outside ButtonGroup context', () => {
  expect(() => {
    render(<ButtonGroupItem>Label</ButtonGroupItem>)
  }).toThrow('useButtonGroupContext requires a ButtonGroup ancestor')
})
