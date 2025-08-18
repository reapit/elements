import { render, screen } from '@testing-library/react'
import { FolderTabCountLabel } from '../count-label'

test('renders a span element', () => {
  const { container } = render(<FolderTabCountLabel count="00">Label</FolderTabCountLabel>)
  expect(container.firstElementChild?.tagName).toBe('SPAN')
})

test('displays count', () => {
  render(<FolderTabCountLabel count="10">Label</FolderTabCountLabel>)
  expect(screen.getByText('10')).toBeVisible()
})

test('displays children', () => {
  render(<FolderTabCountLabel count="10">Label</FolderTabCountLabel>)
  expect(screen.getByText('Label')).toBeVisible()
})

test('additional props are forwarded to the root span element', () => {
  const { container } = render(
    <FolderTabCountLabel data-testid="test-id" count="00">
      Label
    </FolderTabCountLabel>,
  )
  expect(screen.getByTestId('test-id')).toBe(container.firstElementChild)
})
