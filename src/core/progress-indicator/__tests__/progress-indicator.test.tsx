import { render, screen } from '@testing-library/react'
import { ProgressIndicator } from '../progress-indicator'

test('renders with the progressbar role', () => {
  render(<ProgressIndicator aria-label="Upload progress" value={50} />)
  expect(screen.getByRole('progressbar', { name: 'Upload progress' })).toBeVisible()
})

test('exposes the current value via aria-valuenow', () => {
  render(<ProgressIndicator aria-label="Upload progress" value={50} />)
  expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '50')
})

test('exposes aria-valuemin and aria-valuemax', () => {
  render(<ProgressIndicator aria-label="Upload progress" value={50} />)
  const progressIndicator = screen.getByRole('progressbar')
  expect(progressIndicator).toHaveAttribute('aria-valuemin', '0')
  expect(progressIndicator).toHaveAttribute('aria-valuemax', '100')
})

test('clamps values above 100', () => {
  render(<ProgressIndicator aria-label="Upload progress" value={150} />)
  expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '100')
})

test('clamps values below 0', () => {
  render(<ProgressIndicator aria-label="Upload progress" value={-10} />)
  expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '0')
})

test('treats non-finite values as 0', () => {
  render(<ProgressIndicator aria-label="Upload progress" value={NaN} />)
  expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '0')
})

test('forwards additional props to the underlying element', () => {
  render(<ProgressIndicator aria-label="Upload progress" value={50} data-testid="progress-indicator" />)
  expect(screen.getByTestId('progress-indicator')).toBeVisible()
})

test('renders as indeterminate when value is omitted', () => {
  render(<ProgressIndicator aria-label="Loading" />)
  expect(screen.getByRole('progressbar', { name: 'Loading' })).toBeVisible()
})

test('does not expose aria-valuenow when value is omitted, since progress cannot be determined', () => {
  render(<ProgressIndicator aria-label="Loading" />)
  expect(screen.getByRole('progressbar')).not.toHaveAttribute('aria-valuenow')
})
