import { render, screen } from '@testing-library/react'
import { IndeterminateProgressBar } from '../indeterminate-progress-bar'

test('renders with the progressbar role', () => {
  render(<IndeterminateProgressBar aria-label="Loading" />)
  expect(screen.getByRole('progressbar', { name: 'Loading' })).toBeVisible()
})

test('does not expose aria-valuenow, since progress cannot be determined', () => {
  render(<IndeterminateProgressBar aria-label="Loading" />)
  expect(screen.getByRole('progressbar')).not.toHaveAttribute('aria-valuenow')
})

test('strips aria-valuenow/aria-valuemin/aria-valuemax even if forced in via props', () => {
  const props = {
    'aria-label': 'Loading',
    'aria-valuenow': 50,
    'aria-valuemin': 0,
    'aria-valuemax': 100,
  }
  render(<IndeterminateProgressBar {...props} />)
  const progressBar = screen.getByRole('progressbar')
  expect(progressBar).not.toHaveAttribute('aria-valuenow')
  expect(progressBar).not.toHaveAttribute('aria-valuemin')
  expect(progressBar).not.toHaveAttribute('aria-valuemax')
})

test('forwards additional props to the underlying element', () => {
  render(<IndeterminateProgressBar aria-label="Loading" data-testid="progress-bar" />)
  expect(screen.getByTestId('progress-bar')).toBeVisible()
})
