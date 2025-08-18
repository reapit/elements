import { render, screen } from '@testing-library/react'
import { FolderTab } from '../tab'

test('renders a link element', () => {
  render(
    <FolderTab aria-current={false} href="https://fake.url">
      Label
    </FolderTab>,
  )
  expect(screen.getByRole('link')).toBeVisible()
})

test('children act as the accessible name of the link', () => {
  render(
    <FolderTab aria-current={false} href="https://fake.url">
      Label
    </FolderTab>,
  )
  expect(screen.getByRole('link', { name: 'Label' })).toBeVisible()
})

test('aria-current is forwarded to the link element', () => {
  render(
    <FolderTab aria-current="page" href="https://fake.url">
      Label
    </FolderTab>,
  )
  expect(screen.getByRole('link')).toHaveAttribute('aria-current', 'page')
})

test('href is forwarded to the link element', () => {
  render(
    <FolderTab aria-current="page" href="https://fake.url">
      Label
    </FolderTab>,
  )
  expect(screen.getByRole('link')).toHaveAttribute('href', 'https://fake.url')
})

test('additional props are forwarded to the link element', () => {
  render(
    <FolderTab aria-current="page" data-testid="test-id" href="https://fake.url">
      Label
    </FolderTab>,
  )
  expect(screen.getByTestId('test-id')).toBe(screen.getByRole('link'))
})
