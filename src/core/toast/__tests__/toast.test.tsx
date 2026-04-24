import { Toast } from '../toast'
import { elToastTimeoutBar } from '../styles'
import { render, screen } from '@testing-library/react'

test('renders a status element with the message', () => {
  render(<Toast variant="success">Operation complete</Toast>)
  expect(screen.getByRole('status')).toHaveTextContent('Operation complete')
})

test('applies the variant as a data attribute', () => {
  render(
    <Toast variant="error" data-testid="toast">
      Something went wrong
    </Toast>,
  )
  expect(screen.getByTestId('toast')).toHaveAttribute('data-variant', 'error')
})

test('renders a built-in icon for the success variant', () => {
  const { container } = render(<Toast variant="success">Message</Toast>)
  expect(container.querySelector('[aria-hidden="true"]')).not.toBeNull()
})

test('renders a built-in icon for the error variant', () => {
  const { container } = render(<Toast variant="error">Message</Toast>)
  expect(container.querySelector('[aria-hidden="true"]')).not.toBeNull()
})

test('renders a built-in icon for the warning variant', () => {
  const { container } = render(<Toast variant="warning">Message</Toast>)
  expect(container.querySelector('[aria-hidden="true"]')).not.toBeNull()
})

test('renders a built-in icon for the info variant', () => {
  const { container } = render(<Toast variant="info">Message</Toast>)
  expect(container.querySelector('[aria-hidden="true"]')).not.toBeNull()
})

test('ignores the icon prop for non-neutral variants', () => {
  const { container } = render(
    <Toast variant="success" icon={<svg data-testid="custom-icon" />}>
      Message
    </Toast>,
  )
  expect(screen.queryByTestId('custom-icon')).toBeNull()
  expect(container.querySelector('[aria-hidden="true"]')).not.toBeNull()
})

test('renders the icon prop for the neutral variant', () => {
  render(
    <Toast variant="neutral" icon={<svg data-testid="custom-icon" />}>
      Message
    </Toast>,
  )
  expect(screen.getByTestId('custom-icon')).toBeVisible()
})

test('does not render an icon container for the neutral variant when no icon is provided', () => {
  const { container } = render(<Toast variant="neutral">Message</Toast>)
  expect(container.querySelector('[aria-hidden="true"]')).toBeNull()
})

test('hides the icon container from assistive technology', () => {
  const { container } = render(<Toast variant="success">Message</Toast>)
  expect(container.querySelector('[aria-hidden="true"]')).not.toBeNull()
})

test('renders the timeout bar when duration is provided', () => {
  const { container } = render(
    <Toast variant="neutral" duration={5000}>
      Message
    </Toast>,
  )
  expect(container.querySelector(`.${elToastTimeoutBar}`)).not.toBeNull()
})

test('does not render the timeout bar when duration is omitted', () => {
  const { container } = render(<Toast variant="neutral">Message</Toast>)
  expect(container.querySelector(`.${elToastTimeoutBar}`)).toBeNull()
})

test('uses role="status" by default', () => {
  render(<Toast variant="info">Message</Toast>)
  expect(screen.getByRole('status')).toBeVisible()
})

test('allows the role to be overridden', () => {
  render(
    <Toast variant="error" role="alert">
      Critical error
    </Toast>,
  )
  expect(screen.getByRole('alert')).toHaveTextContent('Critical error')
})

test('forwards additional HTML attributes', () => {
  render(
    <Toast variant="neutral" data-testid="toast" className="custom">
      Message
    </Toast>,
  )
  expect(screen.getByTestId('toast')).toHaveClass('custom')
})
