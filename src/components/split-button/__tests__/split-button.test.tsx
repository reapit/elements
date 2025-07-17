import { render, screen } from '@testing-library/react'
import { SplitButton } from '../split-button'
import { useSplitButtonContext } from '../context'

test('renders a div element', () => {
  const { container } = render(
    <SplitButton action={<span>Action</span>} menu={<span>Menu</span>} size="medium" variant="primary" />,
  )
  expect(container.firstChild).toBeInstanceOf(HTMLDivElement)
})

test('renders the `action` and `menu` content', () => {
  render(<SplitButton action={<span>Action</span>} menu={<span>Menu</span>} size="medium" variant="primary" />)
  expect(screen.getByText('Action')).toBeVisible()
  expect(screen.getByText('Menu')).toBeVisible()
})

test('forwards additional props to the container element', () => {
  render(<SplitButton action="Action" data-testid="split-button" menu="Menu" size="small" variant="primary" />)
  expect(screen.getByTestId('split-button')).toBeVisible()
})

test('provides `size` and `variant` to the action and menu content via `SplitButtonContext`', () => {
  let size: string | undefined, variant: string | undefined

  function TestConsumer() {
    const ctx = useSplitButtonContext()
    size = ctx.size
    variant = ctx.variant
    return null
  }

  render(<SplitButton action={<TestConsumer />} menu={<TestConsumer />} size="small" variant="primary" />)

  expect(size).toBe('small')
  expect(variant).toBe('primary')
})
