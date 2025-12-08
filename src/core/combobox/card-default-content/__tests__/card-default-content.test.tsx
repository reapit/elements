import { render, screen } from '@testing-library/react'
import { ComboboxCardDefaultContent } from '../card-default-content'
import { SupplementaryInfo } from '#src/core/supplementary-info'

test('renders a span element', () => {
  const { container } = render(<ComboboxCardDefaultContent>Test label</ComboboxCardDefaultContent>)
  expect(container.firstElementChild?.tagName).toBe('SPAN')
})

test('renders the children content', () => {
  render(<ComboboxCardDefaultContent>Selected item label</ComboboxCardDefaultContent>)
  expect(screen.getByText('Selected item label')).toBeVisible()
})

test('renders children as a span element', () => {
  render(<ComboboxCardDefaultContent>My label text</ComboboxCardDefaultContent>)
  const element = screen.getByText('My label text')
  expect(element).toBeVisible()
  expect(element.tagName).toBe('SPAN')
})

test('does not render supplementary info list when additionalInfo is not provided', () => {
  const { container } = render(<ComboboxCardDefaultContent>Test</ComboboxCardDefaultContent>)
  const list = container.querySelector('ul')
  expect(list).toBeNull()
})

test('renders additionalInfo when provided', () => {
  render(
    <ComboboxCardDefaultContent
      additionalInfo={
        <SupplementaryInfo>
          <SupplementaryInfo.Item>Info 1</SupplementaryInfo.Item>
          <SupplementaryInfo.Item>Info 2</SupplementaryInfo.Item>
        </SupplementaryInfo>
      }
    >
      Test
    </ComboboxCardDefaultContent>,
  )
  expect(screen.getByText('Info 1')).toBeVisible()
  expect(screen.getByText('Info 2')).toBeVisible()
})

test('forwards additional props to the root element', () => {
  render(
    <ComboboxCardDefaultContent data-testid="card-content" className="custom-class">
      Test
    </ComboboxCardDefaultContent>,
  )
  const element = screen.getByTestId('card-content')
  expect(element).toBeVisible()
  expect(element).toHaveClass('custom-class')
})

test('renders complex children content', () => {
  render(
    <ComboboxCardDefaultContent>
      <strong>Bold text</strong> and normal text
    </ComboboxCardDefaultContent>,
  )
  expect(screen.getByText('Bold text')).toBeVisible()
  expect(screen.getByText('and normal text', { exact: false })).toBeVisible()
})

test('renders additionalInfo in the correct container', () => {
  const { container } = render(
    <ComboboxCardDefaultContent
      additionalInfo={
        <SupplementaryInfo>
          <SupplementaryInfo.Item>Additional info</SupplementaryInfo.Item>
        </SupplementaryInfo>
      }
    >
      Main content
    </ComboboxCardDefaultContent>,
  )

  // Check that both main content and additional info are rendered
  expect(screen.getByText('Main content')).toBeVisible()
  expect(screen.getByText('Additional info')).toBeVisible()

  // Verify the list is present when additionalInfo is provided
  const list = container.querySelector('ul')
  expect(list).not.toBeNull()
})

test('renders multiple additionalInfo items', () => {
  render(
    <ComboboxCardDefaultContent
      additionalInfo={
        <SupplementaryInfo>
          <SupplementaryInfo.Item>First item</SupplementaryInfo.Item>
          <SupplementaryInfo.Item>Second item</SupplementaryInfo.Item>
          <SupplementaryInfo.Item>Third item</SupplementaryInfo.Item>
        </SupplementaryInfo>
      }
    >
      Label
    </ComboboxCardDefaultContent>,
  )

  expect(screen.getByText('First item')).toBeVisible()
  expect(screen.getByText('Second item')).toBeVisible()
  expect(screen.getByText('Third item')).toBeVisible()
})
