import { SectionMessage } from '../section-message'
import { render, screen, fireEvent } from '@testing-library/react'
import { InfoIcon } from '#src/icons/info'
import { CheckIcon } from '#src/icons/check'

test('renders a section message element', () => {
  const onDismiss = vi.fn()
  render(
    <SectionMessage
      description="Section Message Description"
      title="Section Message Title"
      icon={<CheckIcon />}
      variant="success"
      onDismiss={onDismiss}
      actions={<button>Learn More</button>}
    />,
  )

  expect(screen.getByRole('heading', { name: 'Section Message Title' })).toBeVisible()
  expect(screen.getByText('Section Message Description')).toBeVisible()
  expect(screen.getByRole('button', { name: 'dismiss' })).toBeVisible()
  expect(screen.getByRole('button', { name: 'Learn More' })).toBeVisible()
})

test('renders the description text', () => {
  render(<SectionMessage description="Test description" variant="info" />)
  expect(screen.getByText('Test description')).toBeVisible()
})

test('renders title when provided', () => {
  render(<SectionMessage description="Test description" title="Test Title" variant="info" />)
  expect(screen.getByRole('heading', { name: 'Test Title' })).toBeVisible()
})

test('does not render title when not provided', () => {
  render(<SectionMessage description="Test description" variant="info" />)
  expect(screen.queryByRole('heading', { name: 'Test Title' })).not.toBeInTheDocument()
})

test('renders icon when provided', () => {
  const { container } = render(<SectionMessage description="Test description" icon={<InfoIcon />} variant="info" />)
  expect(container.querySelector('svg')).toBeVisible()
})

test('does not render icon when not provided', () => {
  const { container } = render(<SectionMessage description="Test description" variant="info" />)
  expect(container.querySelector('svg')).not.toBeInTheDocument()
})

test('icon container has aria-hidden attribute', () => {
  const { container } = render(<SectionMessage description="Test description" icon={<InfoIcon />} variant="info" />)
  const iconContainer = container.querySelector('[aria-hidden]')
  expect(iconContainer).toBeVisible()
  expect(iconContainer).toHaveAttribute('aria-hidden')
})

test('renders dismiss button when onDismiss callback is provided', () => {
  const onDismiss = vi.fn()
  render(<SectionMessage description="Test description" onDismiss={onDismiss} variant="info" />)

  const dismissButton = screen.getByRole('button', { name: 'dismiss' })
  const icon = dismissButton.querySelector('svg[aria-hidden]')

  expect(icon).toBeVisible()
  expect(dismissButton).toBeVisible()
})

test('does not render dismiss button when onDismiss is not provided', () => {
  render(<SectionMessage description="Test description" variant="info" />)
  const dismissButton = screen.queryByRole('button', { name: 'dismiss' })
  expect(dismissButton).not.toBeInTheDocument()
})

test('calls onDismiss callback when dismiss button is clicked', () => {
  const onDismiss = vi.fn()
  render(<SectionMessage description="Test description" onDismiss={onDismiss} variant="info" />)
  const dismissButton = screen.getByRole('button', { name: 'dismiss' })
  fireEvent.click(dismissButton)
  expect(onDismiss).toHaveBeenCalledTimes(1)
})

test('renders actions when provided', () => {
  render(<SectionMessage description="Test description" actions={<button>Learn More</button>} variant="info" />)
  expect(screen.getByRole('button', { name: 'Learn More' })).toBeVisible()
})

test('does not render actions container when actions are not provided', () => {
  render(<SectionMessage description="Test description" variant="info" />)
  expect(screen.queryByRole('button', { name: 'Learn More' })).not.toBeInTheDocument()
})

test.each(['error', 'warning', 'info', 'success', 'neutral-light', 'neutral-dark'] as const)(
  'applies correct data-variant attribute for %s variant',
  (variant) => {
    const { container } = render(<SectionMessage description="Test description" variant={variant} />)
    expect(container.firstElementChild).toHaveAttribute('data-variant', variant)
  },
)

test('renders description as ReactNode', () => {
  render(<SectionMessage description={<span>Custom content</span>} variant="info" />)
  expect(screen.getByText('Custom content')).toBeVisible()
})

test.each(['error', 'warning'] as const)('has role="alert" for %s variant', (variant) => {
  render(<SectionMessage description="Test description" variant={variant} />)
  expect(screen.getByRole('alert')).toBeInTheDocument()
})

test.each(['info', 'success', 'neutral-light', 'neutral-dark'] as const)(
  'has role="status" for %s variant',
  (variant) => {
    render(<SectionMessage description="Test description" variant={variant} />)
    expect(screen.getByRole('status')).toBeInTheDocument()
  },
)

test('allows custom role to override default', () => {
  const { container } = render(<SectionMessage description="Test description" variant="error" role="complementary" />)
  expect(container.firstElementChild).toHaveAttribute('role', 'complementary')
})
