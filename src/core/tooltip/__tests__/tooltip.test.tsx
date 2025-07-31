import { Tooltip } from '../tooltip'
import { render, screen } from '@testing-library/react'

// NOTE: the unit tests here do NOT test the show/hide behaviour of the tooltip
// as that would constitute testing the DOM.

const requiredProps = {
  id: 'test-tooltip',
  triggerId: 'trigger',
}

test('renders a tooltip element', () => {
  render(<Tooltip {...requiredProps}>Tooltip content</Tooltip>)
  expect(screen.getByRole('tooltip')).toBeVisible()
})

test('uses popover="hint"', () => {
  render(<Tooltip {...requiredProps}>Tooltip content</Tooltip>)
  expect(screen.getByRole('tooltip')).toHaveAttribute('popover', 'hint')
})

test('forwards additional props to the tooltip', () => {
  render(
    <Tooltip {...requiredProps} data-testid="test-id">
      Tooltip content
    </Tooltip>,
  )
  expect(screen.getByTestId('test-id')).toBeVisible()
})
