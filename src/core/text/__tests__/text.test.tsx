import { render, screen } from '@testing-library/react'
import { test, expect } from 'vitest'
import { Text } from '../text'

test('renders as a <span> by default', () => {
  render(<Text>Some text</Text>)
  const el = screen.getByText('Some text')
  expect(el.tagName).toBe('SPAN')
})

test('renders as the specified HTML element', () => {
  render(<Text as="strong">Strong text</Text>)
  const el = screen.getByText('Strong text')
  expect(el.tagName).toBe('STRONG')
})

test('applies data attributes for colour, overflow, size, and weight', () => {
  render(
    <Text as="em" colour="secondary" overflow="truncate" size="xl" weight="bold">
      Styled text
    </Text>,
  )
  const el = screen.getByText('Styled text')
  expect(el).toHaveAttribute('data-colour', 'secondary')
  expect(el).toHaveAttribute('data-font-size', 'xl')
  expect(el).toHaveAttribute('data-font-weight', 'bold')
  expect(el).toHaveAttribute('data-overflow', 'truncate')
})

test('forwards additional props to the rendered element', () => {
  render(
    <Text as="abbr" title="Abbreviation">
      HTML
    </Text>,
  )
  const el = screen.getByText('HTML')
  expect(el).toHaveAttribute('title', 'Abbreviation')
})
