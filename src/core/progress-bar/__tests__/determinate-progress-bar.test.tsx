import { render, screen } from '@testing-library/react'
import { DeterminateProgressBar } from '../determinate-progress-bar'

test('renders with the progressbar role', () => {
  render(<DeterminateProgressBar aria-label="Upload progress" value={50} />)
  expect(screen.getByRole('progressbar', { name: 'Upload progress' })).toBeVisible()
})

test('exposes the current value via aria-valuenow', () => {
  render(<DeterminateProgressBar aria-label="Upload progress" value={50} />)
  expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '50')
})

test('exposes aria-valuemin and aria-valuemax', () => {
  render(<DeterminateProgressBar aria-label="Upload progress" value={50} />)
  const progressBar = screen.getByRole('progressbar')
  expect(progressBar).toHaveAttribute('aria-valuemin', '0')
  expect(progressBar).toHaveAttribute('aria-valuemax', '100')
})

test('clamps values above 100', () => {
  render(<DeterminateProgressBar aria-label="Upload progress" value={150} />)
  expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '100')
})

test('clamps values below 0', () => {
  render(<DeterminateProgressBar aria-label="Upload progress" value={-10} />)
  expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '0')
})

test('treats non-finite values as 0', () => {
  render(<DeterminateProgressBar aria-label="Upload progress" value={NaN} />)
  expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '0')
})

test('forwards additional props to the underlying element', () => {
  render(<DeterminateProgressBar aria-label="Upload progress" value={50} data-testid="progress-bar" />)
  expect(screen.getByTestId('progress-bar')).toBeVisible()
})
