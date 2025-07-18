import { render, screen } from '@testing-library/react'
import { PageHeader } from '../page-header'

test('renders a header element', () => {
  render(<PageHeader title="Page title" />)
  // NOTE: The role of the header element is `banner` when it is NOT a child of a sectioning element like
  // `main`, `article` or `section`. When it is a child of a sectioning element, the role will be `sectionheading`.
  expect(screen.getByRole('banner')).toBeVisible()
})

test('displays breadcrumbs when provided', () => {
  render(<PageHeader title="Page title" breadcrumbs={<span>Breadcrumbs</span>} />)
  expect(screen.getByText('Breadcrumbs')).toBeVisible()
})

test('displays leading element when provided', () => {
  render(<PageHeader title="Page title" leadingElement={<span>Leading element</span>} />)
  expect(screen.getByText('Leading element')).toBeVisible()
})

test('displays subtitle when provided', () => {
  render(<PageHeader title="Page title" subtitle={<span>Subtitle</span>} />)
  expect(screen.getByText('Subtitle')).toBeVisible()
})

test('displays supplementary info when provided', () => {
  render(<PageHeader title="Page title" supplementaryInfo={<span>Supplementary Info</span>} />)
  expect(screen.getByText('Supplementary Info')).toBeVisible()
})
