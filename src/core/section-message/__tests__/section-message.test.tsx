import { SectionMessage } from '../section-message'
import { render, screen, fireEvent } from '@testing-library/react'
import { InfoIcon } from '#src/icons/info'
import { CheckIcon } from '#src/icons/check'

test('renders a section message element', () => {
  const onDismiss = vi.fn()
  render(
    <SectionMessage
      title="Section Message Title"
      icon={<CheckIcon />}
      variant="success"
      onDismiss={onDismiss}
      actions={<button>Learn More</button>}
    >
      Section Message Description
    </SectionMessage>,
  )

  expect(screen.getByText('Section Message Title')).toBeVisible()
  expect(screen.getByText('Section Message Description')).toBeVisible()
  expect(screen.getByRole('button', { name: 'Dismiss message' })).toBeVisible()
  expect(screen.getByRole('button', { name: 'Learn More' })).toBeVisible()
})

test('renders the description text', () => {
  render(<SectionMessage variant="info">Test description</SectionMessage>)
  expect(screen.getByText('Test description')).toBeVisible()
})

test('renders title when provided', () => {
  render(
    <SectionMessage title="Test Title" variant="info">
      Test description
    </SectionMessage>,
  )
  expect(screen.getByText('Test Title')).toBeVisible()
})

test('renders icon when provided', () => {
  const { container } = render(
    <SectionMessage icon={<InfoIcon />} variant="info">
      Test description
    </SectionMessage>,
  )
  expect(container.querySelector('svg')).toBeVisible()
})

test('renders dismiss button when onDismiss callback is provided', () => {
  const onDismiss = vi.fn()
  render(
    <SectionMessage onDismiss={onDismiss} variant="info">
      Test description
    </SectionMessage>,
  )

  const dismissButton = screen.getByRole('button', { name: 'Dismiss message' })
  const icon = dismissButton.querySelector('svg[aria-hidden]')

  expect(icon).toBeVisible()
  expect(dismissButton).toBeVisible()
})

test('renders actions when provided', () => {
  render(
    <SectionMessage actions={<button>Learn More</button>} variant="info">
      Test description
    </SectionMessage>,
  )
  expect(screen.getByRole('button', { name: 'Learn More' })).toBeVisible()
})

test('does not render title when not provided', () => {
  render(<SectionMessage variant="info">Test description</SectionMessage>)
  expect(screen.queryByText('Test Title')).not.toBeInTheDocument()
})

test('does not render icon when not provided', () => {
  const { container } = render(<SectionMessage variant="info">Test description</SectionMessage>)
  expect(container.querySelector('svg')).not.toBeInTheDocument()
})

test('does not render dismiss button when onDismiss is not provided', () => {
  render(<SectionMessage variant="info">Test description</SectionMessage>)
  const dismissButton = screen.queryByRole('button', { name: 'Dismiss message' })
  expect(dismissButton).not.toBeInTheDocument()
})

test('does not render actions container when actions are not provided', () => {
  render(<SectionMessage variant="info">Test description</SectionMessage>)
  expect(screen.queryByRole('button', { name: 'Learn More' })).not.toBeInTheDocument()
})

test('does not have a default role', () => {
  const { container } = render(<SectionMessage variant="info">Test description</SectionMessage>)
  expect(container.firstElementChild).not.toHaveAttribute('role')
})

test('accepts explicit role attribute', () => {
  const { container } = render(
    <SectionMessage variant="error" role="alert">
      Test description
    </SectionMessage>,
  )
  expect(container.firstElementChild).toHaveAttribute('role', 'alert')
})

test('calls onDismiss callback when dismiss button is clicked', () => {
  const onDismiss = vi.fn()
  render(
    <SectionMessage onDismiss={onDismiss} variant="info">
      Test description
    </SectionMessage>,
  )
  const dismissButton = screen.getByRole('button', { name: 'Dismiss message' })
  fireEvent.click(dismissButton)
  expect(onDismiss).toHaveBeenCalledTimes(1)
})

test.each(['error', 'warning', 'info', 'success', 'neutral-light', 'neutral-dark'] as const)(
  'applies correct data-variant attribute for %s variant',
  (variant) => {
    const { container } = render(<SectionMessage variant={variant}>Test description</SectionMessage>)
    expect(container.firstElementChild).toHaveAttribute('data-variant', variant)
  },
)

test('title is connected to container via aria-labelledby when provided', () => {
  const { container } = render(
    <SectionMessage title="Test Title" variant="info">
      Test description
    </SectionMessage>,
  )
  const sectionMessage = container.firstElementChild
  const titleElement = screen.getByText('Test Title')

  expect(sectionMessage).toHaveAttribute('aria-labelledby')
  expect(titleElement).toHaveAttribute('id')
  expect(sectionMessage?.getAttribute('aria-labelledby')).toBe(titleElement.getAttribute('id'))
})

test('container does not have aria-labelledby when title is not provided', () => {
  const { container } = render(<SectionMessage variant="info">Test description</SectionMessage>)
  const sectionMessage = container.firstElementChild

  expect(sectionMessage).not.toHaveAttribute('aria-labelledby')
})

test('forwards additional props to the container element', () => {
  const { container } = render(
    <SectionMessage data-testid="section-message" variant="info">
      Test description
    </SectionMessage>,
  )
  expect(screen.getByTestId('section-message')).toBe(container.firstElementChild)
})
