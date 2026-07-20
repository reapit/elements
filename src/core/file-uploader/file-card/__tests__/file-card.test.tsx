import { FileUploaderFileCard } from '../file-card'
import { FileUploaderFileCardLeadingElement } from '../leading-element/leading-element'
import { fireEvent, render, screen } from '@testing-library/react'

const leadingElement = <FileUploaderFileCardLeadingElement type="icon" />

test('renders the filename split into a base and extension', () => {
  render(<FileUploaderFileCard fileName="Invoice.pdf" status="queued" leadingElement={leadingElement} />)
  expect(screen.getByText('Invoice')).toBeVisible()
  expect(screen.getByText('.pdf')).toBeVisible()
})

test('renders the formatted file size and status text', () => {
  render(
    <FileUploaderFileCard
      fileName="Invoice.pdf"
      fileSize={2 * 1000 * 1000}
      status="queued"
      locale="en-GB"
      leadingElement={leadingElement}
    />,
  )
  expect(screen.getByText('2 MB')).toBeVisible()
  expect(screen.getByText('Queued')).toBeVisible()
})

test('omits the size when fileSize is not provided', () => {
  render(<FileUploaderFileCard fileName="Invoice.pdf" status="queued" leadingElement={leadingElement} />)
  expect(screen.queryByText('MB', { exact: false })).not.toBeInTheDocument()
})

test('renders the error message when status is error', () => {
  render(
    <FileUploaderFileCard
      fileName="Invoice.pdf"
      status="error"
      errorMessage="File too large"
      leadingElement={leadingElement}
    />,
  )
  expect(screen.getByText('File too large')).toBeVisible()
})

test('renders no remove button when onRemove is omitted', () => {
  render(<FileUploaderFileCard fileName="Invoice.pdf" status="uploaded" leadingElement={leadingElement} />)
  expect(screen.queryByRole('button')).not.toBeInTheDocument()
})

test('renders an accessibly-named remove button that calls onRemove when clicked', () => {
  const onRemove = vi.fn()
  render(
    <FileUploaderFileCard
      fileName="Invoice.pdf"
      status="uploaded"
      onRemove={onRemove}
      leadingElement={leadingElement}
    />,
  )

  const button = screen.getByRole('button', { name: 'Remove Invoice.pdf' })
  fireEvent.click(button)

  expect(onRemove).toHaveBeenCalledTimes(1)
})

test('renders a determinate progress bar while uploading with known progress', () => {
  render(
    <FileUploaderFileCard fileName="Invoice.pdf" status="uploading" progress={45} leadingElement={leadingElement} />,
  )
  expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '45')
})

test('renders an indeterminate progress bar while uploading with no known progress', () => {
  render(<FileUploaderFileCard fileName="Invoice.pdf" status="uploading" leadingElement={leadingElement} />)
  expect(screen.getByRole('progressbar')).not.toHaveAttribute('aria-valuenow')
})

test.each([NaN, Infinity])(
  'renders an indeterminate progress bar while uploading with invalid progress (%s)',
  (progress) => {
    render(
      <FileUploaderFileCard
        fileName="Invoice.pdf"
        status="uploading"
        progress={progress}
        leadingElement={leadingElement}
      />,
    )
    expect(screen.getByRole('progressbar')).not.toHaveAttribute('aria-valuenow')
  },
)

test('renders an indeterminate progress bar while processing', () => {
  render(<FileUploaderFileCard fileName="Invoice.pdf" status="processing" leadingElement={leadingElement} />)
  expect(screen.getByRole('progressbar')).not.toHaveAttribute('aria-valuenow')
})

test.each(['queued', 'uploaded', 'error'] as const)('renders no progress bar while %s', (status) => {
  render(<FileUploaderFileCard fileName="Invoice.pdf" status={status} leadingElement={leadingElement} />)
  expect(screen.queryByRole('progressbar')).not.toBeInTheDocument()
})

test('renders the given leading element', () => {
  render(
    <FileUploaderFileCard
      fileName="Invoice.pdf"
      status="uploaded"
      leadingElement={<FileUploaderFileCardLeadingElement type="file-type" label="PDF" />}
    />,
  )
  expect(screen.getByText('PDF')).toBeVisible()
})

test('marks the error message so it can wrap onto a second line, unlike other status text', () => {
  render(
    <FileUploaderFileCard
      fileName="Invoice.pdf"
      status="error"
      errorMessage="File too large"
      leadingElement={leadingElement}
    />,
  )
  expect(screen.getByText('File too large')).toHaveAttribute('data-error')
})

test('does not mark non-error status text as wrappable', () => {
  render(<FileUploaderFileCard fileName="Invoice.pdf" status="uploaded" leadingElement={leadingElement} />)
  expect(screen.getByText('Uploaded')).not.toHaveAttribute('data-error')
})
