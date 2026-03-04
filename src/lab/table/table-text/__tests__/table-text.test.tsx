import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import { TableText } from '..'
import { AddIcon } from '#src/icons/add'
import { ChevronDownIcon } from '#src/icons/chevron-down'

describe('TableText', () => {
  test('should match snapshot', () => {
    const { asFragment } = render(<TableText>Value</TableText>)
    expect(asFragment()).toMatchSnapshot()
  })

  test('extra-small TableText has `data-size="extra-small"` attribute on the container div', () => {
    render(<TableText size="extra-small">Value</TableText>)
    const containerDiv = screen.getByText('Value').parentElement
    expect(containerDiv).toHaveAttribute('data-size', 'extra-small')
  })

  test('success TableText has `data-variant="success"` attribute on the container div', () => {
    render(<TableText variant="success">Value</TableText>)
    const containerDiv = screen.getByText('Value').parentElement
    expect(containerDiv).toHaveAttribute('data-variant', 'success')
  })

  test('should match snapshot with icons and label', () => {
    const { asFragment } = render(
      <TableText iconLeft={<AddIcon size="sm" />} iconRight={<ChevronDownIcon size="sm" />}>
        Value
      </TableText>,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('should match snapshot with icon only', () => {
    const { asFragment } = render(<TableText iconLeft={<AddIcon size="sm" />}></TableText>)
    expect(asFragment()).toMatchSnapshot()
  })
})
